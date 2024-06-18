import AuthHeader from "@/components/auth-header";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Autentificare",
    openGraph: {
        title: "Autentificare",
        description: "Portal autentificare Hintermann Charity",
        type: "website",
        images: [
            {
                url: "/hintermann-logo.png",
                width: 300,
                height: 300,
                alt: "Hintermann Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Autentificare",
        description: "Portal autentificare Hintermann Charity",
        images: "/hintermann-logo.png",
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
