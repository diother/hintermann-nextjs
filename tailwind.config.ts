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
        fontSize: {
            xs: "12px",
            sm: "14px",
            base: "16px",
            lg: "18px",
            xl: "20px",
            "2xl": "24px",
            "3xl": "30px",
            "4xl": "36px",
            "5xl": "48px",
            "6xl": "60px",
            "7xl": "72px",
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
                muted: "hsl(var(--muted))",
            },
        },
    },
} satisfies Config;

export default config;
