import { Cookie } from "@/lib/cookie";
import { validateSession } from "@/database/auth";

export async function getUserSession(): Promise<Buffer | undefined> {
    const cookie = new Cookie("auth_token");
    const session = cookie.validateSnowflake();
    if (!session) {
        return undefined;
    }
    return await validateSession(session);
}
