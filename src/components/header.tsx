import Link from "next/link";
import Button from "./ui/button";
import { HeaderNav, MobileMenu } from "./header-nav";

const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b before:absolute before:inset-0 before:-z-10 before:backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-screen-sm items-center justify-between px-6">
            <Link href="/" className="font-display text-2xl ">
                Hintermann<span className="text-primary"> Charity</span>
            </Link>
            <div className="flex gap-6">
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
