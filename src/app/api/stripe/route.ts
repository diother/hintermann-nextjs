import Stripe from "stripe";
import { env } from "@/env";
import { isRedirectError } from "next/dist/client/components/redirect";
import {
    createStripeUser,
    createStripeUserWithId,
    getUserByEmail,
    setNameOnUser,
    setStripeIdOnUser,
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

        if (event.type === "checkout.session.completed") {
            const data = event.data.object;

            const email = data.customer_details!.email!;
            const name = data.customer_details!.name!;
            const [givenName, familyName] = name.split(" ", 2);

            if (data.mode === "payment") {
                const user = await getUserByEmail(email);
                const id = user ?? Snowflake.generate();
                user
                    ? await setNameOnUser(id, givenName, familyName)
                    : await createStripeUser(id, email, givenName, familyName);
            } else if (data.mode === "subscription") {
                const stripeId = data.customer as string;
                const user = await getUserByEmail(email);
                const id = user ?? Snowflake.generate();
                user
                    ? await setStripeIdOnUser(
                          id,
                          givenName,
                          familyName,
                          stripeId,
                      )
                    : await createStripeUserWithId(
                          id,
                          email,
                          givenName,
                          familyName,
                          stripeId,
                      );
            }
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
