import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import clsx from "clsx";
import Markdown from "react-markdown";
import TOC from "@/components/TOC";
import { articles } from "@/data";

import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const markdownPlugins = {
  remarkPlugins: [remarkGfm, remarkRehype],
  rehypePlugins: [rehypeRaw, rehypeSlug, rehypeAutolinkHeadings],
};

export default function Post() {
  const { articleId } = useParams();
  const article = articles.find((a) => a.id === articleId);
  const markdown = useMarkdown(`/posts/${article?.content_url}`);
  const toc = useTOC(markdown);

  if (!article) return <div>Article not found</div>;

  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col justify-center scroll-smooth",
        "px-8 pb-20 pt-10",
        "sm:px-4 sm:pb-40 sm:pt-20",
        "lg:flex-row lg:px-0",
      )}
    >
      <div
        className={clsx(
          "prose prose-zinc w-full max-w-none dark:prose-invert",
          "prose-h1:text-2xl prose-h1:font-semibold sm:prose-h1:text-3xl",
          "prose-h2:text-xl sm:prose-h2:text-2xl",
          "prose-h3:text-lg sm:prose-h3:text-xl",
          "prose-h4:text-base sm:prose-h4:text-lg",
          "prose-p:font-serif prose-p:text-base sm:prose-p:text-xl",
          "lg:w-1/2",
        )}
      >
        <Markdown
          components={getMarkdownComponents(articleId)}
          {...markdownPlugins}
        >
          {markdown}
        </Markdown>
      </div>
      <aside className="sticky top-20 hidden w-full self-start lg:ml-8 lg:block lg:w-1/4">
        <TOC toc={toc} />
      </aside>
    </div>
  );
}

function useMarkdown(url?: string) {
  const [markdown, setMarkdown] = useState("Loading...");
  useEffect(() => {
    if (!url) return setMarkdown("No markdown found");
    fetch(url)
      .then((res) => res.text())
      .then(setMarkdown)
      .catch(() => setMarkdown("Error loading markdown"));
  }, [url]);
  return markdown;
}

function useTOC(markdown: string) {
  const [toc, setTOC] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const html = renderToStaticMarkup(
      <Markdown {...markdownPlugins}>{markdown}</Markdown>,
    );
    const doc = new DOMParser().parseFromString(html, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3, h4, h5, h6"));
    const tocItems = headings.map((heading) => {
      const level = parseInt(heading.tagName[1], 10);
      const id = heading.id;
      const text = heading.textContent || "";
      return (
        <li
          key={id}
          className={clsx(
            `pl-${(level - 2) * 4}`,
            "opacity-50 hover:opacity-100",
          )}
        >
          <a href={`#${id}`}>{text}</a>
        </li>
      );
    });
    setTOC(tocItems);
  }, [markdown]);

  return toc;
}

function getMarkdownComponents(articleId?: string) {
  const resolvePath = (src?: string) =>
    src?.startsWith("./img/") ? `/posts/${articleId}/img/${src.slice(6)}` : src;

  return {
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <img
        src={resolvePath(src)}
        alt={alt}
        className="h-auto w-full rounded-lg border border-zinc-200"
      />
    ),
    video: ({ src, ...props }: any) => (
      <video
        controls
        loading="lazy"
        className="my-4 w-full rounded-lg border border-zinc-200"
        src={resolvePath(src)}
        {...props}
      />
    ),
  };
}
