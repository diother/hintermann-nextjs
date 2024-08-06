import { socialIcons } from "@/components/footer";
import { env } from "@/env";
import { ArrowLeft, Check } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Mulțumim",
    openGraph: {
        title: "Mulțumim",
        description: "Mulțumim pentru donație",
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
        title: "Mulțumim",
        description: "Mulțumim pentru donație",
        images: "/og-image.png",
    },
};

export default async function Page() {
    return (
        <main className="mx-auto flex min-h-[100vh] w-full max-w-lg flex-col justify-center gap-6 px-6 py-[6rem]">
            <Check className="h-10 w-10" />
            <h1 className="heading-2">
                Mulțumim! <span className="italic">Serios.</span>
            </h1>
            <p>
                <span className="font-semibold">
                    Și bine ai venit în familie.
                </span>{" "}
                Înțelegem sacrificiul pe care l-ai făcut pentru a oferi din
                banii strânși cu greu, de aceea putem cu adevărat aprecia
                contribuția ta.
            </p>
            <p>Doar împreună putem avea un impact real în țara noastră.</p>
            <p>Stai la curent cu ultimele noutăți:</p>
            <div className="flex items-center gap-5">
                {socialIcons.map((icon) => (
                    <Link
                        key={icon.name}
                        href={icon.href}
                        className="flex w-fit text-2xl transition hover:text-muted-foreground"
                        aria-label={`Link leading to ${icon.name}`}
                    >
                        {icon.svg}
                    </Link>
                ))}
            </div>
            <Link href="/" className="justify-start">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Acasă
            </Link>
        </main>
    );
}
