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
} from "@/server/auth/otp-actions";
import { type ErrorSchema } from "@/server/types";
import { googleSignAction } from "@/server/auth/oauth-actions";
import { Icons } from "../icons";
import { deleteCurrentSession } from "@/server/auth/actions";

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
    const onSubmit = async (data: z.infer<typeof EmailFormSchema>) => {
        const response = await callEmailSignAction(data);

        if (response) {
            form.setError("email", {
                type: "server",
                message: response,
            });
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
                <Button type="submit" className="mt-2 h-12 w-full text-base">
                    Continuă cu Email
                </Button>
            </form>
        </Form>
    );
}

export function GoogleForm() {
    const [state, formAction] = useFormState(googleSignAction, undefined);
    return (
        <form action={formAction} className="flex flex-col">
            <Button variant="secondary" className="h-12 text-base">
                <Icons.google className="mr-3 h-[1.375rem] w-[1.375rem] rounded-full bg-white p-[2px]" />
                Continuă cu Google
            </Button>
        </form>
    );
}

export function SignOutForm() {
    const [state, formAction] = useFormState(deleteCurrentSession, undefined);
    return (
        <form action={formAction}>
            <Button variant="outline">Deconectează-te</Button>
        </form>
    );
}

const EmailFormSchema = z.object({
    email: z.string().email({
        message: "Te rugăm introdu un email valid.",
    }),
});

function ProgressiveMessage({ children }: { children: ErrorSchema }) {
    return <p className="text-sm font-medium text-destructive">{children}</p>;
}
