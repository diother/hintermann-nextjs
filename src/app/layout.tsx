import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { type Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
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
        description: "Pagina oficială Hintermann Charity",
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
        title: {
            template: "%s | Hintermann Charity",
            default: "Hintermann Charity",
        },
        description: "Pagina oficială Hintermann Charity",
        images: "/hintermann-logo.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "bg-bg text-text flex min-h-screen flex-col bg-background font-sans antialiased [&_main]:flex-1",
                    GeistSans.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
