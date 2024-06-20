"use server";

import { z } from "zod";
import { type ErrorSchema, FormError } from "@/lib/types";
import { isRedirectError } from "next/dist/client/components/redirect";
import { OtpSchema } from "@/lib/otp";
import { Cookie } from "@/lib/cookie";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
    checkOtp,
    createOtpSession,
    startSession,
    validateEmailForm,
    validateOtpForm,
} from "@/services/otp-services";
import { sendEmail } from "@/services/otp-email";

export async function callEmailSignActionProgressive(
    prev: ErrorSchema,
    formData: FormData,
): Promise<ErrorSchema> {
    const email = formData.get("email") as string;
    return await emailSignAction(email);
}

export async function callEmailSignAction(
    data: z.infer<typeof EmailFormSchema>,
): Promise<ErrorSchema> {
    const email = data.email;
    return await emailSignAction(email);
}

async function emailSignAction(email: string): Promise<ErrorSchema> {
    try {
        validateEmailForm(email);
        const [userId, otp] = await createOtpSession(email);

        const cookie = new Cookie("otp_token", userId);
        cookie.set();

        await sendEmail(email, otp);

        redirect(`/login/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof FormError) {
            return error.message;
        }
    }
}

export async function callVerifyOtpActionProgressive(
    prev: ErrorSchema,
    formData: FormData,
): Promise<ErrorSchema> {
    const otp = formData.get("otp") as string;
    return await verifyOtpAction(otp);
}

export async function callVerifyOtpAction(
    data: z.infer<typeof VerifyOtpFormSchema>,
): Promise<ErrorSchema> {
    const otp = data.otp;
    return await verifyOtpAction(otp);
}

export async function verifyOtpAction(otp: string): Promise<ErrorSchema> {
    try {
        const otpCookie = new Cookie("otp_token");
        const userId = validateOtpForm(otp, otpCookie);
        if (!userId) {
            redirect("/login");
        }

        await checkOtp(userId, otp);
        cookies().delete("otp_token");

        const sessionId = await startSession(userId);

        const expiresAt = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
        const sessionCookie = new Cookie("auth_token", sessionId, expiresAt);
        sessionCookie.set();

        redirect("/");
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof FormError) {
            return error.message;
        }
    }
}

const EmailFormSchema = z.object({
    email: z.string().email({
        message: "Te rugăm introdu un email valid.",
    }),
});
const VerifyOtpFormSchema = z.object({ otp: OtpSchema });
