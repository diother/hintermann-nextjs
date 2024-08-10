import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";

const base =
    "w-fit rounded-full border text-center font-display transition-colors";

const variants = {
    primary: "border-primary bg-primary text-white hover:bg-primary/80",
    secondary: "border-primary bg-white text-primary hover:bg-white/80",
};

const sizes = {
    base: "px-4 py-1 text-base",
    lg: "px-5 py-1.5 text-lg",
    xl: "px-6 py-2 text-xl",
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    href?: string;
}

const Button = ({
    children,
    className,
    variant = "primary",
    size = "base",
    href,
    ...props
}: ButtonProps) => {
    return href ? (
        <Link
            className={cn(base, className, variants[variant], sizes[size])}
            href={href}
        >
            {children}
        </Link>
    ) : (
        <button
            className={cn(base, className, variants[variant], sizes[size])}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
