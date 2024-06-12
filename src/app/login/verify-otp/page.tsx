import { VerifyOtpForm } from "@/components/auth/verify-otp-form";

export default function Page() {
    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col p-4 sm:p-10 lg:py-16">
            <VerifyOtpForm />
        </main>
    );
}
