"use server";

import { type ErrorSchema, FormError } from "@/lib/types";
import { isRedirectError } from "next/dist/client/components/redirect";
import { Cookie } from "@/lib/cookie";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
    createSession,
    createUserWithOtp,
    deleteSession,
    getUserByEmail,
    setOtpOnUser,
    validateOtp,
    validateSession,
} from "@/database/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/arctic";
import { z } from "zod";
import { OtpSchema, generateOtp } from "@/lib/otp";
import { Snowflake } from "@/lib/snowflake";
import { Resend } from "resend";
import OtpEmail from "emails/otp-email";
import { env } from "@/env";
import { revalidatePath } from "next/cache";

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

function validateEmailForm(email: string): void {
    const valid = z.string().email().safeParse(email);

    if (!valid.success) {
        throw new FormError("Te rugăm introdu un email valid.");
    }
}

async function createOtpSession(email: string): Promise<[Buffer, string]> {
    const user = await getUserByEmail(email);
    const [otp, otpExpiresAt] = generateOtp();

    const id = user ?? Snowflake.generate();
    const res = user
        ? await setOtpOnUser(id, otp, otpExpiresAt)
        : await createUserWithOtp(id, email, otp, otpExpiresAt);

    if (!res) {
        throw new FormError("Serverele noastre nu au putut procesa cerința.");
    }
    return [id, otp];
}

const resend = new Resend(env.RESEND);
const previewText =
    "Întoarce-te la pagina de autentificare și introdu codul de mai jos pentru a finaliza procesul.";

async function sendEmail(
    email: string,
    otp: string,
): Promise<{ id: string } | false> {
    const { data } = await resend.emails.send({
        from: "Hintermann Charity <noreply@hintermann.ro>",
        to: [email],
        subject: "Conectează-te la Hintermann Charity",
        react: OtpEmail({ previewText: previewText, otp: otp }),
    });
    if (!data) {
        throw new FormError("Serverele noastre nu au putut procesa cerința.");
    }
    return data;
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

function validateOtpForm(otp: string): void {
    const valid = OtpSchema.safeParse(otp);

    if (!valid.success) {
        throw new FormError("Codul de verificare este invalid.");
    }
}

async function validateOtpService(id: Buffer, otp: string): Promise<void> {
    const res = await validateOtp(id, otp);
    if (!res) {
        throw new FormError("Codul de verificare este invalid.");
    }
}

async function startSession(userId: Buffer): Promise<Buffer> {
    const sessionId = Snowflake.generate();
    const THIRTY_DAYS = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
    const res = await createSession(userId, sessionId, THIRTY_DAYS);
    if (!res) {
        throw new FormError("Serverele noastre nu au putut procesa cerința.");
    }
    return sessionId;
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
    revalidatePath("/");
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
