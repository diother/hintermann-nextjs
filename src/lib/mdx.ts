import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import { z } from "zod";

const ProjectSchema = z.object({
    slug: z.string(),
    slugAsParams: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    images: z.array(z.string()),
    code: z.string(),
});

async function compileMdxFile(filePath: string) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { content, data } = matter(fileContent);

        const code = String(
            await compile(content, {
                outputFormat: "function-body",
            }),
        );
        const validated = ProjectSchema.parse({
            slug: path.basename(filePath, ".mdx"),
            slugAsParams: "/projects/" + path.basename(filePath, ".mdx"),
            ...data,
            code: code,
        });

        return validated;
    } catch (error) {
        throw error;
    }
}

const POSTS_DIR = path.join(process.cwd(), "content/projects");
const files = fs.readdirSync(POSTS_DIR);

export const allPosts = await Promise.all(
    files.map((file) => compileMdxFile(path.join(POSTS_DIR, file))),
);
