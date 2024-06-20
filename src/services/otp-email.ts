import { Resend } from "resend";
import { env } from "@/env";
import OtpEmail from "emails/otp-email";
import { FormError } from "@/lib/types";

const resend = new Resend(env.RESEND);
const previewText =
    "Întoarce-te la pagina de autentificare și introdu codul de mai jos pentru a finaliza procesul.";

export async function sendEmail(
    email: string,
    otp: string,
): Promise<{ id: string } | false> {
    const { data } = await resend.emails.send({
        from: "Hintermann Charity <noreply@hintermann.ro>",
        to: [email],
        subject: "Conectează-te la Hintermann Charity",
        react: OtpEmail({ previewText: previewText, otp: otp }),
    });
    if (!data) {
        throw new FormError("Serverele noastre nu au putut procesa cerința.");
    }
    return data;
}
