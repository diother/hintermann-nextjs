import fs from "fs";
import { access, readFile } from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content/projects");

async function renderAllPosts() {
    const files = fs.readdirSync(POSTS_DIR);
    const allPosts = await Promise.all(
        files.map(async (file) => {
            const slug = path.basename(file, ".mdx");
            try {
                await access(file);
            } catch (err) {
                return null;
            }
            const mdxContent = await compileMDX({
                source: await readFile(file, { encoding: "utf8" }),
                options: { parseFrontmatter: true },
            });
            return {
                slug,
                content: mdxContent.content,
                frontmatter: mdxContent.frontmatter,
            };
        }),
    );

    return allPosts;
}

const allPosts = await createAllPosts();
export default allPosts;
