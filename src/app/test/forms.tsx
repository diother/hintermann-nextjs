"use client";

import { useFormState } from "react-dom";
import { ApiTest, StripeDashboard } from "./server";
import { Button } from "@/components/ui/button";

export function DonationForm() {
    const [, action] = useFormState(ApiTest, undefined);

    return (
        <form action={action}>
            <select name="sum" id="sum">
                <option value="250">250 lei</option>
                <option value="any">Orice suma la alegere</option>
                <option value="recurent">Recurent</option>
            </select>
            <Button>Checkout</Button>
        </form>
    );
}

export function Billing({ stripeId }: { stripeId: string }) {
    const [, redirect] = useFormState(StripeDashboard, stripeId);

    return (
        <form action={redirect}>
            <button type="submit">Manage billing</button>
        </form>
    );
}
