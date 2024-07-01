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
    const [sub, setSub] = useState("sub_1");
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
                            readOnly
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
                                100 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_2"
                                    checked={sub === "sub_2"}
                                    onChange={handleSubChange}
                                />
                                75 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_3"
                                    checked={sub === "sub_3"}
                                    onChange={handleSubChange}
                                />
                                50 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_4"
                                    checked={sub === "sub_4"}
                                    onChange={handleSubChange}
                                />
                                35 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_5"
                                    checked={sub === "sub_5"}
                                    onChange={handleSubChange}
                                />
                                25 lei
                            </label>
                        </div>
                        <Button type="submit">Alătură-te acum</Button>
                    </form>
                ) : (
                    <form action={action}>
                        <input
                            name="mode"
                            className="hidden"
                            value="payment"
                            readOnly
                        />
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
                                500 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_2"
                                    checked={pay === "pay_2"}
                                    onChange={handlePayChange}
                                />
                                300 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_3"
                                    checked={pay === "pay_3"}
                                    onChange={handlePayChange}
                                />
                                200 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_4"
                                    checked={pay === "pay_4"}
                                    onChange={handlePayChange}
                                />
                                100 lei
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_5"
                                    checked={pay === "pay_5"}
                                    onChange={handlePayChange}
                                />
                                Altă sumă
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
