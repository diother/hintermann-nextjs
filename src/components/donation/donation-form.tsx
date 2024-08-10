"use client";

import { useFormState } from "react-dom";
import Button from "@/components/ui/button";
import { checkoutAction } from "@/actions/donation-actions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
            <div className="grid grid-cols-2 gap-2">
                <Button
                    variant="secondary"
                    className={cn(
                        "relative text-base",
                        !isMonthly && "bg-secondary/60 hover:bg-secondary/60",
                    )}
                    onClick={() => setMonthly(false)}
                >
                    O dată
                    {!isMonthly && (
                        <Check className="absolute right-4 h-[1.125rem] w-[1.125rem]" />
                    )}
                </Button>
                <Button
                    variant="secondary"
                    className={cn(
                        "relative text-base",
                        isMonthly && "bg-secondary/60 hover:bg-secondary/60",
                    )}
                    onClick={() => setMonthly(true)}
                >
                    Lunar
                    {isMonthly && (
                        <Check className="absolute right-4 h-[1.125rem] w-[1.125rem]" />
                    )}
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
                        <p className="rounded-t-md border-x border-t p-3 text-center font-medium">
                            Alege o sumă pe care să o dai lunar
                        </p>
                        <div className="grid grid-cols-2 gap-3 border p-4">
                            <label
                                className={cn(
                                    "col-span-2",
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    sub === "sub_1" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_1"
                                    checked={sub === "sub_1"}
                                    onChange={handleSubChange}
                                    hidden
                                />
                                100 lei
                            </label>
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    sub === "sub_2" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_2"
                                    checked={sub === "sub_2"}
                                    onChange={handleSubChange}
                                    hidden
                                />
                                75 lei
                            </label>
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    sub === "sub_3" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_3"
                                    checked={sub === "sub_3"}
                                    onChange={handleSubChange}
                                    hidden
                                />
                                50 lei
                            </label>
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    sub === "sub_4" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_4"
                                    checked={sub === "sub_4"}
                                    onChange={handleSubChange}
                                    hidden
                                />
                                35 lei
                            </label>
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    sub === "sub_5" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="sub_5"
                                    checked={sub === "sub_5"}
                                    onChange={handleSubChange}
                                    hidden
                                />
                                25 lei
                            </label>
                            <button
                                type="submit"
                                className="col-span-2 h-11 w-full"
                            >
                                Alătură-te acum
                            </button>
                        </div>
                    </form>
                ) : (
                    <form action={action}>
                        <input
                            name="mode"
                            className="hidden"
                            value="payment"
                            readOnly
                        />
                        <p className="rounded-t-md border-x border-t p-3 text-center font-medium">
                            Alege o sumă pe care să o dai
                        </p>
                        <div className="grid grid-cols-2 gap-3 border p-4">
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    pay === "pay_1" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_1"
                                    checked={pay === "pay_1"}
                                    onChange={handlePayChange}
                                    hidden
                                />
                                100 lei
                            </label>
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    pay === "pay_2" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_2"
                                    checked={pay === "pay_2"}
                                    onChange={handlePayChange}
                                    hidden
                                />
                                50 lei
                            </label>
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    pay === "pay_3" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_3"
                                    checked={pay === "pay_3"}
                                    onChange={handlePayChange}
                                    hidden
                                />
                                25 lei
                            </label>
                            <label
                                className={cn(
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    pay === "pay_4" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_4"
                                    checked={pay === "pay_4"}
                                    onChange={handlePayChange}
                                    hidden
                                />
                                10 lei
                            </label>
                            <label
                                className={cn(
                                    "col-span-2",
                                    "text-muted-foreground flex h-11 cursor-pointer items-center justify-center rounded-md border p-3 transition-colors hover:bg-secondary hover:text-foreground",
                                    pay === "pay_5" &&
                                        "bg-secondary font-semibold text-foreground",
                                )}
                            >
                                <input
                                    type="radio"
                                    name="option"
                                    value="pay_5"
                                    checked={pay === "pay_5"}
                                    onChange={handlePayChange}
                                    hidden
                                />
                                Altă sumă
                            </label>
                            <button type="submit" className="col-span-2">
                                Donează
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
