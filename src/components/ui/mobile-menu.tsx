"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const MobileMenu = DialogPrimitive.Root;

const MobileMenuTrigger = DialogPrimitive.Trigger;

const MobileMenuPortal = DialogPrimitive.Portal;

const MobileMenuClose = DialogPrimitive.Close;

const MobileMenuOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-black/80", className)}
        {...props}
    />
));
MobileMenuOverlay.displayName = DialogPrimitive.Overlay.displayName;

const MobileMenuContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <MobileMenuPortal>
        <MobileMenuOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed inset-0 z-50 flex flex-col bg-background",
                className,
            )}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    </MobileMenuPortal>
));
MobileMenuContent.displayName = DialogPrimitive.Content.displayName;

const MobileMenuHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className,
        )}
        {...props}
    />
);
MobileMenuHeader.displayName = "MobileMenuHeader";

const MobileMenuFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className,
        )}
        {...props}
    />
);
MobileMenuFooter.displayName = "MobileMenuFooter";

const MobileMenuTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className,
        )}
        {...props}
    />
));
MobileMenuTitle.displayName = DialogPrimitive.Title.displayName;

const MobileMenuDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
MobileMenuDescription.displayName = DialogPrimitive.Description.displayName;

export {
    MobileMenu,
    MobileMenuPortal,
    MobileMenuOverlay,
    MobileMenuClose,
    MobileMenuTrigger,
    MobileMenuContent,
    MobileMenuHeader,
    MobileMenuFooter,
    MobileMenuTitle,
    MobileMenuDescription,
};
