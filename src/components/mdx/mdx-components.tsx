import * as React from "react";
import Image from "next/image";

import { cn, getAnchor } from "@/lib/utils";
import { Callout } from "@/components/mdx/callout";
import { MdxCard } from "@/components/mdx/mdx-card";
import { type Fragment, type Jsx, run } from "@mdx-js/mdx";
import * as runtime_ from "react/jsx-runtime";
import Link from "next/link";
import { Hash } from "lucide-react";

interface Component {
    children?: React.ReactNode;
    className?: string;
}
const components = {
    h1: ({ className, children, ...props }: Component) => {
        const anchor = getAnchor(children as string);
        const link = `#${anchor}`;

        return (
            <h1
                id={anchor}
                className={cn(
                    "mt-10 scroll-m-20 text-2xl font-bold tracking-[-.03em] sm:text-3xl",
                    className,
                )}
                {...props}
            >
                <Link
                    href={link}
                    className="w-fit transition hover:text-muted-foreground [&_svg]:opacity-0 [&_svg]:hover:opacity-100"
                >
                    {children}
                    <Hash className="ml-2 hidden h-5 w-5 sm:inline" />
                </Link>
            </h1>
        );
    },
    h2: ({ className, children, ...props }: Component) => {
        const anchor = getAnchor(children as string);
        const link = `#${anchor}`;

        return (
            <h2
                id={anchor}
                className={cn(
                    "mt-10 scroll-m-20 text-xl font-bold tracking-[-.03em] sm:text-2xl",
                    className,
                )}
                {...props}
            >
                <Link
                    href={link}
                    className="w-fit transition hover:text-muted-foreground [&_svg]:opacity-0 [&_svg]:hover:opacity-100"
                >
                    {children}
                    <Hash className="ml-2 hidden h-5 w-5 sm:inline" />
                </Link>
            </h2>
        );
    },
    h3: ({ className, children, ...props }: Component) => {
        const anchor = getAnchor(children as string);
        const link = `#${anchor}`;

        return (
            <h3
                id={anchor}
                className={cn(
                    "mt-10 scroll-m-20 text-lg font-bold tracking-[-.03em] sm:text-xl",
                    className,
                )}
                {...props}
            >
                <Link
                    href={link}
                    className="w-fit transition hover:text-muted-foreground [&_svg]:opacity-0 [&_svg]:hover:opacity-100"
                >
                    {children}
                    <Hash className="ml-2 hidden h-5 w-5 sm:inline" />
                </Link>
            </h3>
        );
    },
    h4: ({ className, ...props }: Component) => (
        <h4
            className={cn("heading-4 mt-8 scroll-m-20", className)}
            {...props}
        />
    ),
    h5: ({ className, ...props }: Component) => (
        <h5
            className={cn("heading-5 mt-8 scroll-m-20", className)}
            {...props}
        />
    ),
    h6: ({ className, ...props }: Component) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    a: ({ className, ...props }: Component) => (
        <a
            className={cn(
                "text-lg leading-relaxed text-foreground/80 underline underline-offset-4 transition-colors first:mt-0 hover:text-foreground sm:text-xl sm:leading-relaxed",
                className,
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: Component) => (
        <p
            className={cn(
                "mt-6 text-lg leading-relaxed text-foreground/80 first:mt-0 sm:text-xl sm:leading-relaxed",
                className,
            )}
            {...props}
        />
    ),
    ul: ({ className, ...props }: Component) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: Component) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: Component) => (
        <li
            className={cn(
                "mt-2 text-lg leading-relaxed text-foreground/80 sm:text-xl sm:leading-relaxed",
                className,
            )}
            {...props}
        />
    ),
    blockquote: ({ className, ...props }: Component) => (
        <blockquote
            className={cn(
                "mt-6 border-l-2 border-foreground pl-6 text-lg italic leading-relaxed text-foreground/80 sm:text-xl sm:leading-relaxed",
                className,
            )}
            {...props}
        />
    ),
    img: ({ alt, src }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <Image src={src!} alt={alt!} width="700" height="700" />
    ),
    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
    table: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={cn("w-full", className)} {...props} />
        </div>
    ),
    tr: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn("m-0 border-t p-0 even:bg-muted", className)}
            {...props}
        />
    ),
    th: ({ className, ...props }: Component) => (
        <th
            className={cn(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                className,
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: Component) => (
        <td
            className={cn(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                className,
            )}
            {...props}
        />
    ),
    pre: ({ className, ...props }: Component) => (
        <pre
            className={cn(
                "mb-4 mt-6 overflow-x-auto rounded-lg border p-8",
                className,
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }: Component) => (
        <code
            className={cn(
                "relative rounded font-mono text-sm sm:text-base",
                className,
            )}
            {...props}
        />
    ),
    Image,
    Callout,
    Card: MdxCard,
};

interface MdxProps {
    code: string;
}

export async function Mdx({ code }: MdxProps) {
    // @ts-expect-error: the automatic react runtime is untyped.
    const runtime: { Fragment: Fragment; jsx: Jsx; jsxs: Jsx } = runtime_;
    const { default: MdxContent } = await run(code, {
        ...runtime,
        baseUrl: import.meta.url,
    });
    return (
        <div className="mdx">
            <MdxContent components={components} />
        </div>
    );
}
