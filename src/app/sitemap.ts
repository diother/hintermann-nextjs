import { env } from "@/env";
import { type PostClass, allPosts } from "@/lib/mdx";
import { type MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const dynamicPages: MetadataRoute.Sitemap = [];
    Object.keys(allPosts).map((category) =>
        allPosts[category as PostClass].map((post) => {
            dynamicPages.push({
                url: env.NEXT_PUBLIC_APP_URL + post.slugAsParams,
                changeFrequency: "yearly",
                priority: 1,
            });
        }),
    );
    return [
        {
            url: env.NEXT_PUBLIC_APP_URL,
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: env.NEXT_PUBLIC_APP_URL + "/projects",
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: env.NEXT_PUBLIC_APP_URL + "/contact",
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: env.NEXT_PUBLIC_APP_URL + "/donate",
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: env.NEXT_PUBLIC_APP_URL + "/login",
            changeFrequency: "yearly",
            priority: 0.3,
        },
        ...dynamicPages,
    ];
}
