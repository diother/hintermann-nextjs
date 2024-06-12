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
    emailSignAction,
    emailSignActionProgressive,
} from "@/server/auth/otp-actions";

const formSchema = z.object({
    email: z.string().email({
        message: "Emailul este invalid.",
    }),
});

function ProgressiveMessage({ children }: { children: string | undefined }) {
    return <p className="text-sm font-medium text-destructive">{children}</p>;
}

export function EmailForm() {
    const [state, formAction] = useFormState(callEmailSignActionProgressive, undefined,);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
            <form
                action={formAction}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="nume@domeniu.ro"
                                    {...field}
                                />
                            </FormControl>
                            <ProgressiveMessage>{state}</ProgressiveMessage>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
