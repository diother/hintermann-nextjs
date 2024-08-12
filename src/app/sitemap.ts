import { env } from "@/env";
import { type PostClass, allPosts } from "@/lib/mdx";
import { type MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const staticPages: StaticPage[] = [
        { href: "", change: "weekly" },
        { href: "/projects", change: "weekly" },
        { href: "/contact", change: "monthly" },
        { href: "/donate", change: "monthly" },
    ];

    const pages: MetadataRoute.Sitemap = [];
    staticPages.map((page) => {
        pages.push({
            url: env.NEXT_PUBLIC_APP_URL + page.href,
            changeFrequency: page.change,
        });
    });
    Object.keys(allPosts).map((category) =>
        allPosts[category as PostClass].map((post) => {
            pages.push({
                url: env.NEXT_PUBLIC_APP_URL + post.slugAsParams,
                changeFrequency: "yearly",
            });
        }),
    );

    return [...pages];
};

interface StaticPage {
    href: string;
    change: "weekly" | "monthly" | "yearly";
}

export default sitemap;
