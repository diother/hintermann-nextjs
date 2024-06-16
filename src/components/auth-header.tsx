import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function AuthHeader() {
    return (
        <header className="absolute top-0 flex h-16 w-full items-center justify-between px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-1.5">
                <Icons.logo />
            </Link>
            <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
            </Button>
        </header>
    );
}
