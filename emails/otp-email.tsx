import { Icons } from "@/components/icons";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import React from "react";

export default function OtpEmail({ previewText, otp }: OtpEmailSchema) {
    const facebookHref =
        "https://www.facebook.com/people/Hintermann-Charity/61556605667252/";
    const instagramHref = "https://www.instagram.com/hintermann_charity/";
    const linkedinHref = "https://www.linkedin.com/company/101937853/";
    const twitterHref = "https://twitter.com/hintermann_";

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
                        <Container className="mx-auto w-fit pt-[32px] text-[#65758c]">
                            <Link href={facebookHref} className="text-inherit">
                                <Img
                                    src="https://hintermann.ro/email-icons/Facebook.png"
                                    width="20"
                                    height="20"
                                    alt="Facebook Icon"
                                />
                            </Link>
                            <Link href={instagramHref} className="text-inherit">
                                <Img
                                    src="https://hintermann.ro/email-icons/Instagram.png"
                                    width="20"
                                    height="20"
                                    alt="Instagram Icon"
                                />
                            </Link>
                            <Link href={linkedinHref} className="text-inherit">
                                <Img
                                    src="https://hintermann.ro/email-icons/Linkedin.png"
                                    width="20"
                                    height="20"
                                    alt="Linkedin Icon"
                                />
                            </Link>
                            <Link href={twitterHref} className="text-inherit">
                                <Img
                                    src="https://hintermann.ro/email-icons/X.png"
                                    width="20"
                                    height="20"
                                    alt="X Icon"
                                />
                            </Link>
                        </Container>
                        <Text className="mb-0 text-center text-[14px] leading-[24px] text-[#65758c]">
                            Asociația noastră asigură accesul celor defavorizați
                            la locuințe sigure, consiliere, și resursele
                            esențiale pentru formarea autosuficienței
                            financiare.
                        </Text>
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
