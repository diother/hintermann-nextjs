import { DonationForm } from "@/components/donation/donation-form";
import { env } from "@/env";
import { Lock } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Portal donații",
    openGraph: {
        title: "Portal donații",
        description: "Portal donații Hintermann Charity",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Hintermann Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Portal donații",
        description: "Portal donații Hintermann Charity",
        images: "/og-image.png",
    },
};

export default async function Page() {
    return (
        <main className="mx-auto flex min-h-[100vh] w-full max-w-lg flex-col justify-center gap-6 px-6 py-[6rem]">
            <h1 className="heading-2">
                Cadoul tău merge înspre construcția de case caritabile și suport
                pentru familii în nevoie.
            </h1>
            <p className="sm:text-lg">
                Suntem într-o misiune de a oferi case caritabile românilor care
                au cea mai mare nevoie de ele. Oricât de mult poți da, fiecare
                bănuț susține impactul nostru.
            </p>
            <DonationForm />
            <p className="text-sm text-muted-foreground sm:text-base">
                <Lock className="mb-[.30rem] mr-1 inline h-4 w-4" /> În
                continuare, veți fi redirecționat(ă) către o pagină de plată
                securizată.
            </p>
        </main>
    );
}
