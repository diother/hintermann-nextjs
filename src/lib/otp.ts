import { randomBytes } from "crypto";
import { z } from "zod";

const generateOtpWithChars = (chars: string): string =>
    Array.from(randomBytes(6))
        .map((byte) => {
            return chars[byte % chars.length];
        })
        .join("");

export const generateOtp = (): [string, Date] => [
    generateOtpWithChars("2345678ABCDEFGHJKLMNPQRSTUVWXYZ"),
    new Date(Date.now() + 12 * (60 * 60 * 1000)),
];

export const OtpSchema = z
    .string()
    .length(6)
    .refine(
        (otp) =>
            [...otp].every((char) =>
                "2345678ABCDEFGHJKLMNPQRSTUVWXYZ".includes(char),
            ),
        {
            message: "Parola este invalidă.",
        },
    );
