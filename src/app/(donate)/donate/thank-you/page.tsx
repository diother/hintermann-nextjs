import { socialIcons } from "@/components/footer";
import Button from "@/components/ui/button";
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

const Page = () => (
    <main className="mx-auto flex min-h-[100vh] w-full max-w-lg flex-col justify-center gap-6 px-6 py-[6rem]">
        <Check className="h-10 w-10 text-primary" />
        <h1 className="font-display text-2xl">
            Mulțumim! <span className="italic">Serios.</span>
        </h1>
        <p>
            <span className="font-semibold">Și bine ai venit în familie.</span>{" "}
            Îți mulțumim din suflet pentru donația ta. Datorită sprijinului tău,
            putem continua să ne dedicăm răspândirii bunătății. Contribuția ta
            înseamnă mult pentru noi și pentru comunitatea pe care o servim.
        </p>
        <p>Doar împreună putem avea un impact real.</p>
        <p>Stai la curent cu ultimele noutăți:</p>
        <div className="flex items-center gap-5">
            {socialIcons.map((icon) => (
                <Link
                    key={icon.name}
                    href={icon.href}
                    className="flex w-fit text-2xl text-secondary transition hover:text-primary"
                    aria-label={`Link leading to ${icon.name}`}
                >
                    {icon.svg}
                </Link>
            ))}
        </div>
        <Button href="/" className="justify-start" variant="secondary">
            Acasă
        </Button>
    </main>
);

export default Page;
