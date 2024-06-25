import { Google } from "arctic";
import { env } from "@/env";

const clientId = env.GOOGLE_ID;
const clientSecret = env.GOOGLE_SECRET;
const redirectURI = `${env.NEXT_PUBLIC_APP_URL}/api/login/google`;

export const google = new Google(clientId, clientSecret, redirectURI);
