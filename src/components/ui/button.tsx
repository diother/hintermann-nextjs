import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";

const buttonVariants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants;
    href?: string;
}

const Button = ({
    children,
    className,
    variant = "primary",
    href,
    ...props
}: ButtonProps) => {
    const base = "rounded-full w-fit px-4 font-display border py-2 text-center";

    return href ? (
        <Link
            className={cn(base, className, buttonVariants[variant])}
            href={href}
        >
            {children}
        </Link>
    ) : (
        <button
            className={cn(base, className, buttonVariants[variant])}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
