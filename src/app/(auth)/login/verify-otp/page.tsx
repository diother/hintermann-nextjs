import { VerifyOtpForm } from "@/components/auth/verify-otp-form";
// import { allowOnlyUnauthenticatedUsers } from "@/server/auth/authorize";
import { Cookie } from "@/lib/cookie";
import { redirect } from "next/navigation";

export default async function Page({
    searchParams,
}: {
    searchParams?: Record<string, string | string[] | undefined>;
}) {
    // await allowOnlyUnauthenticatedUsers();
    validateOtpSession();
    const email = searchParams?.email;

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
}

function validateOtpSession() {
    const cookie = new Cookie("otp_token");
    const userId = cookie.validateSnowflake();
    if (!userId) {
        redirect("/login");
    }
}
