"use client";

import { deleteCurrentSession } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export function MobileMenu({ email }: { email?: string }) {
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];
    const [, formAction] = useFormState(deleteCurrentSession, undefined);
    return (
        <nav className="fixed inset-x-0 bottom-0 top-16 flex flex-col overflow-y-auto bg-background p-6 lg:hidden">
            {email ? (
                <div className="flex flex-col justify-end">
                    <span className="py-3 font-semibold">{email}</span>
                    <form action={formAction} className="flex flex-col">
                        <button
                            type="submit"
                            className="flex items-center justify-between py-3 text-muted-foreground"
                        >
                            Deconectează-te
                            <LogOut className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            ) : (
                <Button className="w-full" asChild>
                    <Link href="/login">Autentifică-te</Link>
                </Button>
            )}
            <hr className="my-3" />
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`py-3 text-muted-foreground`}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
}
