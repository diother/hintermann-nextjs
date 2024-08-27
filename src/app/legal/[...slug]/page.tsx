import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx/mdx-components";
import { notFound } from "next/navigation";
import { allPosts } from "@/lib/mdx";
import Meta from "@/lib/metadata";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

const getPostFromParams = async (slug: string) =>
    allPosts.legal.find((post) => post.slug === slug);

export const generateMetadata = async ({ params }: PostPageProps) => {
    const slug = params.slug[0]!;
    const post = await getPostFromParams(slug);

    if (!post) {
        return {};
    }
    return Meta(post.title, post.description, undefined, "article");
};

export const generateStaticParams = async () =>
    allPosts.legal.map((post) => ({
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
            <Mdx code={post.code} />
        </main>
    );
};

export default Page;
