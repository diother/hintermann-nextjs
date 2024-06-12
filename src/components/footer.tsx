import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export default function Footer() {
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];
    const socialIcons = [
        {
            name: "Facebook",
            svg: <Facebook className="h-5 w-5" />,
            href: "https://www.facebook.com/people/Hintermann-Charity/61556605667252/",
        },
        {
            name: "Instagram",
            svg: <Instagram className="h-5 w-5" />,
            href: "https://www.instagram.com/hintermann_charity/",
        },
        {
            name: "LinkedIn",
            svg: <Linkedin className="h-5 w-5" />,
            href: "https://www.linkedin.com/company/101937853/",
        },
        {
            name: "X",
            svg: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com/hintermann_",
        },
    ];
    return (
        <footer className="border-t">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-6 pb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Link href="/">
                            <Image
                                src="/hintermann-logo.svg"
                                width={28}
                                height={28}
                                alt="Logo of Hintermann"
                            />
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            © 2024
                        </span>
                    </div>
                    <ThemeToggle />
                </div>
                <div className="flex flex-col gap-6 sm:flex-row-reverse sm:justify-end sm:gap-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="w-fit text-sm text-muted-foreground transition hover:text-foreground"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        {socialIcons.map((icon) => (
                            <Link
                                key={icon.name}
                                href={icon.href}
                                className="flex w-fit text-2xl text-muted-foreground transition hover:text-foreground"
                                aria-label={`Link leading to ${icon.name}`}
                            >
                                {icon.svg}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
