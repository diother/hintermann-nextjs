import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx/mdx-components";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { allPosts } from "@/lib/mdx";
import Image from "next/image";
import { logos } from "@/lib/logos";
import Button from "@/components/ui/button";
import Meta from "@/lib/metadata";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

const getPostFromParams = async (slug: string) =>
    allPosts.projects.find((post) => post.slug === slug);

export const generateMetadata = async ({ params }: PostPageProps) => {
    const slug = params.slug[0]!;
    const post = await getPostFromParams(slug);
    const ogImage = post ? post.slugAsParams + post.featureImage : undefined;

    if (!post) {
        return {};
    }
    return Meta(post.title, post.description, ogImage, "article");
};

export const generateStaticParams = async () =>
    allPosts.projects.map((post) => ({
        slug: post.slug.split("/"),
    }));

const Page = async ({ params }: PostPageProps) => {
    const slug = params.slug[0]!;
    const post = await getPostFromParams(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-screen-md px-6 py-12">
            <h1 className="font-display text-3xl leading-tight md:text-4xl">
                {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{post.description}</p>
            <div className="mt-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-xl text-white md:h-12 md:w-12">
                    HC
                </div>
                <div className="flex flex-col">
                    <span className="md:text-lg">Hintermann Charity</span>
                    <span className="text-sm text-muted md:text-base">
                        {post.read} min read <span className="mx-1">·</span>{" "}
                        <time dateTime={post.date}>
                            {formatDate(post.date)}
                        </time>
                    </span>
                </div>
            </div>
            <Sponsors sponsors={post.sponsors} />
            {post.featureImage && (
                <Image
                    src={post.slugAsParams + post.featureImage}
                    width="700"
                    height="700"
                    alt="feature image"
                    className="my-10"
                />
            )}
            <Mdx code={post.code} />
            <Button href="/projects" size="lg" className="mt-12 w-full">
                Vezi toate proiectele
            </Button>
        </main>
    );
};

const Sponsors = ({ sponsors }: { sponsors?: string[] }) =>
    sponsors && (
        <div className="border-border/75 mt-6 flex items-center gap-6 border-y py-4 text-muted">
            <p className="text-sm md:text-base">Sponsorizat de:</p>
            <div className="flex h-full items-center gap-6">
                {sponsors.map((logoName) => {
                    const logo = logos[logoName]!;
                    const width = (logo.width / 100) * 60;
                    const height = (logo.height / 100) * 60;
                    return (
                        <Link key={logoName} href={logo.href}>
                            <Image
                                priority={true}
                                className={logo.className}
                                src={`/logos/logo-${logoName}.png`}
                                width={width}
                                height={height}
                                alt={`Logo ${logoName}`}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );

export default Page;
