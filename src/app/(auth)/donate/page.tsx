import { DonationForm } from "@/components/donation/donation-form";
import { Lock } from "lucide-react";

export default async function Page() {
    return (
        <main className="mx-auto flex min-h-[100vh] w-full max-w-sm flex-col justify-center px-6 py-10">
            <h1>
                Cadoul tău merge înspre construcția de case caritabile și suport
                pentru familii în nevoie.
            </h1>
            <p>
                Suntem într-o misiune de a oferi case caritabile românilor care
                au cea mai mare nevoie de ele. Poți să te alături nouă. Oricât
                de mult dai, fiecare bănuț susține proiectele noastre.
            </p>
            <DonationForm />
            <p>
                <Lock /> În continuare, veți fi redirecționat(ă) către o pagină
                de plată securizată.
            </p>
        </main>
    );
}
