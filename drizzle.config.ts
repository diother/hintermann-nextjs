import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
    schema: "./src/server/db/schema.ts",
    dialect: "mysql",
    dbCredentials: {
        host: env.DATABASE_HOST,
        user: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
        database: env.DATABASE_NAME,
    },
    tablesFilter: ["hintermann-webapp_*"],
} satisfies Config;
