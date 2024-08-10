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
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
        <h1 className="font-display text-3xl leading-tight">Proiecte</h1>
        <ProjectArchive posts={posts} />
    </main>
);

export default Page;
