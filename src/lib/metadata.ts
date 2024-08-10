import { env } from "@/env";
import type { Metadata } from "next";

const Meta = (
    title: string,
    description: string,
    image = "/og-image.png",
    type: "website" | "article" = "website",
): Metadata => ({
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: title,
    description: description,
    openGraph: {
        title: title,
        description: description,
        type: type,
        images: [
            {
                url: image,
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: image,
    },
});

export default Meta;
