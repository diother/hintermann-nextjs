import "@/styles/globals.css";

import { Raleway, Roboto } from "next/font/google";
import { type Metadata } from "next";
import { cn } from "@/lib/utils";
import { env } from "@/env";
import CookieConsent from "@/components/cookie-consent";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: {
        template: "%s | Hintermann Charity",
        default: "Hintermann Charity",
    },
    description: "Pagina oficială Hintermann Charity",
    openGraph: {
        title: {
            template: "%s | Hintermann Charity",
            default: "Hintermann Charity",
        },
        description:
            "O organizație caritabilă care și-a propus să construiască case famiililor aflate în dificultate.",
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
        title: {
            template: "%s | Hintermann Charity",
            default: "Hintermann Charity",
        },
        description:
            "O organizație caritabilă care și-a propus să construiască case famiililor aflate în dificultate.",
        images: "/og-image.png",
    },
};

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

const raleway = Raleway({
    subsets: ["latin"],
    display: "swap",
    weight: "900",
    variable: "--font-raleway",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "bg-bg text-text flex min-h-screen flex-col font-body antialiased [&_main]:flex-1",
                    roboto.variable,
                    raleway.variable,
                )}
            >
                {children}
            </body>
        </html>
    );
}
