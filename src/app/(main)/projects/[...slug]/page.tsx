import { Mdx } from "@/components/mdx/mdx-components";
import { formatDate } from "@/lib/utils";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(slug: string) {
    const post = allPosts.find((post) => post.slugAsParams === slug);
    if (!post) {
        notFound();
    }
    return post;
}

export default async function Page({ params }: PostPageProps) {
    const slug = params.slug[0]!;
    const post = await getPostFromParams(slug);

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10">
            <div>
                {post.date && (
                    <time
                        dateTime={post.date}
                        className="block text-sm text-muted-foreground"
                    >
                        Publicat în {formatDate(post.date)}
                    </time>
                )}
                <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
                    {post.title}
                </h1>
            </div>
            <Mdx code={post.body.code} />
            <hr className="mt-12" />
        </article>
    );
}
// {post.image && (
//     <Image
//         src={post.image}
//         alt={post.title}
//         width={720}
//         height={405}
//         className="my-8 rounded-md border bg-muted transition-colors"
//         priority
//     />
// )}
