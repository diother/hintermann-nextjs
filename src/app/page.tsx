import ProjectArchive from "@/components/post-archive";
import { logos } from "@/lib/logos";
import { allPosts } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const posts = allPosts.projects
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

const Page = () => (
    <main className="flex w-full flex-col gap-12 md:gap-20 md:text-lg">
        <section className="relative mx-auto aspect-square w-full max-w-screen-xl md:aspect-video">
            <video
                width="1280"
                height="720"
                autoPlay
                muted
                loop
                preload="none"
                playsInline
                className="absolute left-0 top-0 h-full w-full object-cover"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
                <Image
                    src="/hero-video-placeholder.png"
                    alt="Your browser does not support the <video> tag"
                    width="1280"
                    height="720"
                />
            </video>
        </section>
        <section className="mx-auto flex max-w-screen-md flex-col gap-6 px-6">
            <h1 className="font-display text-3xl md:text-4xl">Cine suntem?</h1>
            <p>
                Suntem o organizație non-profit care vrea să arate că poți face
                bine din bucurie și conexiuni reale, nu doar din milă sau
                obligație socială.
            </p>
            <p>
                Ne propunem să folosim rețelele sociale nu doar pentru a strânge
                fonduri și a ajuta, ci și pentru a aduce vibe-uri pozitive și a
                crea o comunitate activă și fun în jurul acestor inițiative.
            </p>
        </section>
        <section className="relative mx-auto flex w-full max-w-screen-md flex-col gap-10 bg-secondary/15 px-6 py-12 md:gap-20 md:py-20">
            <ProjectArchive posts={posts} />
        </section>
        <section className="mx-auto flex w-full max-w-screen-md flex-col gap-6 px-6">
            <h1 className="font-display text-3xl md:text-4xl">Parteneri</h1>
            <p>
                Mulțumim partenerilor noștri pentru sprijinul lor în răspândirea
                bunătății.
            </p>
            <div className="grid grid-cols-2">
                <Logos />
            </div>
        </section>
    </main>
);

const Logos = () =>
    Object.keys(logos).map((logoName) => {
        const logo = logos[logoName]!;
        return (
            <Link
                key={logoName}
                href={logo.href}
                className="flex h-24 items-center justify-center"
            >
                <Image
                    className={cn("md:scale-110", logo.className)}
                    src={`/logos/logo-${logoName}.png`}
                    width={logo.width}
                    height={logo.height}
                    alt={`Logo ${logoName}`}
                />
            </Link>
        );
    });

export default Page;
