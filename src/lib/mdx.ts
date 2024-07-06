import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import { z } from "zod";

const PostSchema = z.object({
    slug: z.string(),
    slugAsParams: z.string(),
    code: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
});

const config = {
    projects: PostSchema.extend({
        read: z.number(),
        featureImage: z.string(),
        images: z.array(z.string()).optional(),
        sponsors: z.array(z.string()).optional(),
    }),
    legal: PostSchema.extend({
        headings: z.array(z.string()),
    }),
};

export type PostClass = keyof typeof config;
type AllPosts = {
    [Key in PostClass]: z.infer<(typeof config)[Key]>[];
};

async function compileMdx() {
    const allPosts: AllPosts = {} as AllPosts;
    const postClasses = Object.keys(config) as PostClass[];

    await Promise.all(
        postClasses.map(async (postClass) => {
            // @ts-expect-error: expects dynamic props generated only at runtime
            allPosts[postClass] = await compileMdxType(postClass);
        }),
    );
    return allPosts;
}

async function compileMdxType(postClass: PostClass) {
    const TYPE_DIR = path.join(process.cwd(), "content", postClass);
    const EXTENSION = ".mdx";
    const files = fs.readdirSync(TYPE_DIR);
    const mdxFiles = files.filter(
        (file) => path.extname(file).toLowerCase() === EXTENSION,
    );
    if (!mdxFiles.length) {
        throw new Error(`PostClass directory must contain .mdx files`);
    }

    return await Promise.all(
        mdxFiles.map((file) =>
            compileMdxFile(path.join(TYPE_DIR, file), postClass),
        ),
    );
}

async function compileMdxFile(filePath: string, postClass: PostClass) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContent);

    const code = String(
        await compile(content, {
            outputFormat: "function-body",
        }),
    );
    const validated = config[postClass].parse({
        slug: path.basename(filePath, ".mdx"),
        slugAsParams: path.join(
            "/",
            postClass,
            path.basename(filePath, ".mdx"),
        ),
        code: code,
        ...data,
    });

    return validated;
}

export const allPosts: AllPosts = await compileMdx();
