import { drizzle } from "drizzle-orm/mysql2";
import { createPool, type Pool } from "mysql2/promise";

import { env } from "@/env";
import * as schema from "./schema";

// Cache the database connection in development. This avoids creating a new
// connection on every HMR update.
const globalForDb = globalThis as unknown as {
    conn: Pool | undefined;
};

const conn =
    globalForDb.conn ??
    createPool({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema, mode: "default" });
