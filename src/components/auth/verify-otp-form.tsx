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
    callVerifyOtpAction,
    callVerifyOtpActionProgressive,
} from "@/server/auth/otp-actions";
import { OtpSchema } from "@/server/auth/otp";

const VerifyOtpFormSchema = z.object({ otp: OtpSchema });

function ProgressiveMessage({ children }: { children: string | undefined }) {
    return <p className="text-sm font-medium text-destructive">{children}</p>;
}

export function EmailForm() {
    const [state, formAction] = useFormState(
        callVerifyOtpActionProgressive,
        undefined,
    );

    const form = useForm<z.infer<typeof VerifyOtpFormSchema>>({
        resolver: zodResolver(VerifyOtpFormSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof VerifyOtpFormSchema>) => {
        const response = await callVerifyOtpAction(data);

        if (response) {
            form.setError("otp", {
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
                    name="otp"
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
