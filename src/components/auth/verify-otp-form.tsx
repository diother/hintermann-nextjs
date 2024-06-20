"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useFormState } from "react-dom";
import {
    callVerifyOtpAction,
    callVerifyOtpActionProgressive,
} from "@/actions/auth-actions";
import { OtpSchema } from "@/lib/otp";
import { type ErrorSchema } from "@/lib/types";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import React from "react";

export function VerifyOtpForm() {
    const [state, formAction] = useFormState(
        callVerifyOtpActionProgressive,
        undefined,
    );
    const form = useForm<z.infer<typeof VerifyOtpFormSchema>>({
        resolver: zodResolver(VerifyOtpFormSchema),
        defaultValues: {
            otp: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof VerifyOtpFormSchema>) => {
        const response = await callVerifyOtpAction(data);

        if (response) {
            form.setError("otp", {
                type: "server",
                message: response,
            });
        }
    };
    const slotClasses = "h-11 w-11 border-muted-foreground/35 text-base";

    return (
        <Form {...form}>
            <form
                action={formAction}
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-[16.5rem] flex-col items-center gap-2"
            >
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Cod de verificare</FormLabel>
                            <FormControl>
                                <InputOTP
                                    maxLength={6}
                                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                    {...field}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot
                                            index={0}
                                            className={slotClasses}
                                        />
                                        <InputOTPSlot
                                            index={1}
                                            className={slotClasses}
                                        />
                                        <InputOTPSlot
                                            index={2}
                                            className={slotClasses}
                                        />
                                        <InputOTPSlot
                                            index={3}
                                            className={slotClasses}
                                        />
                                        <InputOTPSlot
                                            index={4}
                                            className={slotClasses}
                                        />
                                        <InputOTPSlot
                                            index={5}
                                            className={slotClasses}
                                        />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <ProgressiveMessage>{state}</ProgressiveMessage>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="h-11 w-full text-base">
                    Validează codul
                </Button>
            </form>
        </Form>
    );
}

function ProgressiveMessage({ children }: { children: ErrorSchema }) {
    return <p className="text-sm font-medium text-destructive">{children}</p>;
}
const VerifyOtpFormSchema = z.object({ otp: OtpSchema });
