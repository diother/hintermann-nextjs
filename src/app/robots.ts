import { type MetadataRoute } from "next";
import { env } from "@/env";

const robots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/donate/thank-you"],
    },
    sitemap: env.NEXT_PUBLIC_APP_URL + "/sitemap.xml",
});

export default robots;
