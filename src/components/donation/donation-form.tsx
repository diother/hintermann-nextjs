"use client";

import { useFormState } from "react-dom";
import { checkoutAction } from "@/actions/donation-actions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "../ui/button";

const subscriptions = ["100 lei", "75 lei", "50 lei", "35 lei", "25 lei"];
const payments = ["100 lei", "50 lei", "25 lei", "10 lei", "Altă sumă"];

export const DonationForm = () => {
    const [isMonthly, setMonthly] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2">
                <button
                    className={cn(
                        "h-8 rounded-full rounded-r-none border border-secondary text-secondary",
                        !isMonthly && "bg-secondary text-white",
                    )}
                    onClick={() => setMonthly(false)}
                >
                    O dată
                </button>
                <button
                    className={cn(
                        "h-8 rounded-full rounded-l-none border border-secondary text-secondary",
                        isMonthly && "bg-secondary text-white",
                    )}
                    onClick={() => setMonthly(true)}
                >
                    Lunar
                </button>
            </div>
            {isMonthly ? <Form method="sub" /> : <Form method="pay" />}
        </div>
    );
};

const Form = ({ method }: { method: "pay" | "sub" }) => {
    const [, action] = useFormState(checkoutAction, undefined);
    const [value, setValue] = useState(`pay_4`);

    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <form action={action} className="flex flex-col gap-2">
            <input
                name="mode"
                className="hidden"
                value={method === "pay" ? "payment" : "subscription"}
                readOnly
            />
            <Option method={method} value={value} change={change} index={1} />
            <Option method={method} value={value} change={change} index={2} />
            <Option method={method} value={value} change={change} index={3} />
            <Option method={method} value={value} change={change} index={4} />
            <Option method={method} value={value} change={change} index={5} />
            <Button type="submit" className="mt-4 w-full" size="xl">
                {method === "pay" ? "Donează acum" : "Alătură-te acum"}
            </Button>
        </form>
    );
};

interface OptionProps {
    method: "pay" | "sub";
    value: string;
    change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    index: 1 | 2 | 3 | 4 | 5;
}

const Option = ({ method, value, change, index }: OptionProps) => (
    <label
        className={cn(
            "flex h-12 items-center justify-center rounded-full border-2 border-secondary font-display text-xl text-secondary",
            value === `${method}_${index}` && "bg-secondary text-white shadow",
        )}
    >
        <input
            type="radio"
            name="option"
            value={`${method}_${index}`}
            checked={value === `${method}_${index}`}
            onChange={change}
            hidden
        />
        {method === "pay" ? payments[index - 1] : subscriptions[index - 1]}
    </label>
);
