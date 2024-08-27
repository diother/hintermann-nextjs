import type { Config } from "tailwindcss";

const config = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        fontFamily: {
            body: [
                "var(--font-roboto)",
                "system-ui",
                "-apple-system",
                "sans-serif",
            ],
            display: [
                "var(--font-raleway)",
                "system-ui",
                "-apple-system",
                "sans-serif",
            ],
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                ternary: "hsl(var(--ternary))",
                quaternary: "hsl(var(--quaternary))",
                muted: "hsl(var(--muted))",
            },
            screens: {
                xs: "360px",
            },
        },
    },
} satisfies Config;

export default config;
