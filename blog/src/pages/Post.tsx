import React, { Suspense, lazy, useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { articles } from "@/data";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// 延迟加载 Markdown 和 TOC 组件
const Markdown = lazy(() => import("react-markdown"));
const TOC = lazy(() => import("@/components/TOC"));

export default function Post() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = useMemo(
    () => articles.find((a) => a.id === articleId),
    [articleId],
  );

  const markdown = useMarkdown(`/posts/${article?.content_url || ""}`);
  const parsedHTML = useMemo(() => processMarkdown(markdown), [markdown]);
  const toc: TOCItem[] = useMemo(
    () => parseTOCFromHTML(parsedHTML),
    [parsedHTML],
  );

  if (!article) {
    return (
      <div className="p-10 text-center text-red-500">Article not found</div>
    );
  }

  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col scroll-smooth",
        "px-8 pb-10 pt-10 sm:px-20 sm:pt-20 lg:px-40",
      )}
    >
      {/* Markdown 主体 */}
      <div
        className={clsx(
          "prose prose-zinc w-full max-w-none dark:prose-invert",
          "prose-h1:text-2xl prose-h1:font-semibold sm:prose-h1:text-3xl",
          "prose-h2:text-xl sm:prose-h2:text-2xl",
          "prose-h3:text-lg sm:prose-h3:text-xl",
          "prose-h4:text-base sm:prose-h4:text-lg",
          "prose-p:text-base sm:prose-p:text-lg",
          "lg:w-2/3",
        )}
      >
        <Suspense fallback={<div>Loading content…</div>}>
          <Markdown
            remarkPlugins={[remarkParse, remarkGfm, remarkRehype]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              rehypeAutolinkHeadings,
              rehypeStringify,
            ]}
            components={getMarkdownComponents(articleId)}
          >
            {markdown}
          </Markdown>
        </Suspense>
      </div>

      {/* 右下角 TOC 浮动 */}
      <aside className="hidden lg:block">
        <Suspense fallback={<div>Loading TOC…</div>}>
          <TOC toc={toc} />
        </Suspense>
      </aside>
    </div>
  );
}

// --- Hooks & Helpers ---

// 获取 Markdown 内容
function useMarkdown(url?: string) {
  const [markdown, setMarkdown] = useState("Loading...");
  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((res) => res.text())
      .then(setMarkdown)
      .catch(() => setMarkdown("Error loading markdown"));
  }, [url]);
  return markdown;
}

// 处理 Markdown 转换为 HTML
function processMarkdown(markdown: string) {
  if (!markdown) return "";
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
}

// 从 HTML 中提取 TOC
function parseTOCFromHTML(html: string): TOCItem[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3, h4, h5, h6"));

  return headings.map((heading) => ({
    id: heading.id,
    text: heading.textContent || "",
    level: parseInt(heading.tagName[1], 10),
  }));
}

// 生成图片和视频组件
function getMarkdownComponents(articleId?: string) {
  const resolvePath = (src?: string) =>
    src?.startsWith("./img/") ? `/posts/${articleId}/img/${src.slice(6)}` : src;

  return {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const { src, alt, className, ...rest } = props;
      return (
        <img
          loading="lazy"
          src={resolvePath(src)}
          alt={alt}
          className={clsx(
            className,
            "h-auto w-full rounded-lg border border-zinc-200",
          )}
          {...rest}
        />
      );
    },
    video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => {
      const { src, className, ...rest } = props;
      return (
        <video
          controls
          autoPlay
          muted
          src={resolvePath(src as string)}
          className={clsx(
            className,
            "my-4 w-full rounded-lg border border-zinc-200",
          )}
          {...rest}
        />
      );
    },
  };
}
