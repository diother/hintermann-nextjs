import AuthHeader from "@/components/auth-header";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import { env } from "@/env";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Autentificare",
    openGraph: {
        title: "Autentificare",
        description: "Portal autentificare Hintermann Charity",
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
        title: "Autentificare",
        description: "Portal autentificare Hintermann Charity",
        images: "/og-image.png",
    },
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthHeader />
            {children}
            <Footer />
        </>
    );
}
