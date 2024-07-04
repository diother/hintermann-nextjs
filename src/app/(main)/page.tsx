import { Button } from "@/components/ui/button";
import { logos } from "@/lib/logos";
import { allPosts } from "@/lib/mdx";
import { cn, formatDate } from "@/lib/utils";
import { compareDesc } from "date-fns";
import { Home, Rss, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
    const posts = allPosts.projects
        .sort((a, b) => {
            return compareDesc(new Date(a.date), new Date(b.date));
        })
        .slice(0, 3);

    const logoName = "auchan";
    const logo = logos[logoName]!;
    const width = (logo.width / 100) * 60;
    const height = (logo.height / 100) * 60;
    return (
        <main className="relative mx-auto my-8 flex w-full max-w-6xl flex-col gap-24 border border-border/75 py-8 sm:my-16 sm:gap-40 sm:py-20">
            <div className="absolute bottom-0 left-1/2 top-0 -z-10 ml-[-0.5px] w-[1px] bg-border/75 lg:left-1/3" />
            <div className="absolute bottom-0 left-1/2 top-0 -z-10 ml-[-0.5px] w-[1px] bg-border/75 lg:left-2/3" />
            <section className="mx-auto flex max-w-sm flex-col items-center gap-8 px-6 sm:max-w-none ">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-muted-foreground lg:hidden">
                        Realizat pe{" "}
                        <span className="font-medium text-foreground">
                            26 iunie
                        </span>
                        . Vezi ultimul proiect.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                            <span className="hidden text-base font-normal tracking-normal text-muted-foreground lg:block">
                                Vezi
                            </span>
                            <span>Proiect cu</span>
                            <div className="-mt-1">
                                <Image
                                    priority={true}
                                    className={cn(
                                        "dark:hidden",
                                        logo.className,
                                    )}
                                    src={`/logos/logo-${logoName}-light.png`}
                                    width={width}
                                    height={height}
                                    alt={`Logo ${logoName}`}
                                />
                                <Image
                                    priority={true}
                                    className={cn(
                                        "hidden brightness-[93%] dark:block",
                                        logo.className,
                                    )}
                                    src={`/logos/logo-${logoName}-dark.png`}
                                    width={width}
                                    height={height}
                                    alt={`Logo ${logoName}`}
                                />
                            </div>
                            <span className="hidden text-base font-normal tracking-normal text-muted-foreground lg:block">
                                realizat pe{" "}
                                <span className="font-medium text-foreground">
                                    26 iunie
                                </span>
                            </span>
                        </span>
                        <Link href="/projects/auchan">
                            <Button className="h-7 p-3">Citește articol</Button>
                        </Link>
                    </div>
                </div>
                <h1 className="max-w-2xl bg-gradient-to-r from-foreground/70 to-foreground bg-clip-text text-center text-3xl font-bold leading-none tracking-tight text-transparent sm:text-[3.5rem] lg:max-w-4xl lg:text-[4.5rem]">
                    Construim case pentru familiile românilor.
                </h1>
                <p className="max-w-lg text-center text-xl tracking-tight text-muted-foreground lg:max-w-2xl lg:text-2xl">
                    <span className="sm:hidden">
                        Organizație caritabilă care vrea să ofere locuințe celor
                        în nevoie.
                    </span>
                    <span className="hidden sm:block">
                        Suntem o organizație caritabilă care și-a propus să
                        construiască și să ofere case famiililor aflate în
                        dificultate.
                    </span>
                </p>
                <div className="grid w-full max-w-md grid-cols-2 gap-4">
                    <Link href="/donate">
                        <Button className="h-11 w-full text-base">
                            Donează
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button
                            variant="outline"
                            className="h-11 w-full text-base"
                        >
                            Contactează-ne
                        </Button>
                    </Link>
                </div>
            </section>
            <section className="grid gap-y-6 lg:grid-cols-3 lg:gap-y-10">
                <h2 className="bg-gradient-to-r from-foreground/70 to-foreground bg-clip-text text-center text-2xl font-bold leading-none tracking-tight text-transparent sm:text-4xl lg:col-span-3 lg:text-5xl">
                    Ultimele noastre proiecte
                </h2>
                {posts?.length &&
                    posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={post.slugAsParams}
                            className="z-10 mx-auto grid w-full gap-4 rounded-lg p-6 transition hover:shadow-xl dark:hover:shadow-none dark:hover:outline dark:hover:outline-2 dark:hover:outline-primary sm:max-w-3xl sm:grid-cols-[300px_1fr] sm:grid-rows-[auto_auto_1fr] sm:gap-x-6 lg:flex lg:flex-col [&:hover_img]:scale-110"
                        >
                            <p className="text-sm text-muted-foreground">
                                {formatDate(post.date)}
                            </p>
                            {post.images?.[0] && (
                                <div className="overflow-hidden rounded-md sm:row-span-3 sm:row-start-1">
                                    <Image
                                        priority={index <= 1}
                                        className="h-auto w-full transition"
                                        src={post.images[0]}
                                        width="300"
                                        height="200"
                                        alt={post.title}
                                    />
                                </div>
                            )}
                            <h2 className="heading-4">{post.title}</h2>
                            <p className="text-muted-foreground">
                                {post.description}
                            </p>
                        </Link>
                    ))}
            </section>
            <section className="relative mx-auto grid max-w-2xl gap-y-6 lg:max-w-none lg:grid-cols-3">
                <div className="z-10 lg:col-span-3">
                    <h2 className="bg-gradient-to-r from-foreground/70 to-foreground bg-clip-text text-center text-2xl font-bold leading-none tracking-tight text-transparent sm:text-4xl lg:col-span-3 lg:text-5xl">
                        Valorile noastre.
                    </h2>
                </div>
                {values.map((value) => (
                    <div
                        key={value.value}
                        className="z-10 flex flex-col items-center gap-4 p-6 sm:gap-6 sm:p-10 lg:items-start"
                    >
                        <div className="flex text-[2.5rem] text-foreground">
                            {value.svg}
                        </div>
                        <p className="text-center text-lg font-medium text-muted-foreground sm:text-2xl lg:text-start lg:-tracking-[.03rem]">
                            <span className="font-semibold text-foreground">
                                {value.value}
                            </span>{" "}
                            {value.desc}
                        </p>
                    </div>
                ))}
            </section>
            <section className="relative grid grid-cols-2 lg:grid-cols-3">
                <h2 className="col-span-2 mb-6 bg-gradient-to-r from-foreground/70 to-foreground bg-clip-text text-center text-2xl font-bold leading-none tracking-tight text-transparent sm:text-4xl lg:col-span-3 lg:text-5xl">
                    Partenerii noștri.
                </h2>
                {Object.keys(logos).map((logoName) => {
                    const logo = logos[logoName]!;
                    return (
                        <Link
                            key={logoName}
                            href={logo.href}
                            className="flex aspect-video h-24 w-full items-center justify-center border-b border-border/75 p-6 transition hover:bg-accent lg:h-36"
                        >
                            <Image
                                className={cn("dark:hidden", logo.className)}
                                src={`/logos/logo-${logoName}-light.png`}
                                width={logo.width}
                                height={logo.height}
                                alt={`Logo ${logoName}`}
                            />
                            <Image
                                className={cn(
                                    "hidden brightness-[93%] dark:block",
                                    logo.className,
                                )}
                                src={`/logos/logo-${logoName}-dark.png`}
                                width={logo.width}
                                height={logo.height}
                                alt={`Logo ${logoName}`}
                            />
                        </Link>
                    );
                })}
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
