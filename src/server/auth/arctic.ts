import { Google } from "arctic";
import { env } from "@/env";

const clientId = env.GOOGLE_ID;
const clientSecret = env.GOOGLE_SECRET;
const redirectURI = "http://localhost:3000/api/login/google";

export const google = new Google(clientId, clientSecret, redirectURI);
