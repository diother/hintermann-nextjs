export interface Cookie {
    name: string;
    value: string;
    attributes?: CookieAttributes;
}
export interface CookieAttributes {
    secure?: boolean;
    path?: string;
    domain?: string;
    sameSite?: "lax" | "strict" | "none";
    httpOnly?: boolean;
    maxAge?: number;
    expires?: Date;
}
export type FormSchema = string | undefined;
export class FormError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = "FormError";
    }
}
export interface GoogleUser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}
