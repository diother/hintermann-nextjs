"use client";

import { VerifyOtpForm } from "@/components/auth/verify-otp-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useSearchParams } from "next/navigation";
// import { Cookie } from "@/server/auth/cookie";
// import { redirect } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const slotClasses = "h-11 w-11 border-muted-foreground/35 text-base";
    return (
        <main className="mx-auto flex min-h-[100vh] w-full max-w-sm flex-col items-center justify-center gap-8 px-6 py-10">
            <h1 className="text-center text-4xl font-semibold leading-tight tracking-tighter">
                Verifică-ți inboxul
            </h1>
            <p className="text-center text-muted-foreground">
                Introdu codul de verificare trimis la{" "}
                {email ?? "emailul introdus."}
            </p>
            <VerifyOtpForm />
        </main>
    );
    // const cookie = new Cookie("otp_token");
    // const userId = cookie.validateSnowflake();
    // if (!userId) {
    //     redirect("/login");
    // }
    // return (
    //     <main className="mx-auto flex w-full max-w-6xl flex-col p-4 sm:p-10 lg:py-16">
    //         <VerifyOtpForm />
    //     </main>
    // );
}
