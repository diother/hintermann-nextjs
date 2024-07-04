"use client";

import { signOut } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import {
    MobileMenu,
    MobileMenuClose,
    MobileMenuContent,
    MobileMenuTrigger,
} from "./ui/mobile-menu";
import { Icons } from "./icons";
import { useState } from "react";
import { stripeDashboardAction } from "@/actions/donation-actions";

interface MobileMenu {
    email?: string;
    billing?: boolean;
}
export function HeaderMobileMenu({ email, billing }: MobileMenu) {
    const [open, setOpen] = useState(false);
    const handleLinkClick = () => {
        setTimeout(() => {
            setOpen(false);
        }, 300);
    };
    const [, signOutAction] = useFormState(signOut, undefined);
    const [, dashboardAction] = useFormState(stripeDashboardAction, undefined);

    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
        { name: "Portal donații", href: "/donate" },
    ];
    return (
        <MobileMenu open={open} onOpenChange={setOpen}>
            <MobileMenuTrigger className="flex h-10 w-10 items-center justify-center rounded-md border lg:hidden">
                <Menu />
            </MobileMenuTrigger>
            <MobileMenuContent>
                <div className="box-content flex h-16 items-center justify-between border-b px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5"
                        onClick={handleLinkClick}
                    >
                        <Icons.logo />
                        <span className="text-center text-xl font-semibold leading-tight tracking-tight">
                            Hintermann Charity
                        </span>
                    </Link>
                    <MobileMenuClose className="flex h-10 w-10 items-center justify-center rounded-md border">
                        <X />
                    </MobileMenuClose>
                </div>
                <div className="flex flex-col overflow-y-auto bg-background p-6">
                    <Link href="/donate">
                        <Button
                            className="mb-3 w-full"
                            variant={email ? "secondary" : "default"}
                        >
                            Donează
                        </Button>
                    </Link>
                    {email ? (
                        <div className="flex flex-col justify-end">
                            <span className="py-3 font-semibold">{email}</span>
                            <form
                                action={signOutAction}
                                className="flex flex-col"
                            >
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
                        <Link href="/login" onClick={handleLinkClick}>
                            <Button className="w-full" variant="outline">
                                Autentifică-te
                            </Button>
                        </Link>
                    )}
                    {billing && (
                        <form
                            action={dashboardAction}
                            className="flex flex-col"
                        >
                            <button
                                type="submit"
                                className="flex items-center justify-between py-3 text-muted-foreground"
                            >
                                Gestionează plăți
                                <Settings className="h-4 w-4" />
                            </button>
                        </form>
                    )}
                    <hr className="my-3" />
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`py-3 text-muted-foreground`}
                            onClick={handleLinkClick}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </MobileMenuContent>
        </MobileMenu>
    );
}
