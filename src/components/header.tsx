import Link from "next/link";
import { Button } from "./ui/button";
import { AvatarMenu } from "./header-avatar";
import { Icons } from "./icons";
import { getUserSession } from "@/actions/auth-actions";
import { getStripeId, getUserEmail } from "@/database/auth";
import { HeaderMobileMenu } from "./mobile-menu";

export default async function Header() {
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
        { name: "Portal donații", href: "/donate" },
        { name: "Blog", href: "/blog" },
    ];
    const user = await getUserSession();
    let email, stripeId;
    if (user) {
        email = await getUserEmail(user);
        stripeId = await getStripeId(user);
    }
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 before:absolute before:inset-0 before:-z-10 before:backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
                <div className="z-50 flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-1.5">
                        <Icons.logo />
                        <span className="text-center text-xl font-semibold leading-tight tracking-tight">
                            Hintermann Charity
                        </span>
                    </Link>
                    <div className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div
                    className={`flex items-center gap-4 ${user && "flex-row-reverse"}`}
                >
                    {user ? (
                        <AvatarMenu
                            className="hidden lg:flex"
                            email={email}
                            billing={!!stripeId}
                        />
                    ) : (
                        <Link href="/login">
                            <Button
                                className="hidden lg:flex"
                                variant="outline"
                            >
                                Autentifică-te
                            </Button>
                        </Link>
                    )}
                    <Link href="/donate">
                        <Button
                            className="hidden lg:flex"
                            variant={user && "outline"}
                        >
                            Donează
                        </Button>
                    </Link>
                </div>
                <HeaderMobileMenu email={email} billing={!!stripeId} />
            </div>
        </header>
    );
}
