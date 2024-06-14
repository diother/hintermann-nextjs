import { db } from "@/server/db";
import { sessions, users } from "@/server/db/schema";
import { and, eq, gt, sql } from "drizzle-orm";

export async function getUserByEmail(
    email: string,
): Promise<Buffer | undefined> {
    const user = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email));

    return user[0]?.id as Buffer | undefined;
}

export async function getUserByGoogleId(
    googleId: string,
): Promise<Buffer | undefined> {
    const user = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.googleId, googleId));

    return user[0]?.id as Buffer | undefined;
}

export async function createUserWithOtp(
    id: Buffer,
    email: string,
    otp: string,
    otpExpiresAt: Date,
): Promise<boolean> {
    const insert = await db.insert(users).values({
        id: sql`${id}`,
        email: email,
        otp: otp,
        otpExpiresAt: otpExpiresAt,
    });
    return !!insert[0].affectedRows;
}

export async function createGoogleUser(
    id: Buffer,
    googleId: string,
    email: string,
    verified: boolean,
): Promise<boolean> {
    const insert = await db.insert(users).values({
        id: sql`${id}`,
        email: email,
        googleId: googleId,
        emailVerified: verified,
    });
    return !!insert[0].affectedRows;
}

export async function setOtpOnUser(
    id: Buffer,
    otp: string,
    otpExpiresAt: Date,
): Promise<boolean> {
    const update = await db
        .update(users)
        .set({
            otp: otp,
            otpExpiresAt: otpExpiresAt,
        })
        .where(eq(users.id, sql`${id}`));

    return !!update[0].affectedRows;
}

export async function validateOtp(id: Buffer, otp: string): Promise<boolean> {
    const query = await db
        .update(users)
        .set({ otp: null, emailVerified: true })
        .where(
            and(
                eq(users.id, sql`${id}`),
                eq(users.otp, otp),
                gt(users.otpExpiresAt, new Date()),
            ),
        );
    return !!query[0].affectedRows;
}

export async function createSession(
    userId: Buffer,
    sessionId: Buffer,
    expiresAt: Date,
): Promise<boolean> {
    const insert = await db.insert(sessions).values({
        id: sql`${sessionId}`,
        userId: sql`${userId}`,
        expiresAt: expiresAt,
    });
    return !!insert[0].affectedRows;
}

export async function validateSession(
    sessionId: Buffer,
): Promise<Buffer | undefined> {
    const user = await db
        .select({ id: sessions.userId })
        .from(sessions)
        .where(
            and(
                eq(sessions.id, sql`${sessionId}`),
                gt(sessions.expiresAt, new Date()),
            ),
        );
    return user[0]?.id as Buffer | undefined;
}

export async function deleteSession(id: Buffer): Promise<boolean> {
    const query = await db.delete(sessions).where(eq(sessions.id, sql`${id}`));
    return !!query[0].affectedRows;
}

export async function getUserEmail(
    userId: Buffer,
): Promise<string | undefined> {
    const user = await db
        .select({ email: users.email })
        .from(users)
        .where(eq(users.id, sql`${userId}`));
    return user[0]?.email;
}
