import { randomBytes } from "crypto";
import { z } from "zod";

const otpLength = 6;

const generateOtpWithChars = (chars: string, otpLength: number): string =>
    Array.from(randomBytes(otpLength))
        .map((byte) => {
            return chars[byte % chars.length];
        })
        .join("");

export const generateOtp = (): [string, Date] => {
    const allowedChars = "2345678ABCDEFGHJKLMNPQRSTUVWXYZ";
    const TWELVE_HOURS = new Date(Date.now() + 12 * (60 * 60 * 1000));

    return [generateOtpWithChars(allowedChars, otpLength), TWELVE_HOURS];
};

export const OtpSchema = z
    .string()
    .length(otpLength)
    .refine(
        (otp) =>
            [...otp].every((char) =>
                "2345678ABCDEFGHJKLMNPQRSTUVWXYZ".includes(char),
            ),
        {
            message: "Parola este invalidă.",
        },
    );
