"use client";

import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import {
    checkoutAction,
    stripeDashboardAction,
} from "@/actions/donation-actions";
import { useState } from "react";

export function DonationForm() {
    const [, action] = useFormState(checkoutAction, undefined);

    const [isMonthly, setMonthly] = useState(false);
    const [sub, setSub] = useState("sub_2");
    const [pay, setPay] = useState("pay_2");

    const handleSubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSub(event.target.value);
    };
    const handlePayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPay(event.target.value);
    };

    return (
        <>
            <div>
                <Button variant="secondary" onClick={() => setMonthly(false)}>
                    O dată
                </Button>
                <Button variant="secondary" onClick={() => setMonthly(true)}>
                    Lunar
                </Button>
            </div>
            <div>
                {isMonthly ? (
                    <form action={action}>
                        <input
                            name="mode"
                            className="hidden"
                            value="subscription"
                        />
                        <p>Alege o sumă pe care să o dai lunar</p>
                        <div className="grid grid-cols-2">
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_1"
                                    checked={sub === "sub_1"}
                                    onChange={handleSubChange}
                                />
                                Subscription 1
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_2"
                                    checked={sub === "sub_2"}
                                    onChange={handleSubChange}
                                />
                                Subscription 2
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_3"
                                    checked={sub === "sub_3"}
                                    onChange={handleSubChange}
                                />
                                Subscription 3
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_4"
                                    checked={sub === "sub_4"}
                                    onChange={handleSubChange}
                                />
                                Subscription 4
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_5"
                                    checked={sub === "sub_5"}
                                    onChange={handleSubChange}
                                />
                                Subscription 5
                            </label>
                        </div>
                        <Button type="submit">Alătură-te acum</Button>
                    </form>
                ) : (
                    <form action={action}>
                        <input name="mode" className="hidden" value="payment" />
                        <p>Alege o sumă pe care să o dai</p>
                        <div className="grid grid-cols-2">
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_1"
                                    checked={pay === "pay_1"}
                                    onChange={handlePayChange}
                                />
                                Payment 1
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_2"
                                    checked={pay === "pay_2"}
                                    onChange={handlePayChange}
                                />
                                Payment 2
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_3"
                                    checked={pay === "pay_3"}
                                    onChange={handlePayChange}
                                />
                                Payment 3
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_4"
                                    checked={pay === "pay_4"}
                                    onChange={handlePayChange}
                                />
                                Payment 4
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_5"
                                    checked={pay === "pay_5"}
                                    onChange={handlePayChange}
                                />
                                Payment 5
                            </label>
                        </div>
                        <Button type="submit">Donează</Button>
                    </form>
                )}
            </div>
        </>
    );
}

export function StripeDashboard() {
    const [, action] = useFormState(stripeDashboardAction, undefined);

    return (
        <form action={action}>
            <button type="submit">Gestionează facturare</button>
        </form>
    );
}
