"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function MobileMenuTrigger({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };
    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <Button
                variant="outline"
                onClick={toggleMenu}
                className="relative h-10 w-10 border lg:hidden"
                aria-label="Menu trigger button"
            >
                {isOpen ? (
                    <>
                        <div className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground transition-transform" />
                        <div className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-foreground transition-transform" />
                    </>
                ) : (
                    <>
                        <div className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-[4.75px] bg-foreground transition-transform" />
                        <div className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 translate-y-[3.25px] bg-foreground transition-transform" />
                    </>
                )}
            </Button>
            {isOpen && children}
        </>
    );
}
