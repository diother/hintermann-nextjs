"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import {
    callEmailSignAction,
    callEmailSignActionProgressive,
} from "@/actions/auth-actions";
import { type ErrorSchema } from "@/lib/types";
// import { googleSignAction } from "@/actions/auth-actions";
import { Icons } from "../icons";
import React from "react";
import { LoadingSpinner } from "../ui/spinner";

export function EmailForm() {
    const [state, formAction] = useFormState(
        callEmailSignActionProgressive,
        undefined,
    );
    const form = useForm<z.infer<typeof EmailFormSchema>>({
        resolver: zodResolver(EmailFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (data: z.infer<typeof EmailFormSchema>) => {
        setIsLoading(true);
        try {
            const response = await callEmailSignAction(data);
            if (response) {
                form.setError("email", {
                    type: "server",
                    message: response,
                });
                setIsLoading(false);
            }
        } catch (error) {
            form.setError("email", {
                type: "server",
                message: "Serverele noastre nu au putut procesa cerința.",
            });
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form action={formAction} onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className="hidden">Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="h-12 text-base"
                                    placeholder="nume@exemplu.ro"
                                    {...field}
                                />
                            </FormControl>
                            <ProgressiveMessage>{state}</ProgressiveMessage>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="relative mt-2 h-12 w-full text-base"
                >
                    {isLoading && (
                        <LoadingSpinner className="absolute left-4" />
                    )}
                    Continuă cu Email
                </Button>
            </form>
        </Form>
    );
}

export function GoogleForm() {
    // const [, formAction] = useFormState(googleSignAction, undefined);
    return (
        <Button variant="secondary" className="h-12 text-base">
            <Icons.google className="mr-3 h-[1.375rem] w-[1.375rem] rounded-full bg-white p-[2px]" />
            Continuă cu Google
        </Button>
    );
}
// <form action={formAction} className="flex flex-col">
// </form>

const EmailFormSchema = z.object({
    email: z.string().email({
        message: "Te rugăm introdu un email valid.",
    }),
});

function ProgressiveMessage({ children }: { children: ErrorSchema }) {
    return <p className="text-sm font-medium text-destructive">{children}</p>;
}
