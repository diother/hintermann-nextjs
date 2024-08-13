"use client";

import * as Menu from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import { Icons } from "./icons";

const navLinks = [
    { name: "Proiecte", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

const HeaderNav = () => {
    const pathname = usePathname();
    return (
        <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                        "text-muted transition-colors hover:text-foreground",
                        pathname === link.href && "text-foreground",
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

const MobileMenu = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <Menu.Root open={open} onOpenChange={setOpen}>
            <Menu.Trigger className="md:hidden">
                <MenuIcon className="h-8 w-8" />
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Overlay />
                <Menu.Content className="fixed inset-0 z-50 flex flex-col bg-background px-4 xs:px-6">
                    <div className="flex min-h-16 flex-col justify-between gap-4 border-b py-4 xs:flex-row xs:items-center">
                        <Link href="/" className="font-display text-2xl">
                            <Icons.logo className="h-[24px] w-[232px]" />
                        </Link>
                        <Menu.Close>
                            <XIcon className="h-8 w-8" />
                        </Menu.Close>
                    </div>
                    <div className="mt-8 flex flex-col gap-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "font-display text-2xl",
                                    pathname === link.href && "text-secondary",
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <Button className="mt-8" size="xl" href="/donate">
                        Donează
                    </Button>
                </Menu.Content>
            </Menu.Portal>
        </Menu.Root>
    );
};

export { HeaderNav, MobileMenu };
