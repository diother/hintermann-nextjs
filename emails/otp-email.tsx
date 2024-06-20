import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";

export default function OtpEmail({ previewText, otp }: OtpEmailSchema) {
    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Container className="mx-auto mt-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
                        <Section className="mt-[32px]">
                            <Img
                                src="https://hintermann.ro/hintermann-logo.png"
                                width="42"
                                height="42"
                                alt="Hintermann Logo"
                                className="mx-auto my-0"
                            />
                        </Section>
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-semibold text-[#020817]">
                            Codul tău de verificare
                        </Heading>
                        <Text className="text-center text-[16px] leading-[24px] text-[#020817]">
                            Întoarce-te la pagina de autentificare și introdu
                            codul de mai jos pentru a finaliza procesul.
                        </Text>
                        <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-semibold text-[#020817]">
                            {otp}
                        </Heading>
                        <Hr />
                        <Text className="text-center text-[16px] leading-[24px] text-[#65758c]">
                            Dacă nu ai trimis tu această cerere, ignoră acest
                            email.
                        </Text>
                        <Hr />
                        <Container className="mx-auto h-[20px] w-fit text-[#65758c]">
                            <Text className="mb-0 text-center text-[14px] leading-[24px] text-[#65758c]">
                                Hintermann Charity © 2024
                            </Text>
                        </Container>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
interface OtpEmailSchema {
    previewText: string;
    otp: string;
}
