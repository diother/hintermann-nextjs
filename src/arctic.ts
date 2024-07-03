import { Google } from "arctic";
import { env } from "@/env";

export const google = new Google(
    env.GOOGLE_ID,
    env.GOOGLE_SECRET,
    `${env.NEXT_PUBLIC_APP_URL}/api/login/google`,
);
