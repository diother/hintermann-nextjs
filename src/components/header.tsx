import Link from "next/link";
import { Button } from "./ui/button";
import { AvatarMenu } from "./header-avatar";
import { Icons } from "./icons";
import { getUserSession } from "@/actions/auth-actions";
import { getStripeId, getUserEmail } from "@/database/auth";
import { HeaderMobileMenu } from "./mobile-menu";
import { StripeDashboard } from "./donation/donation-form";

export default async function Header() {
    const navLinks = [
        { name: "Proiecte", href: "/projects" },
        { name: "Contact", href: "/contact" },
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
                    <div className="hidden items-center gap-6 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
                {user ? (
                    <AvatarMenu className="hidden lg:flex" email={email} />
                ) : (
                    <Button className="hidden lg:flex" asChild>
                        <Link href="/login">Autentifică-te</Link>
                    </Button>
                )}
                <HeaderMobileMenu email={email} />
                {user ?? <StripeDashboard />}
            </div>
        </header>
    );
}
