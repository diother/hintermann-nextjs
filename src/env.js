import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        STRIPE_SECRET: z.string(),
        STRIPE_WEBHOOK: z.string(),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string(),
    },
    runtimeEnv: {
        STRIPE_SECRET: process.env.STRIPE_SECRET,
        STRIPE_WEBHOOK: process.env.STRIPE_WEBHOOK,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
