import Link from "next/link";
import { Icons } from "./icons";
import CookieDialog from "./cookie-dialog";

export const socialIcons = [
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
export default function Footer() {
    const pages = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
        { name: "Portal donații", href: "/donate" },
        { name: "Blog", href: "/blog" },
    ];
    const legal = [
        { name: "Politică de confidențialitate", href: "/legal/privacy" },
        { name: "Termeni și condiții", href: "/legal/terms" },
    ];
    return (
        <>
            <footer className="border-t">
                <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 p-6 md:grid md:grid-cols-4 xl:flex xl:flex-row xl:items-center">
                    <div className="grid gap-6 sm:grid-cols-3 md:col-span-3 xl:flex xl:items-center">
                        <div className="flex items-center gap-1.5 self-start">
                            <Link href="/">
                                <Icons.logo />
                                <span className="sr-only">
                                    Hintermann Charity
                                </span>
                            </Link>
                            <span className="text-sm text-muted-foreground">
                                © 2024
                            </span>
                        </div>
                        <div className="flex flex-col gap-4 xl:flex-row xl:gap-6">
                            <span className="text-sm font-semibold xl:hidden">
                                Pagini
                            </span>
                            {pages.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="w-fit text-sm text-muted-foreground transition hover:text-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 xl:flex-row xl:gap-6">
                            <span className="text-sm font-semibold xl:hidden">
                                Legal
                            </span>
                            {legal.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="w-fit text-sm text-muted-foreground transition hover:text-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <CookieDialog className="w-fit text-sm text-muted-foreground transition hover:text-foreground" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-6 md:flex-col-reverse xl:flex-row xl:justify-end">
                        <div className="flex items-center gap-5 self-end xl:self-auto">
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
        </>
    );
}
