import { cookies } from "next/headers";
import { SnowflakeSchema } from "./snowflake";

export class Cookie {
    private name: string;
    private value: string;
    private attributes: {
        expires: Date;
        path: string;
        secure: boolean;
        httpOnly: boolean;
        sameSite: "strict" | "lax" | "none";
    };

    constructor(
        name: string,
        value: string | Buffer = "",
        expires = new Date(Date.now() + 12 * (60 * 60 * 1000)),
        path = "/",
        secure = false,
        httpOnly = false,
        sameSite: "strict" | "lax" | "none" = "lax",
    ) {
        this.name = name;
        this.value = value instanceof Buffer ? value.toString("hex") : value;
        this.attributes = {
            expires: expires,
            path: path,
            secure: secure,
            httpOnly: httpOnly,
            sameSite: sameSite,
        };
    }

    set(): void {
        cookies().set(this.name, this.value, this.attributes);
    }

    delete(): void {
        cookies().delete(this.name);
    }

    get(): string | undefined {
        const cookie = cookies().get(this.name);
        return cookie?.value ?? undefined;
    }

    getSnowflake(): Buffer | undefined {
        const value = this.get();
        if (!value) {
            return undefined;
        }
        const buffer = Buffer.from(value, "hex");
        const valid = SnowflakeSchema.safeParse(buffer);
        if (!valid.success) {
            return undefined;
        }
        return buffer;
    }
}
