import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Icons } from "./icons";

export default function Footer() {
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];
    const socialIcons = [
        {
            name: "Facebook",
            svg: <Icons.facebook className="h-5 w-5" />,
            href: "https://www.facebook.com/people/Hintermann-Charity/61556605667252/",
        },
        {
            name: "Instagram",
            svg: <Icons.instagram className="h-5 w-5" />,
            href: "https://www.instagram.com/hintermann_charity/",
        },
        {
            name: "LinkedIn",
            svg: <Icons.linkedin className="h-5 w-5" />,
            href: "https://www.linkedin.com/company/101937853/",
        },
        {
            name: "X",
            svg: <Icons.twitter className="h-5 w-5" />,
            href: "https://twitter.com/hintermann_",
        },
    ];
    return (
        <footer className="border-t">
            <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                    <div className="flex items-center gap-1.5">
                        <Link href="/">
                            <Icons.logo />
                            <span className="sr-only">Hintermann Charity</span>
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            © 2024
                        </span>
                    </div>
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
                </div>
                <div className="flex items-center justify-between gap-10">
                    <div className="flex items-center gap-5">
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
                    <ThemeToggle />
                </div>
            </div>
        </footer>
    );
}
