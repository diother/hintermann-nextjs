import { google } from "@/arctic";
import {
    createGoogleUser,
    createSession,
    getUserByGoogleId,
} from "@/database/auth";
import { Cookie } from "@/lib/cookie";
import { Snowflake } from "@/lib/snowflake";
import { FormError, type GoogleUser } from "@/lib/types";
import { OAuth2RequestError } from "arctic";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(request: Request) {
    try {
        const [code, verifier] = validateRequirements(request);
        const user = await getUserFromGoogle(code, verifier);
        const sessionId = await startSession(
            user.sub,
            user.email,
            user.email_verified,
        );
        exposeSession(sessionId);

        return new Response(null, {
            status: 404,
        });
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (
            error instanceof OAuth2RequestError &&
            error.message === "bad_verification_code"
        ) {
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

function validateRequirements(request: Request): [string, string] {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const stateCookie = new Cookie("google_oauth_state");
    const verifierCookie = new Cookie("google_oauth_verifier");
    const storedState = stateCookie.get();
    const verifier = verifierCookie.get();
    stateCookie.delete();
    verifierCookie.delete();

    if (!code || !state || !storedState || state !== storedState || !verifier) {
        throw new Error("Input invalid");
    }
    return [code, verifier];
}

async function getUserFromGoogle(
    code: string,
    verifier: string,
): Promise<GoogleUser> {
    const tokens = await google.validateAuthorizationCode(code, verifier);
    const response = await fetch(
        "https://openidconnect.googleapis.com/v1/userinfo",
        {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        },
    );
    const user = (await response.json()) as GoogleUser;
    GoogleUserSchema.parse(user);
    return user;
}

async function startSession(
    googleId: string,
    email: string,
    verified: boolean,
): Promise<Buffer> {
    const user = await getUserByGoogleId(googleId);
    const id = user ?? Snowflake.generate();
    const res = user ?? (await createGoogleUser(id, googleId, email, verified));
    if (!res) {
        throw new FormError("Problem with our servers");
    }
    const sessionId = Snowflake.generate();
    const expiresAt = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
    const session = await createSession(id, sessionId, expiresAt);
    if (!session) {
        throw new FormError("Problem with our servers");
    }
    return sessionId;
}

function exposeSession(sessionId: Buffer): void {
    const expiresAt = new Date(Date.now() + 30 * (24 * 60 * 60 * 1000));
    const cookie = new Cookie("auth_token", sessionId, expiresAt);
    cookie.set();
    redirect("/");
}

const GoogleUserSchema = z.object({
    sub: z.string(),
    name: z.string(),
    email: z.string(),
    email_verified: z.boolean(),
    given_name: z.string().optional(),
    family_name: z.string().optional(),
    picture: z.string().optional(),
    locale: z.string().optional(),
});
