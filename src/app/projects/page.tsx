import { compareDesc } from "date-fns";
import { allPosts } from "@/lib/mdx";
import ProjectArchive from "@/components/post-archive";
import Meta from "@/lib/metadata";

export const metadata = Meta(
    "Proiecte",
    "Pagina de proiecte Hintermann Charity",
);

const posts = allPosts.projects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
);

const Page = () => (
    <main className="mx-auto flex w-full max-w-screen-md flex-col gap-10 px-6 py-12 md:text-lg">
        <h1 className="font-display text-3xl leading-tight md:text-4xl">
            Proiecte
        </h1>
        <ProjectArchive posts={posts} />
    </main>
);

export default Page;
