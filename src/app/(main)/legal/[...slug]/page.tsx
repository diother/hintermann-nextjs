import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx/mdx-components";
import Link from "next/link";
import { getAnchor } from "@/lib/utils";
import type { Metadata } from "next";
import { env } from "@/env";
import { notFound } from "next/navigation";
import { allPosts } from "@/lib/mdx";
import { DecorationCross } from "@/components/decoration";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(slug: string) {
    const post = allPosts.legal.find((post) => post.slug === slug);
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
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "Hintermann Logo",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: "/og-image.png",
        },
    };
}

export async function generateStaticParams(): Promise<
    PostPageProps["params"][]
> {
    return allPosts.legal.map((post) => ({
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
        <main className="container relative w-full max-w-3xl p-4 sm:p-10 lg:grid lg:max-w-6xl lg:grid-cols-12 lg:py-16">
            <div className="lg:col-span-12">
                <section className="relative border px-4 py-6 sm:p-10 lg:p-12">
                    <DecorationCross position="top-left" />
                    <DecorationCross position="bottom-right" />
                    <h1 className="display-heading text-center">
                        {post.title}
                    </h1>
                </section>
            </div>
            <div className="border-x border-b px-4 py-10 sm:px-10 lg:col-span-8 lg:border-r-0 lg:p-12">
                <Mdx code={post.code} />
            </div>
            <nav className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto border-x border-b p-12 lg:col-span-4 lg:block">
                <p className="mb-3 font-semibold">Pe pagina aceasta</p>
                <ul className="flex flex-col gap-3">
                    {post.headings.map((heading) => {
                        let subheading;
                        if (heading.startsWith("$")) {
                            subheading = heading.substring(1);
                        }
                        return (
                            <li key={subheading ?? heading}>
                                <Link
                                    className={`${subheading && "ml-4"} text-[.95rem] text-muted-foreground transition-colors hover:text-foreground`}
                                    href={`#${getAnchor(subheading ?? heading)}`}
                                >
                                    {subheading ?? heading}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </main>
    );
}
