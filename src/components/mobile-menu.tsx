"use client";

import { Button } from "@/components/ui/button";
import { deleteCurrentSession } from "@/server/auth/actions";
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
                <div className="mb-8 flex flex-col justify-end">
                    <span className="py-3 font-semibold">{email}</span>
                    <form action={formAction} className="flex flex-col">
                        <Button
                            variant="secondary"
                            type="submit"
                            className="flex items-center justify-between"
                        >
                            Deconectează-te
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            ) : (
                <Button className="mb-8 w-full" asChild>
                    <Link href="/login">Autentifică-te</Link>
                </Button>
            )}
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`border-b py-3`}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
}
