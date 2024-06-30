"use client";

import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import {
    checkoutAction,
    stripeDashboardAction,
} from "@/actions/donation-actions";

export function DonationForm() {
    const [, action] = useFormState(checkoutAction, undefined);

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

export function StripeDashboard() {
    const [, action] = useFormState(stripeDashboardAction, undefined);

    return (
        <form action={action}>
            <button type="submit">Manage billing</button>
        </form>
    );
}
