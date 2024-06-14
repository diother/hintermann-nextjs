"use server";

import { Cookie } from "./cookie";
import { deleteSession } from "./database";

export async function deleteCurrentSession(): Promise<boolean> {
    const cookie = new Cookie("auth_token");
    const session = cookie.validateSnowflake();
    if (!session) {
        return false;
    }
    return await deleteSession(session);
}
