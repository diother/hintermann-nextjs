import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AuthHeader() {
    return (
        <header className="absolute top-0 flex h-16 w-full items-center justify-between px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-1.5">
                <Image
                    src="/hintermann-logo.svg"
                    width={28}
                    height={28}
                    alt="Hintermann Charity Logo"
                />
            </Link>
            <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
            </Button>
        </header>
    );
}
