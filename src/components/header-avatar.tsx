"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, Settings } from "lucide-react";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";
import { signOut } from "@/actions/auth-actions";
import { stripeDashboardAction } from "@/actions/donation-actions";

interface AvatarMenu {
    className?: string;
    email?: string;
    billing?: boolean;
}
export function AvatarMenu({ className, email, billing }: AvatarMenu) {
    const [, formAction] = useFormState(signOut, undefined);
    const [, dashboardAction] = useFormState(stripeDashboardAction, undefined);

    const avatar = email?.slice(0, 2).toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className={cn("cursor-pointer", className)}>
                    <AvatarFallback>{avatar ? avatar : "TU"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56">
                <DropdownMenuLabel>{email}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <form action={formAction} className="flex flex-col">
                    <Button
                        variant="outline"
                        type="submit"
                        className="flex items-center justify-between border-0 px-2 py-1.5"
                    >
                        Deconectează-te
                        <LogOut className="h-4 w-4" />
                    </Button>
                </form>
                {billing && (
                    <form action={dashboardAction} className="flex flex-col">
                        <Button
                            variant="outline"
                            type="submit"
                            className="flex items-center justify-between border-0 px-2 py-1.5"
                        >
                            Gestionează facturare
                            <Settings className="h-4 w-4" />
                        </Button>
                    </form>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
