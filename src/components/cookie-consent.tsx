"use client";

import Button from "./ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false);

    const setCookie = (value: boolean) => {
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `cookie_consent=${value}; expires=${expiryDate.toUTCString()}; path=/`;
    };
    const accept = () => {
        setIsOpen(false);
        setCookie(true);
    };
    const decline = () => {
        setIsOpen(false);
        setCookie(false);
    };
    useEffect(() => {
        if (!document.cookie.includes("cookie_consent")) {
            setIsOpen(true);
            return;
        }
    }, []);

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-[200] hidden w-full flex-col gap-4 bg-secondary p-4",
                isOpen && "flex",
            )}
        >
            <p className="text-sm font-normal text-white">
                Folosim cookie-uri pentru a colecta date în scopul îmbunătățirii
                Website-ului. Continuând să utilizați acest Website, sunteți de
                acord cu practicile noastre de confidențialitate.{" "}
                <Link href="/legal/privacy" className="underline">
                    Politică de confidențialitate
                </Link>{" "}
                și{" "}
                <Link href="/legal/terms" className="underline">
                    Termeni și condiții.
                </Link>
            </p>
            <div className="flex items-center gap-2">
                <Button onClick={accept}>Acceptă</Button>
                <Button onClick={decline} variant="secondary">
                    Refuză
                </Button>
            </div>
        </div>
    );
}
