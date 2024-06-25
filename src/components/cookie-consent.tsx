"use client";

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CookieDialog from "./cookie-dialog";

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false);

    const setCookie = (value: string) => {
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `cookie_consent=${value}; expires=${expiryDate.toUTCString()}; path=/`;
    };

    const accept = () => {
        setIsOpen(false);
        setCookie("11");
    };

    const decline = () => {
        setIsOpen(false);
        setCookie("00");
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
                "fixed bottom-0 left-0 right-0 z-[200] hidden w-full sm:bottom-4 sm:left-4 sm:max-w-sm",
                isOpen && "block",
            )}
        >
            <div className="m-2 rounded-md border bg-background">
                <div className="flex flex-col gap-4 p-4">
                    <p className="text-sm font-normal">
                        Acest site folosește tehnologii de urmărire. Puteți să
                        vă înscrieți sau să renunțați la utilizarea acestor
                        tehnologii.
                    </p>
                    <div className="flex items-center gap-2 bg-background/20">
                        <div
                            className="h-10 w-full cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors hover:bg-secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            <CookieDialog className="w-full" />
                        </div>
                        <Button onClick={decline}>Refuză</Button>
                        <Button onClick={accept}>Acceptă</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
