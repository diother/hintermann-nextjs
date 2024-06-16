import DecorationSection, { DecorationCross } from "@/components/decoration";
import { Button } from "@/components/ui/button";
import { logos } from "@/lib/logos";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Home, Phone, Rss, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
    const posts = allPosts.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date));
    });

    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col p-4 sm:p-10 lg:py-16">
            <DecorationSection position="top-left" />
            <section className="border border-t-0 p-6 sm:p-10 lg:grid lg:grid-cols-12 lg:p-0">
                <h1 className="text-center text-4xl font-semibold leading-tight tracking-tighter sm:text-5xl lg:col-span-10 lg:col-start-2 lg:border-l lg:p-12 lg:text-[3.5rem]">
                    Hintermann Charity le oferă românilor locuințe și susținere.
                </h1>
                <div className="lg:col-start-12 lg:border-l" />
            </section>
            <section className="border-span-0 border border-y-0 p-6 sm:p-10 lg:grid lg:grid-cols-12 lg:p-0">
                <p
                    className={`text-center text-muted-foreground sm:text-lg lg:col-span-10 lg:col-start-2 lg:border-l lg:p-12 lg:text-xl [&_span]:font-medium [&_span]:text-foreground`}
                >
                    Asociația noastră asigură accesul celor defavorizați la
                    <span> locuințe sigure</span>,<span> consiliere</span>, și
                    <span> resursele esențiale</span> pentru formarea
                    autosuficienței financiare.
                </p>
                <div className="lg:col-start-12 lg:border-l" />
            </section>
            <DecorationSection position="bottom-right" />
            <section className="border-x xl:grid xl:grid-cols-12 xl:p-0">
                <Link
                    href="/projects/article1"
                    className={`z-10 grid gap-4 p-6 transition hover:shadow-xl dark:hover:shadow-none dark:hover:outline dark:hover:outline-2 dark:hover:outline-primary sm:p-10 md:grid-cols-[300px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-6 xl:col-span-10 xl:col-start-2 xl:border-l [&:hover_img]:scale-110`}
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
                    className={`z-10 grid gap-4 border-t p-6 transition hover:shadow-xl dark:hover:shadow-none dark:hover:outline dark:hover:outline-2 dark:hover:outline-primary sm:p-10 md:grid-cols-[300px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-6 xl:col-span-10 xl:col-start-2 xl:border-l [&:hover_img]:scale-110`}
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
                        asociației noastre, care le-a trimis pachete cu
                        alimente. Acest sprijin le-a oferit speranța în mijlocul
                        vremurilor dificile.
                    </p>
                </Link>
                <div className="lg:col-start-12 lg:row-span-2 lg:row-start-1 lg:border-l" />
            </section>
            <DecorationSection position="bottom-left" />
            <section
                className={`relative grid border border-t-0 py-6 sm:grid-cols-3 sm:py-0 [&_span]:font-semibold [&_span]:text-foreground`}
            >
                <div className="absolute bottom-0 left-1/2 top-0 ml-[-0.5px] w-[1px] translate-x-1/2 bg-border sm:left-1/3" />
                <div className="absolute bottom-0 left-1/2 top-0 ml-[-0.5px] w-[1px] translate-x-1/2 bg-border sm:left-2/3" />
                <div className="z-10 border-b p-6 pt-20 sm:col-span-3 sm:p-10 sm:pt-28 lg:p-12 lg:pt-32">
                    <h2 className="text-center text-2xl font-semibold leading-tight tracking-tighter sm:text-3xl lg:text-[2.5rem]">
                        Valorile noastre.
                    </h2>
                </div>
                {values.map((value) => (
                    <div
                        key={value.value}
                        className={`z-10 flex flex-col items-center gap-4 p-6 sm:items-start sm:gap-6 sm:px-10 sm:py-20`}
                    >
                        <div className="flex text-[2.5rem] text-foreground">
                            {value.svg}
                        </div>
                        <p className="text-center font-medium text-muted-foreground sm:text-start sm:text-xl lg:text-2xl lg:-tracking-[.03rem]">
                            <span>{value.value}</span> {value.desc}
                        </p>
                    </div>
                ))}
            </section>
            <section className="relative mt-4 grid grid-cols-2 border lg:grid-cols-3">
                <DecorationCross position="bottom-right" />
                <div className="absolute bottom-0 left-1/2 top-0 ml-[-0.5px] w-[1px] translate-x-1/2 bg-border lg:left-1/3" />
                <div className="absolute bottom-0 left-1/2 top-0 ml-[-0.5px] w-[1px] translate-x-1/2 bg-border lg:left-2/3" />
                <div className="relative z-10 col-span-2 border-b p-6 pt-20 sm:p-10 sm:pt-28 lg:col-span-3 lg:p-12 lg:pt-32">
                    <DecorationCross position="bottom-left" />
                    <h2 className="text-center text-2xl font-semibold leading-tight tracking-tighter sm:text-3xl lg:text-[2.5rem]">
                        Partenerii noștri.
                    </h2>
                </div>
                {logos.map((logo) => (
                    <Link
                        key={logo.name}
                        href={logo.href}
                        className="flex aspect-video h-24 w-full items-center justify-center border-b p-6 transition hover:bg-accent lg:h-36"
                    >
                        <Image
                            className="dark:hidden"
                            src={`/logos/logo-${logo.name}-light.png`}
                            width={logo.width}
                            height={logo.height}
                            alt={`Logo ${logo.name}`}
                        />
                        <Image
                            className="hidden brightness-[93%] dark:block"
                            src={`/logos/logo-${logo.name}-dark.png`}
                            width={logo.width}
                            height={logo.height}
                            alt={`Logo ${logo.name}`}
                        />
                    </Link>
                ))}
                <div className="relative col-start-1 col-end-3 -mt-[1px] flex flex-col items-center gap-6 border-t px-6 pb-12 pt-20 sm:flex-row sm:justify-between sm:gap-10 sm:px-10 sm:pb-20 sm:pt-28 lg:col-end-4 lg:px-12 lg:pb-24 lg:pt-32">
                    <h2 className="z-10 text-center text-2xl font-semibold leading-tight tracking-tighter sm:text-start sm:text-3xl lg:text-[2.5rem]">
                        Alătură-te și susține-i pe cei defavorizați.
                    </h2>
                    <Button>
                        <Link
                            className="flex items-center gap-3"
                            href="/contact"
                        >
                            <Phone className="h-4 w-4" />
                            Contactează-ne
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}

const values = [
    {
        svg: <Home className="h-9 w-9" />,
        value: "Românesc.",
        desc: "Nevoile și aspirațiile românilor încă trebuie atinse.",
    },
    {
        svg: <Smartphone className="h-9 w-9" />,
        value: "Ușor.",
        desc: "Contribuția și impactul la o atingere distanță.",
    },
    {
        svg: <Rss className="h-9 w-9" />,
        value: "Modern.",
        desc: "Eforturile caritabile adaptate la inovațiile tehnologice.",
    },
];
