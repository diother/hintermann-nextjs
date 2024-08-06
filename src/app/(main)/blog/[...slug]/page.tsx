import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx/mdx-components";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { env } from "@/env";
import { notFound } from "next/navigation";
import { allPosts } from "@/lib/mdx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(slug: string) {
    const post = allPosts.blog.find((post) => post.slug === slug);
    if (!post) {
        null;
    }
    return post;
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const slug = params.slug[0]!;
    const post = await getPostFromParams(slug);
    const ogImage = post ? post.slugAsParams + post.featureImage : undefined;

    if (!post) {
        return {};
    }

    return {
        metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: post.slugAsParams,
            images: ogImage && [
                {
                    url: ogImage,
                    width: 300,
                    height: 200,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: ogImage && [ogImage],
        },
    };
}

export async function generateStaticParams(): Promise<
    PostPageProps["params"][]
> {
    return allPosts.projects.map((post) => ({
        slug: post.slug.split("/"),
    }));
}

export default async function Page({ params }: PostPageProps) {
    const slug = params.slug[0]!;
    const post = await getPostFromParams(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="container relative my-10 max-w-3xl px-6 sm:my-16 sm:px-10">
            <h1 className="text-3xl font-bold tracking-[-.03em] sm:text-5xl">
                {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:mt-6 sm:text-2xl">
                {post.description}
            </p>
            <div className="my-8 flex items-center gap-3 sm:my-10 sm:gap-4">
                <Avatar className="h-11 w-11 sm:h-12 sm:w-12">
                    <AvatarImage src="/logo.png" />
                    <AvatarFallback>HC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="sm:text-lg">Hintermann Charity</span>
                    <span className="text-sm text-muted-foreground sm:text-base">
                        {post.read} min read <span className="mx-1">·</span>{" "}
                        <time dateTime={post.date}>
                            {formatDate(post.date)}
                        </time>
                    </span>
                </div>
            </div>
            <Mdx code={post.code} />
            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
                <Link href="/blog" className="text-base font-normal">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Vezi toate articolele
                </Link>
            </div>
        </main>
    );
}
