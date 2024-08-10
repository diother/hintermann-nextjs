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
        <main className="container relative my-10 max-w-3xl px-6 sm:my-16 sm:px-10">
            <h1 className="font-display text-3xl leading-tight">
                {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{post.description}</p>
            <div className="mt-8 flex items-center gap-3">
                <div className="h-11 w-11">hey</div>
                <div className="flex flex-col">
                    <span>Hintermann Charity</span>
                    <span className="text-sm text-muted">
                        {post.read} min read <span className="mx-1">·</span>{" "}
                        <time dateTime={post.date}>
                            {formatDate(post.date)}
                        </time>
                    </span>
                </div>
            </div>
            <Sponsors sponsors={post.sponsors} />
            <Mdx code={post.code} />
            <hr className="mt-12" />
            <Button href="/projects">Vezi toate proiectele</Button>
        </main>
    );
};

const Sponsors = ({ sponsors }: { sponsors?: string[] }) =>
    sponsors && (
        <div className="border-border/75 mt-6 flex items-center gap-6 border-y py-4 text-muted">
            <p className="text-sm">Sponsorizat de:</p>
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
