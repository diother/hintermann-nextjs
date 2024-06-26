"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { emailSignAction } from "@/actions/auth-actions";
import { googleSignAction } from "@/actions/auth-actions";
import { Icons } from "../icons";
import React, { type ReactNode } from "react";
import { LoadingSpinner } from "../ui/spinner";
import { ArrowRight } from "lucide-react";
import { verifyOtpAction } from "@/actions/auth-actions";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export function EmailForm() {
    const [state, formAction] = useFormState(emailSignAction, undefined);

    return (
        <form action={formAction} className="flex flex-col gap-3">
            <label className="hidden">Email</label>
            <Input
                name="email"
                className="h-12 text-base"
                placeholder="nume@exemplu.ro"
            />
            {state && (
                <p className="text-sm font-medium text-destructive">{state}</p>
            )}
            <SubmitButton>Continuă cu Email</SubmitButton>
        </form>
    );
}

export function GoogleForm() {
    const [, formAction] = useFormState(googleSignAction, undefined);
    return (
        <form action={formAction} className="flex flex-col">
            <Button variant="secondary" className="h-12 text-base">
                <Icons.google className="mr-3 h-[1.375rem] w-[1.375rem] rounded-full bg-white p-[2px]" />
                Continuă cu Google
            </Button>
        </form>
    );
}

export function VerifyOtpForm() {
    const [state, formAction] = useFormState(verifyOtpAction, undefined);

    return (
        <form
            action={formAction}
            className="flex w-[16.5rem] flex-col items-center gap-3"
        >
            <label className="hidden">Cod de verificare</label>
            <InputOTP
                name="otp"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            {state && (
                <p className="text-sm font-medium text-destructive">{state}</p>
            )}
            <SubmitButton>Validează codul</SubmitButton>
        </form>
    );
}

interface SubmitButton {
    children: ReactNode;
}

export function SubmitButton({ children }: SubmitButton) {
    const status = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={status.pending}
            className="relative flex h-11 w-full items-center gap-2 text-base"
        >
            {children}
            {status.pending ? (
                <LoadingSpinner className="h-[1.125rem] w-[1.125rem]" />
            ) : (
                <ArrowRight className="arrow h-[1.125rem] w-[1.125rem]" />
            )}
        </Button>
    );
}
