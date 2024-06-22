import {
    createSession,
    createUserWithOtp,
    getUserByEmail,
    setOtpOnUser,
    validateOtp,
} from "@/database/auth";
import { OtpSchema, generateOtp } from "@/lib/otp";
import { Snowflake } from "@/lib/snowflake";
import { FormError } from "@/lib/types";
import { z } from "zod";

export function validateEmailForm(email: string): void {
    const valid = z.string().email().safeParse(email);

    if (!valid.success) {
        throw new FormError("Te rugăm introdu un email valid.");
    }
}

export async function createOtpSession(
    email: string,
): Promise<[Buffer, string]> {
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

export function validateOtpForm(otp: string): void {
    const valid = OtpSchema.safeParse(otp);

    if (!valid.success) {
        throw new FormError("Codul de verificare este invalid.");
    }
}

export async function validateOtpService(
    id: Buffer,
    otp: string,
): Promise<void> {
    const res = await validateOtp(id, otp);
    if (!res) {
        throw new FormError("Codul de verificare este invalid.");
    }
}

export async function startSession(userId: Buffer): Promise<Buffer> {
    const sessionId = Snowflake.generate();
    const THIRTY_DAYS = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
    const res = await createSession(userId, sessionId, THIRTY_DAYS);
    if (!res) {
        throw new FormError("Serverele noastre nu au putut procesa cerința.");
    }
    return sessionId;
}
