import { useParams } from "react-router-dom";
import { articles } from "@/data";
import { useEffect, useState } from "react";
import TOC from "@/components/TOC";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { renderToStaticMarkup } from "react-dom/server";

const markdownPlugins = {
    remarkPlugins: [remarkGfm, remarkRehype, rehypeRaw],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
};

const useFetchMarkdown = (url?: string) => {
    const [markdown, setMarkdown] = useState("Loading...");
    useEffect(() => {
        if (url) {
            fetch(url)
                .then((response) => response.text())
                .then(setMarkdown)
                .catch(() => setMarkdown("Error loading markdown"));
        } else {
            setMarkdown("No markdown found");
        }
    }, [url]);
    return markdown;
};

const useGenerateTOC = (markdown: string) => {
    const [toc, setTOC] = useState<React.ReactNode[]>([]);
    useEffect(() => {
        const html = renderToStaticMarkup(
            <Markdown {...markdownPlugins}>{markdown}</Markdown>
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const headings = Array.from(doc.querySelectorAll("h2, h3, h4, h5, h6"));

        const tocItems = headings.map((heading) => {
            const level = parseInt(heading.tagName[1], 10);
            const id = heading.id;
            const text = heading.textContent || "";

            return (
                <li
                    key={id}
                    className={`px-${
                        (level - 2) * 4
                    } opacity-70 hover:opacity-100`}
                >
                    <a href={`#${id}`}>{text}</a>
                </li>
            );
        });

        setTOC(tocItems);
    }, [markdown]);
    return toc;
};

export default function Post() {
    const { articleId } = useParams();
    const article = articles.find((article) => article.id === articleId);
    const markdown = useFetchMarkdown(article?.content_url);
    const toc = useGenerateTOC(markdown);

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="h-full w-full flex justify-center pt-20 pb-40 scroll-smooth">
            <Markdown
                {...markdownPlugins}
                className="prose prose-zinc dark:prose-invert max-w-none w-5/12 prose-h1:font-semibold prose-p:font-serif prose-p:text-xl prose-img:rounded-lg"
            >
                {markdown}
            </Markdown>
            <TOC toc={toc} />
        </div>
    );
}
