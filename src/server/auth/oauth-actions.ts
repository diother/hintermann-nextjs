"use server";

import { generateCodeVerifier, generateState } from "arctic";
import { google } from "./arctic";
import { redirect } from "next/navigation";
import { Cookie } from "./cookie";

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
