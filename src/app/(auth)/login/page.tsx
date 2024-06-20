import { EmailForm, GoogleForm } from "@/components/auth/login-form";
import { getUserSession } from "@/services/authorize";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getUserSession();
    if (user) {
        redirect("/");
    }

    return (
        <main className="mx-auto flex min-h-[100vh] w-full max-w-sm flex-col justify-center px-6 py-10">
            <h1 className="pb-8 text-center text-4xl font-semibold leading-tight tracking-tighter">
                Autentificare
            </h1>
            <GoogleForm />
            <div className="relative pb-6 pt-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        SAU CONTINUĂ CU
                    </span>
                </div>
            </div>
            <EmailForm />
        </main>
    );
}
