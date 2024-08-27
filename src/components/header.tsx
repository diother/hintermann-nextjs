import Link from "next/link";
import Button from "./ui/button";
import { HeaderNav, MobileMenu } from "./header-nav";
import { Icons } from "./icons";

const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b before:absolute before:inset-0 before:-z-10 before:backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex min-h-16 max-w-screen-md flex-col justify-between gap-4 px-4 py-4 xs:flex-row xs:items-center xs:px-6">
            <Link href="/" className="font-display text-2xl">
                <Icons.logo className="h-[24px] w-[232px]" />
            </Link>
            <div className="flex gap-4">
                <HeaderNav />
                <Button className="hidden md:flex" href="/donate">
                    Donează
                </Button>
                <MobileMenu />
            </div>
        </div>
    </header>
);

export default Header;
