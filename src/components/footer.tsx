import Link from "next/link";
import { Icons } from "./icons";

export const socialIcons = [
    {
        name: "Facebook",
        svg: <Icons.facebook className="h-7 w-7" />,
        href: "https://www.facebook.com/people/Hintermann-Charity/61556605667252/",
    },
    {
        name: "Instagram",
        svg: <Icons.instagram className="h-7 w-7" />,
        href: "https://www.instagram.com/hintermann_charity/",
    },
    {
        name: "LinkedIn",
        svg: <Icons.linkedin className="h-7 w-7" />,
        href: "https://www.linkedin.com/company/101937853/",
    },
    {
        name: "X",
        svg: <Icons.twitter className="h-7 w-7" />,
        href: "https://twitter.com/hintermann_",
    },
];

const links = [
    { name: "Contact", href: "/contact" },
    { name: "Termeni și condiții", href: "/legal/terms" },
    { name: "Politică de confidențialitate", href: "/legal/privacy" },
];

const Footer = () => (
    <footer className="flex flex-col items-center gap-6 border-t px-6 py-12">
        {links.map((link) => (
            <Link key={link.name} href={link.href} className="">
                {link.name}
            </Link>
        ))}
        <div className="flex gap-6">
            {socialIcons.map((icon) => (
                <Link
                    key={icon.name}
                    href={icon.href}
                    className="text-muted-foreground flex w-fit text-2xl transition hover:text-foreground"
                    aria-label={`Link leading to ${icon.name}`}
                >
                    {icon.svg}
                </Link>
            ))}
        </div>
    </footer>
);

export default Footer;
