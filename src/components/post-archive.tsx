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
            className="flex flex-col gap-4"
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
            <h2 className="font-display text-2xl leading-tight">
                {post.title}
            </h2>
            <p>{post.description}</p>
            <Button className="w-full" size="lg">
                Vezi poveste
            </Button>
        </Link>
    ));

export default ProjectArchive;
