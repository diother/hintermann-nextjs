"use server";

import { z } from "zod";
import { FormError } from "../types";
import { isRedirectError } from "next/dist/client/components/redirect";
import {
    createSession,
    createUserWithOtp,
    getUserByEmail,
    setOtpOnUser,
    validateOtp,
} from "./database";
import { OtpSchema, generateOtp } from "./otp";
import { Snowflake } from "../snowflake";
import { Cookie } from "./cookie";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function callEmailSignActionProgressive(
    prev: ErrorSchema,
    formData: FormData,
): Promise<ErrorSchema> {
    const email = formData.get("email") as string;
    const error = await emailSignAction(email);
    return error;
}

export async function callEmailSignAction(
    data: z.infer<typeof EmailFormSchema>,
): Promise<ErrorSchema> {
    const email = data.email;
    const error = await emailSignAction(email);
    return error;
}

async function emailSignAction(email: string) {
    try {
        validateEmailForm(email);
        const [userId, otp] = await createOtpSession(email);
        exposeOtpSession(userId, otp);
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof FormError) {
            return error.message;
        }
    }
}

function validateEmailForm(email: string): ErrorSchema {
    const valid = z.string().email().safeParse(email);

    if (!valid.success) {
        throw new FormError("Email is not valid");
    }
    return undefined;
}

async function createOtpSession(email: string): Promise<[Buffer, string]> {
    const user = await getUserByEmail(email);
    const [otp, otpExpiresAt] = generateOtp();

    const id = user ?? Snowflake.generate();
    const res = user
        ? await setOtpOnUser(id, otp, otpExpiresAt)
        : await createUserWithOtp(id, email, otp, otpExpiresAt);

    if (!res) {
        throw new FormError("Failed to generate OTP");
    }
    return [id, otp];
}

function exposeOtpSession(userId: Buffer, otp: string): void {
    const cookie = new Cookie("otp_token", userId);
    cookie.set();

    console.log(otp);
    redirect("login/verify-otp");
}

export async function callVerifyOtpActionProgressive(
    prev: ErrorSchema,
    formData: FormData,
): Promise<ErrorSchema> {
    const otp = formData.get("otp") as string;
    const error = await verifyOtpAction(otp);
    return error;
}

export async function callVerifyOtpAction(
    data: z.infer<typeof VerifyOtpFormSchema>,
): Promise<ErrorSchema> {
    const otp = data.otp;
    const error = await verifyOtpAction(otp);
    return error;
}

export async function verifyOtpAction(otp: string): Promise<ErrorSchema> {
    try {
        const userId = validateOtpForm(otp);
        await checkOtp(userId, otp);
        const sessionId = await startSession(userId);
        exposeSession(sessionId);
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof FormError) {
            return error.message;
        }
    }
}

function validateOtpForm(otp: string): Buffer {
    const cookie = new Cookie("otp_token");
    const userId = cookie.validateSnowflake();
    if (!userId) {
        redirect("/login");
    }
    const valid = OtpSchema.safeParse(otp);
    if (!valid.success) {
        throw new FormError("OTP is not valid");
    }
    return userId;
}

async function checkOtp(id: Buffer, otp: string): Promise<void> {
    const res = await validateOtp(id, otp);
    if (!res) {
        throw new FormError("OTP is not valid");
    }
    cookies().delete("otp_token");
}

async function startSession(userId: Buffer): Promise<Buffer> {
    const sessionId = Snowflake.generate();
    const expiresAt = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
    const session = await createSession(userId, sessionId, expiresAt);
    if (!session) {
        throw new FormError("Problem with our servers");
    }
    return sessionId;
}

function exposeSession(sessionId: Buffer): void {
    const expiresAt = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
    const cookie = new Cookie("auth_token", sessionId, expiresAt);
    cookie.set();
    redirect("/dashboard");
}

type ErrorSchema = string | undefined;
const EmailFormSchema = z.object({
    email: z.string().email({
        message: "Emailul este invalid.",
    }),
});
const VerifyOtpFormSchema = z.object({ otp: OtpSchema });
