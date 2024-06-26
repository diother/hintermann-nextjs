"use server";

import { type ErrorSchema, FormError } from "@/lib/types";
import { isRedirectError } from "next/dist/client/components/redirect";
import { Cookie } from "@/lib/cookie";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
    createOtpSession,
    startSession,
    validateEmailForm,
    validateOtpForm,
    validateOtpService,
} from "@/services/auth-services";
import { sendEmail } from "@/services/otp-email";
import { deleteSession, validateSession } from "@/database/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/arctic";

export async function emailSignAction(
    prev: ErrorSchema,
    formData: FormData,
): Promise<ErrorSchema> {
    try {
        const email = formData.get("email") as string;
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

export async function verifyOtpAction(
    prev: ErrorSchema,
    formData: FormData,
): Promise<ErrorSchema> {
    try {
        const otp = formData.get("otp") as string;
        validateOtpForm(otp);

        const otpCookie = new Cookie("otp_token");
        const userId = otpCookie.getSnowflake();
        if (!userId) {
            redirect("/login");
        }

        await validateOtpService(userId, otp);
        cookies().delete("otp_token");

        const sessionId = await startSession(userId);

        const THIRTY_DAYS = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
        const sessionCookie = new Cookie("auth_token", sessionId, THIRTY_DAYS);
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

export async function googleSignAction(): Promise<void> {
    const state = generateState();
    const verifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, verifier, {
        scopes: ["profile", "email"],
    });

    const stateCookie = new Cookie("google_oauth_state", state);
    const verifierCookie = new Cookie("google_oauth_verifier", verifier);
    stateCookie.set();
    verifierCookie.set();

    redirect(url.href);
}

export async function signOut(): Promise<void> {
    const cookie = new Cookie("auth_token");
    const session = cookie.getSnowflake();
    if (!session) {
        return undefined;
    }
    await deleteSession(session);
    cookie.delete();
    redirect("/");
}

export async function getUserSession(): Promise<Buffer | undefined> {
    const cookie = new Cookie("auth_token");
    const session = cookie.getSnowflake();
    if (!session) {
        return undefined;
    }
    return await validateSession(session);
}
