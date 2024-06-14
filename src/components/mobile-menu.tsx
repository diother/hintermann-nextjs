"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet";
import { deleteCurrentSession } from "@/server/auth/actions";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export function MobileMenu({ email }: { email?: string }) {
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];
    const [state, formAction] = useFormState(deleteCurrentSession, undefined);
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="lg:hidden" variant="outline" size="icon">
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <nav className="flex flex-col">
                    {navLinks.map((link) => (
                        <SheetClose asChild key={link.name}>
                            <Link href={link.href} className={`border-b py-3`}>
                                {link.name}
                            </Link>
                        </SheetClose>
                    ))}
                </nav>
                {email ? (
                    <div className="flex flex-col justify-end gap-4 py-12">
                        <span className="border-b py-3 text-sm font-semibold">
                            {email}
                        </span>
                        <SheetClose asChild>
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
                        </SheetClose>
                    </div>
                ) : (
                    <SheetFooter className="mt-6">
                        <SheetClose asChild>
                            <Button className="w-full" asChild>
                                <Link href="/login">Autentifică-te</Link>
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
