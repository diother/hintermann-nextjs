"use client";

import * as React from "react";
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { deleteCurrentSession } from "@/server/auth/actions";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function AvatarMenu({
    className,
    email,
}: {
    className?: string;
    email?: string;
}) {
    React.useState<Checked>(false);
    const [, formAction] = useFormState(deleteCurrentSession, undefined);
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
