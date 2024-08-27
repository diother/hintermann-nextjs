import { DonationForm } from "@/components/donation/donation-form";
import { Lock } from "lucide-react";
import Meta from "@/lib/metadata";

export const metadata = Meta(
    "Portal donații",
    "Portal donații Hintermann Charity",
);

const Page = () => (
    <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-6 py-12 md:text-lg">
        <h1 className="font-display text-3xl leading-tight md:text-4xl">
            Cum poți ajuta?
        </h1>
        <p>
            Donația ta ne permite să continuăm să susținem cauzele noastre și pe
            cei aflați în nevoie. Scopul nostru este să facem lumea un loc mai
            bun. Alătură-te mișcării noastre.
        </p>
        <DonationForm />
        <p className="flex gap-2 text-sm text-secondary md:text-base">
            <Lock className="mb-[.30rem] h-4 w-4 shrink-0 md:h-5 md:w-5" /> În
            continuare, vei fi redirecționat(ă) către o pagină de plată
            securizată.
        </p>
    </main>
);

export default Page;
