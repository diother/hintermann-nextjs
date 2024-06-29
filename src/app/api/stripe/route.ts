import Stripe from "stripe";
import { env } from "@/env";
import { isRedirectError } from "next/dist/client/components/redirect";
import {
    createStripeUser,
    getUserByEmail,
    setNameOnUser,
} from "@/database/auth";
import { Snowflake } from "@/lib/snowflake";

const stripe = new Stripe(env.STRIPE_SECRET);
const endpointSecret = env.STRIPE_WEBHOOK;

export async function POST(request: Request) {
    try {
        const signature = request.headers.get("stripe-signature")!;
        const data = await request.text();
        const event = stripe.webhooks.constructEvent(
            data,
            signature,
            endpointSecret,
        );

        if (event.type === "payment_intent.succeeded") {
            const data = event.data.object;
            const paymentId = data.payment_method as string;
            const payment = await stripe.paymentMethods.retrieve(paymentId);
            const email = payment.billing_details.email as string;
            const name = payment.billing_details.name as string;
            const [givenName, familyName] = name.split(" ", 2);

            const user = await getUserByEmail(email);
            const id = user ?? Snowflake.generate();
            user
                ? await setNameOnUser(id, givenName, familyName)
                : await createStripeUser(id, email, givenName, familyName);
        }

        return new Response(null, {
            status: 200,
        });
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return new Response(null, {
            status: 500,
        });
    }
}
