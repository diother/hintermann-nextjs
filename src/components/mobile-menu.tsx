"use client";

import { signOut } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import {
    MobileMenu,
    MobileMenuClose,
    MobileMenuContent,
    MobileMenuTrigger,
} from "./ui/mobile-menu";
import { Icons } from "./icons";

export function HeaderMobileMenu({ email }: { email?: string }) {
    const [, formAction] = useFormState(signOut, undefined);
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];
    return (
        <MobileMenu>
            <MobileMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-md border lg:hidden">
                <Menu />
            </MobileMenuTrigger>
            <MobileMenuContent>
                <div className="box-content flex h-16 items-center justify-between border-b px-6">
                    <Link href="/">
                        <MobileMenuClose className="flex items-center gap-1.5">
                            <Icons.logo />
                            <span className="text-center text-xl font-semibold leading-tight tracking-tighter">
                                Hintermann Charity
                            </span>
                        </MobileMenuClose>
                    </Link>
                    <MobileMenuClose className="flex h-10 w-10 items-center justify-center rounded-md border">
                        <X />
                    </MobileMenuClose>
                </div>
                <div className="flex flex-col overflow-y-auto bg-background p-6">
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
                </div>
            </MobileMenuContent>
        </MobileMenu>
    );
}
