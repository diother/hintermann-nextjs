import Link from "next/link";
import Button from "./ui/button";
import MobileMenu from "./mobile-menu";

const navLinks = [
    { name: "Proiecte", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Portal donații", href: "/donate" },
    { name: "Blog", href: "/blog" },
];

const Header = () => (
    <header className="sticky top-0 z-50 w-full bg-background/95 before:absolute before:inset-0 before:-z-10 before:backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
            <div className="z-50 flex items-center gap-8">
                <Link href="/" className="font-display text-xl ">
                    Hintermann<span className="text-primary"> Charity</span>
                </Link>
                <div className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-muted-foreground text-sm font-medium transition-colors hover:text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
            <Button className="hidden lg:flex" href="/donate">
                Donează
            </Button>
            <MobileMenu navLinks={navLinks} />
        </div>
    </header>
);

export default Header;
