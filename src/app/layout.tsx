import "@/styles/globals.css";

import { Raleway, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import CookieConsent from "@/components/cookie-consent";
import Meta from "@/lib/metadata";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = Meta(
    "Hintermann Charity",
    "Împărtășim bunătate, răspândim bucurie.",
);

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
                <Header />
                {children}
                <Footer />
                <CookieConsent />
            </body>
        </html>
    );
}
