"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];
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
                <SheetFooter className="mt-6">
                    <SheetClose asChild>
                        <Button className="w-full" asChild>
                            <Link href="/login">Autentifică-te</Link>
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
