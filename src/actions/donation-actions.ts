"use server";

import Stripe from "stripe";
import { env } from "@/env";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { getUserSession } from "@/actions/auth-actions";
import { getStripeId } from "@/database/auth";

const stripe = new Stripe(env.STRIPE_SECRET);

interface Plan {
    id: string;
    mode: "payment" | "subscription";
}
const plans: Record<string, Plan> = {
    any: {
        id: "price_1PWhZoDXCtuWOFq8Unk6cjIy",
        mode: "payment",
    },
    250: {
        id: "price_1PWh3KDXCtuWOFq88qZGndtv",
        mode: "payment",
    },
    recurent: {
        id: "price_1PX2rHDXCtuWOFq8fbj1dg7p",
        mode: "subscription",
    },
};

export async function checkoutAction(
    prevState: void | undefined,
    formData: FormData,
) {
    try {
        const plan = formData.get("sum") as string;
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: plans[plan]!.id,
                    quantity: 1,
                },
            ],
            mode: plans[plan]!.mode,
            success_url: `${env.NEXT_PUBLIC_APP_URL}/test?success=true`,
            cancel_url: `${env.NEXT_PUBLIC_APP_URL}/test?canceled=true`,
            locale: "ro",
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

export async function stripeDashboardAction() {
    const user = await getUserSession();
    let stripeId;
    if (!user) {
        return;
    }
    stripeId = await getStripeId(user);
    if (!stripeId) {
        return;
    }
    const session = await stripe.billingPortal.sessions.create({
        customer: stripeId,
        return_url: env.NEXT_PUBLIC_APP_URL,
        locale: "ro",
    });
    const url = session.url;
    redirect(url);
}
