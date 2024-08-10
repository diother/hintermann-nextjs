import ProjectArchive from "@/components/post-archive";
import { logos } from "@/lib/logos";
import { allPosts } from "@/lib/mdx";
import { compareDesc } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const posts = allPosts.projects
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

const Page = () => (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
        <section className="relative aspect-square">
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
        <section className="flex flex-col gap-6 px-6">
            <h1 className="font-display text-3xl">Cine suntem?</h1>
            <p>
                Suntem o organizație non-profit, formată dintr-o echipă de
                voluntari dedicați să răspândească mesajul bunătății.
            </p>
            <p>
                Nu credem că poveștile triste, mila sau vinovăția ar trebui să
                fie motivația principală din spatele actelor de bunătate.
            </p>
            <p>
                În schimb, suntem motivați de bucuria și conexiunea umană care
                iau naștere din legăturile pe care le creăm cu ceilalți, atunci
                când împărtășim bunătate și bucurie.
            </p>
        </section>
        <section className="flex flex-col gap-16 px-6">
            <ProjectArchive posts={posts} />
        </section>
        <section className="flex flex-col gap-6 px-6">
            <h1 className="font-display text-3xl">Parteneri</h1>
            <p>
                Dorim să le mulțumim partenerilor noștri pentru generozitatea
                lor, care ne permite să răspândim bunătatea.
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
                    className={logo.className}
                    src={`/logos/logo-${logoName}.png`}
                    width={logo.width}
                    height={logo.height}
                    alt={`Logo ${logoName}`}
                />
            </Link>
        );
    });

export default Page;
