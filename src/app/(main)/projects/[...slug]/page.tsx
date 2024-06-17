import "@/styles/mdx.css";
import ArticleSwiper from "@/components/article-swiper";
import { Mdx } from "@/components/mdx/mdx-components";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, cn, formatDate } from "@/lib/utils";
import { Metadata } from "next";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(slug: string) {
    const post = allPosts.find((post) => post.slugAsParams === slug);
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
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: absoluteUrl(post.slug),
            images: ogImage
                ? [
                      {
                          url: ogImage,
                          width: 300,
                          height: 200,
                          alt: post.title,
                      },
                  ]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

export async function generateStaticParams(): Promise<
    PostPageProps["params"][]
> {
    return allPosts.map((post) => ({
        slug: post.slugAsParams.split("/"),
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
            </div>
            {post.images && <ArticleSwiper images={post.images} />}
            <Mdx code={post.body.code} />
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
