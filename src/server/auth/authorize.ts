import { redirect } from "next/navigation";
import { Cookie } from "./cookie";
import { validateSession } from "./database";

export async function allowOnlyLoggedUsers(): Promise<Buffer | undefined> {
    const user = await getUserSession();
    if (!user) {
        redirect("/login");
    }
    return user;
}

export async function allowOnlyUnauthenticatedUsers(): Promise<void> {
    const user = await getUserSession();
    if (user) {
        redirect("/");
    }
}

export async function getUserSession(): Promise<Buffer | undefined> {
    const cookie = new Cookie("auth_token");
    const session = cookie.validateSnowflake();
    if (!session) {
        return undefined;
    }
    return await validateSession(session);
}
