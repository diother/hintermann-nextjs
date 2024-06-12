import { randomBytes } from "crypto";
import { z } from "zod";

export function generateOtp(): [string, Date] {
    const allowedChars = "2345678ABCDEFGHJKLMNPQRSTUVWXYZ";
    const otpLength = 6;
    const otpExpiresAt = new Date(Date.now() + 12 * (60 * 60 * 1000));
    const otpBytes = randomBytes(otpLength);

    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        otp += allowedChars[otpBytes[i]! % allowedChars.length];
    }
    return [otp, otpExpiresAt];
}

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
