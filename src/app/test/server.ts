"use server";

import Stripe from "stripe";
import { env } from "@/env";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

const stripe = new Stripe(env.STRIPE_SECRET);

const products: Record<string, string> = {
    any: "price_1PWhZoDXCtuWOFq8Unk6cjIy",
    250: "price_1PWh3KDXCtuWOFq88qZGndtv",
};

export async function ApiTest(prevState: void | undefined, formData: FormData) {
    try {
        const sum = formData.get("sum") as string;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: products[sum],
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${env.NEXT_PUBLIC_APP_URL}/test?success=true`,
            cancel_url: `${env.NEXT_PUBLIC_APP_URL}/test?canceled=true`,
        });
        if (!session?.url) {
            throw new Error("Session could not be created");
        }
        redirect(session.url);
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
    }
}
