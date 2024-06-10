import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
    schema: "./src/server/db/schema.ts",
    dialect: "mysql",
    dbCredentials: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    },
    tablesFilter: ["hintermann-webapp_*"],
} satisfies Config;
