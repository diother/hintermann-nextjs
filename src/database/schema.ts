import { sql } from "drizzle-orm";
import {
    binary,
    boolean,
    char,
    mysqlTable,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: binary("id", { length: 6 }).primaryKey(),
    email: varchar("email", { length: 254 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    otp: char("otp", { length: 6 }),
    otpExpiresAt: timestamp("otp_expires_at").default(sql`utc_timestamp()`),
    createdAt: timestamp("created_at").default(sql`utc_timestamp()`),
    googleId: varchar("google_id", { length: 254 }), // unoptimized
});

export const sessions = mysqlTable("sessions", {
    id: binary("id", { length: 6 }).primaryKey(),
    userId: binary("user_id", { length: 6 })
        .references(() => users.id)
        .notNull(),
    expiresAt: timestamp("created_at").default(sql`utc_timestamp()`),
});
