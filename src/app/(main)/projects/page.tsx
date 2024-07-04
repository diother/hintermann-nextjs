import Image from "next/image";
import Link from "next/link";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { env } from "@/env";
import { allPosts } from "@/lib/mdx";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Proiecte",
    openGraph: {
        title: "Proiecte",
        description: "Pagina de proiecte Hintermann Charity",
        type: "website",
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
        title: "Proiecte",
        description: "Pagina de proiecte Hintermann Charity",
        images: "/og-image.png",
    },
};

export default function Page() {
    const posts = allPosts.projects.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date));
    });

    return (
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6 sm:gap-10 sm:p-10 lg:py-16">
            <div className="flex flex-col gap-4">
                <h1 className="display-heading">Proiecte</h1>
                <p className="text-lg text-muted-foreground">
                    Descoperă ultimele proiecte Hintermann Charity.
                </p>
            </div>
            {posts?.length ? (
                <section className="flex flex-col gap-6">
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={post.slugAsParams}
                            className="z-10 grid gap-4 rounded-lg border p-4 transition hover:shadow-xl dark:hover:shadow-none dark:hover:outline dark:hover:outline-2 dark:hover:outline-primary md:grid-cols-[300px_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-6 [&:hover_img]:scale-110"
                        >
                            <p className="text-sm text-muted-foreground">
                                {formatDate(post.date)}
                            </p>
                            {post.images?.[0] && (
                                <div className="overflow-hidden rounded-md md:row-span-3 md:row-start-1">
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
                            <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
                                {post.description}
                            </p>
                        </Link>
                    ))}
                </section>
            ) : (
                <p>Niciun articol valabil acum.</p>
            )}
        </main>
    );
}
