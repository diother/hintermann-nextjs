import DecorationSection from "@/components/decoration";
import { logos } from "@/lib/logos";
import type { Metadata } from "next";
import Image from "next/image";
import { env } from "@/env";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Contact",
    openGraph: {
        title: "Contact",
        description: "Pagina de contact Hintermann Charity",
        type: "website",
        images: [
            {
                url: "/hintermann-logo.png",
                width: 300,
                height: 300,
                alt: "Hintermann Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact",
        description: "Pagina de contact Hintermann Charity",
        images: "/hintermann-logo.png",
    },
};

export default function Page() {
    return (
        <main className="mx-auto flex max-w-6xl flex-col p-4 sm:p-10 lg:grid lg:grid-cols-2 lg:pt-16">
            <DecorationSection position="top-left" />
            <section className="flex flex-col gap-6 border border-t-0 px-6 pb-16 pt-12 sm:gap-8 sm:px-12 lg:gap-12 lg:border-b-0 lg:border-r-0">
                <h1 className="text-4xl font-semibold leading-tight tracking-tighter">
                    Vorbește cu echipa noastră pentru Colaborări
                </h1>
                <p className="text-muted-foreground sm:text-lg lg:text-xl">
                    Vă îndemnăm să donați orice puteți. Orice mic gest de
                    bunătate contează.
                </p>
                <div className="flex flex-col gap-4 sm:text-lg">
                    <p>
                        <span className="font-semibold">Telefon:</span>
                        &nbsp;+40 (751) 178 171
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span>
                        &nbsp;contact@hintermann.ro
                    </p>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">Detalii bancare:</span>
                        <p>Asociația de Caritate Hintermann</p>
                        <p>RO61 INGB 0000 9999 1494 0141</p>
                    </div>
                </div>
            </section>
            <section className="relative -mb-[1px] grid grid-cols-2 grid-rows-3 border-x">
                <div className="absolute bottom-0 left-1/2 top-0 ml-[-0.5px] w-[1px] translate-x-1/2 bg-border lg:translate-x-0" />
                {logos.map((logo) => (
                    <div
                        key={logo.name}
                        className="flex aspect-video h-24 w-full items-center justify-center border-b p-6 lg:h-full"
                    >
                        <Image
                            priority={true}
                            className="dark:hidden"
                            src={`/logos/logo-${logo.name}-light.png`}
                            width={logo.width}
                            height={logo.height}
                            alt={`Logo ${logo.name}`}
                        />
                        <Image
                            priority={true}
                            className="hidden brightness-[93%] dark:block"
                            src={`/logos/logo-${logo.name}-dark.png`}
                            width={logo.width}
                            height={logo.height}
                            alt={`Logo ${logo.name}`}
                        />
                    </div>
                ))}
            </section>
            <DecorationSection position="bottom-right" />
        </main>
    );
}
