"use server";

import { redirect } from "next/navigation";
import { Cookie } from "./cookie";
import { deleteSession } from "./database";

export async function deleteCurrentSession(): Promise<void> {
    const cookie = new Cookie("auth_token");
    const session = cookie.validateSnowflake();
    if (!session) {
        return undefined;
    }
    await deleteSession(session);
    cookie.delete();
    redirect("/");
}
