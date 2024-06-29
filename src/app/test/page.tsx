"use client";

import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { ApiTest } from "./server";

export default function Page() {
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
