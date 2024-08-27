import type { AllPosts } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/button";

const ProjectArchive = ({ posts }: { posts: AllPosts["projects"] }) =>
    posts?.length &&
    posts.map((post) => (
        <Link
            key={post.slug}
            href={post.slugAsParams}
            className="flex flex-col gap-4 md:gap-6"
        >
            {post.featureImage && (
                <Image
                    className="h-auto w-full"
                    src={post.slugAsParams + post.featureImage}
                    width="300"
                    height="200"
                    alt={post.title}
                />
            )}
            <h2 className="font-display text-2xl leading-tight md:text-3xl">
                {post.title}
            </h2>
            <p className="grow">{post.description}</p>
            <Button className="w-full md:w-fit" size="lg">
                Vezi poveste
            </Button>
        </Link>
    ));

export default ProjectArchive;
