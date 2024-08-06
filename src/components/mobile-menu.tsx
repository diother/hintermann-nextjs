"use client";

import * as Menu from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import Button from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLink {
    name: string;
    href: string;
}

const MobileMenu = ({ navLinks }: { navLinks: NavLink[] }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <Menu.Root open={open} onOpenChange={setOpen}>
            <Menu.Trigger>Open</Menu.Trigger>
            <Menu.Portal>
                <Menu.Overlay />
                <Menu.Content className="fixed inset-0 z-50 flex flex-col bg-background px-6">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="font-display text-xl ">
                            Hintermann
                            <span className="text-primary"> Charity</span>
                        </Link>
                        <Menu.Close>Close</Menu.Close>
                    </div>
                    <Button href="/contact">Donate</Button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-muted-foreground py-3"
                        >
                            {link.name}
                        </Link>
                    ))}
                </Menu.Content>
            </Menu.Portal>
        </Menu.Root>
    );
};

export default MobileMenu;
