import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_HOST: z.string(),
        DATABASE_USER: z.string(),
        DATABASE_PASSWORD: z.string(),
        DATABASE_NAME: z.string(),
        GOOGLE_ID: z.string(),
        GOOGLE_SECRET: z.string(),
        RESEND: z.string(),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string(),
    },
    runtimeEnv: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_NAME: process.env.DATABASE_NAME,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        RESEND: process.env.RESEND,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
