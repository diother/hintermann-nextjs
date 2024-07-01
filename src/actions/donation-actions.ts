"use server";

import Stripe from "stripe";
import { env } from "@/env";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { getUserSession } from "@/actions/auth-actions";
import { getStripeId } from "@/database/auth";
import { z } from "zod";

const stripe = new Stripe(env.STRIPE_SECRET);

const payments: Record<string, string> = {
    pay_1: "price_1PWhZoDXCtuWOFq8Unk6cjIy",
    pay_2: "price_1PWh3KDXCtuWOFq88qZGndtv",
};
const subscriptions: Record<string, string> = {
    sub_5: "price_1PX2rHDXCtuWOFq8fbj1dg7p",
};

export async function checkoutAction(
    prevState: void | undefined,
    formData: FormData,
): Promise<void | undefined> {
    try {
        const mode = formData.get("mode") as "payment" | "subscription";
        const option = formData.get("option") as string;

        validateDonationForm(mode, option);

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price:
                        mode === "payment"
                            ? payments[option]
                            : subscriptions[option],
                    quantity: 1,
                },
            ],
            mode: mode,
            success_url: `${env.NEXT_PUBLIC_APP_URL}/`,
            cancel_url: `${env.NEXT_PUBLIC_APP_URL}/`,
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

function validateDonationForm(mode: string, option: string): void {
    const modeEnum = z.enum(["subscription", "payment"]);
    const optionEnum = z.enum([
        "pay_1",
        "pay_2",
        "pay_3",
        "pay_4",
        "pay_5",
        "sub_1",
        "sub_2",
        "sub_3",
        "sub_4",
        "sub_5",
    ]);
    const valid = z
        .object({ mode: modeEnum, option: optionEnum })
        .refine((data) => {
            if (data.mode === "payment") {
                return data.option.startsWith("pay_");
            } else {
                return data.option.startsWith("sub_");
            }
        }, "Invalid option based on mode")
        .safeParse({
            mode: mode,
            option: option,
        });

    if (!valid.success) {
        throw new Error("Invalid data");
    }
}

export async function stripeDashboardAction() {
    const user = await getUserSession();
    if (!user) {
        return;
    }
    const stripeId = await getStripeId(user);
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
