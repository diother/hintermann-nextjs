import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Proiecte",
};

export default function Page() {
    return (
        <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6 sm:gap-10 sm:p-10 lg:py-16">
            <h1 className="text-4xl font-semibold leading-tight tracking-tighter sm:text-5xl lg:text-[3.5rem]">
                Proiecte
            </h1>
            <section className="flex flex-col gap-6">
                <Link
                    href="/projects/article1"
                    className={`dark:hover:outline-text z-10 grid gap-4 rounded-lg border p-4 transition hover:shadow-xl dark:hover:shadow-none dark:hover:outline dark:hover:outline-2 md:grid-cols-[300px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-6 [&:hover_img]:scale-110`}
                >
                    <span className="text-xs text-muted-foreground sm:text-sm">
                        20 MAI 2024
                    </span>
                    <div className="overflow-hidden md:row-span-3 md:row-start-1">
                        <Image
                            priority={true}
                            className="h-auto w-full transition"
                            src="/article1/image1.jpg"
                            width="300"
                            height="200"
                            alt="Project photo"
                        />
                    </div>
                    <h2 className="font-semibold sm:text-xl lg:text-2xl">
                        Campania de Paști „Fire de compasiune”
                    </h2>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Suntem încântați să împărtășim cu voi momentele speciale
                        din cadrul campaniei noastre „Fire de compasiune”,
                        realizată în parteneriat cu Humana.
                    </p>
                </Link>
                <Link
                    href="/projects/article"
                    className={`dark:hover:outline-text z-10 grid gap-4 rounded-lg border p-4 transition hover:shadow-xl dark:hover:shadow-none dark:hover:outline dark:hover:outline-2 md:grid-cols-[300px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-6 [&:hover_img]:scale-110`}
                >
                    <span className="text-xs text-muted-foreground sm:text-sm">
                        11 MAI 2024
                    </span>
                    <div className="overflow-hidden md:row-span-3 md:row-start-1">
                        <Image
                            priority={true}
                            className="h-auto w-full transition"
                            src="/article/image1.jpg"
                            width="300"
                            height="200"
                            alt="Project photo"
                        />
                    </div>
                    <h2 className="font-semibold sm:text-xl lg:text-2xl">
                        Cum am adus bucurie familiilor defavorizate din
                        Împrejurimile Brașovului.
                    </h2>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Familiile ajutate au fost profund emoționate de gestul
                        Asociației Hintermann, care le-a trimis pachete cu
                        alimente. Acest sprijin le-a oferit speranța în mijlocul
                        vremurilor dificile.
                    </p>
                </Link>
            </section>
        </main>
    );
}
