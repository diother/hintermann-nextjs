"use server";

import { z } from "zod";

type FormSchema = string | undefined;
const formSchema = z.object({
    email: z.string().email({
        message: "Emailul este invalid.",
    }),
});

export async function callEmailSignActionProgressive(
    prev: FormSchema,
    formData: FormData,
): Promise<FormSchema> {
    const email = formData.get("email") as string;
    await emailSignAction(email);
    return "success";
}

export async function callEmailSignAction(
    data: z.infer<typeof formSchema>,
): Promise<FormSchema> {
    const email = data.email;
    await emailSignAction(email);
    return "success";
}

async function emailSignAction(email: string) {
    try {
        console.log(email);
        return "success";
    } catch (error) {
        console.log(error);
        return "failure";
    }
}
