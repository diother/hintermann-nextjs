import { DonationForm } from "@/components/donation/donation-form";
import { Lock } from "lucide-react";

export default async function Page() {
    return (
        <main className="mx-auto flex min-h-[100vh] w-full max-w-lg flex-col justify-center gap-6 px-6 py-[6rem]">
            <h1 className="heading-2">
                Cadoul tău merge înspre construcția de case caritabile și suport
                pentru familii în nevoie.
            </h1>
            <p>
                Suntem într-o misiune de a oferi case caritabile românilor care
                au cea mai mare nevoie de ele. Poți să te alături nouă. Oricât
                de mult poți da, fiecare bănuț susține impactul nostru.
            </p>
            <DonationForm />
            <p className="text-sm text-muted-foreground">
                <Lock className="mb-[.30rem] mr-1 inline h-4 w-4" /> În
                continuare, veți fi redirecționat(ă) către o pagină de plată
                securizată.
            </p>
        </main>
    );
}
