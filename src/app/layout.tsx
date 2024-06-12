import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { type Metadata } from "next";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: {
        template: "%s | Hintermann Charity",
        default: "Hintermann Charity",
    },
    description: "Pagina oficială Hintermann Charity",
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
                    <Header />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
