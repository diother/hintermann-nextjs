import "@/styles/mdx.css";
import ArticleSwiper from "@/components/article-swiper";
import { Mdx } from "@/components/mdx/mdx-components";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { env } from "@/env";
import { notFound } from "next/navigation";
import { allPosts } from "@/lib/mdx";
import Image from "next/image";
import { logos } from "@/lib/logos";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(slug: string) {
    const post = allPosts.projects.find((post) => post.slug === slug);
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
    const ogImage = post?.images?.[0];

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
        <main className="container relative max-w-3xl p-6 sm:p-10 lg:py-16">
            <Link
                href="/projects"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-[-200px] top-24 hidden xl:inline-flex",
                )}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Toate proiectele
            </Link>

            <div>
                {post.date && (
                    <time
                        dateTime={post.date}
                        className="block text-sm text-muted-foreground"
                    >
                        Publicat pe {formatDate(post.date)}
                    </time>
                )}
                <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tighter sm:text-5xl">
                    {post.title}
                </h1>
                {post.sponsors && (
                    <div className="mt-4 flex items-center gap-6 rounded-md border p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                            Sponsorizat de:
                        </p>
                        <div className="flex h-full items-center gap-6">
                            {post.sponsors.map((logoName) => {
                                const logo = logos[logoName]!;
                                const width = (logo.width / 100) * 60;
                                const height = (logo.height / 100) * 60;
                                return (
                                    <Link key={logoName} href={logo.href}>
                                        <Image
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
                                            className={cn(
                                                "hidden brightness-[93%] dark:block",
                                                logo.className,
                                            )}
                                            src={`/logos/logo-${logoName}-dark.png`}
                                            width={width}
                                            height={height}
                                            alt={`Logo ${logoName}`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {post.images && <ArticleSwiper images={post.images} />}
            <Mdx code={post.code} />
            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
                <Link
                    href="/projects"
                    className={cn(buttonVariants({ variant: "ghost" }))}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Vezi toate proiectele
                </Link>
            </div>
        </main>
    );
}
