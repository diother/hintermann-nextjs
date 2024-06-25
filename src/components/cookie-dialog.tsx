"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function CookieDialog({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [analytics, setAnalytics] = useState(false);

    const onOpen = () => {
        if (!document.cookie.includes("cookie_consent")) {
            return;
        }
        const cookie = `; ${document.cookie}`;
        const parts = cookie.split(`; cookie_consent=`);
        const value = parts.pop()?.split(";").shift();
        if (value === "01") {
            setAnalytics(true);
        }
        if (value === "10") {
            setMarketing(true);
        }
        if (value === "11") {
            setMarketing(true);
            setAnalytics(true);
        }
    };

    const setCookie = (value: string) => {
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `cookie_consent=${value}; expires=${expiryDate.toUTCString()}; path=/`;
    };

    const onSave = () => {
        setOpen(false);

        if (!marketing && !analytics) {
            setCookie("00");
        } else if (!marketing && analytics) {
            setCookie("01");
        } else if (marketing && !analytics) {
            setCookie("10");
        } else if (marketing && analytics) {
            setCookie("11");
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger onClick={onOpen} className={className}>
                Tracking
            </AlertDialogTrigger>
            <AlertDialogContent className="gap-6">
                <AlertDialogHeader className="gap-4 space-y-0">
                    <AlertDialogTitle className="text-2xl tracking-tight">
                        Setări tracking
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-foreground">
                        Acest website folosește tehnologii de urmărire. Puteți
                        să vă înscrieți sau să renunțați la utilizarea acestor
                        tehnologii.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col gap-2 space-y-0 [&_span]:text-sm [&_span]:font-medium">
                    <div className="flex items-center justify-between space-y-0 rounded-md border p-4 ">
                        <span>Marketing</span>
                        <Switch
                            checked={marketing}
                            onCheckedChange={() => setMarketing(!marketing)}
                        />
                    </div>
                    <div className="flex items-center justify-between space-y-0 rounded-md border p-4">
                        <span>Analitice</span>
                        <Switch
                            checked={analytics}
                            onCheckedChange={() => setAnalytics(!analytics)}
                        />
                    </div>
                    <div className="flex items-center justify-between space-y-0 rounded-md border p-4">
                        <span>Esențial</span>
                        <Switch checked disabled aria-disabled />
                    </div>
                </div>
                <AlertDialogFooter>
                    <Button onClick={onSave}>Salvează</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
