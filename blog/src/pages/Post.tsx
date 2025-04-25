import React, { Suspense, lazy, useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { articles } from "@/data";
import { generateTOC } from "@/utils/parseTOC";

import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

const Markdown = lazy(() => import("react-markdown"));
const TOC = lazy(() => import("@/components/TOC"));

export default function Post() {
  const { articleId } = useParams();
  const article = useMemo(
    () => articles.find((a) => a.id === articleId),
    [articleId],
  );

  const markdown = useMarkdown(
    article?.content_url ? `/posts/${article.content_url}` : undefined,
  );

  const toc = useMemo(() => generateTOC(markdown), [markdown]);

  if (!article)
    return (
      <div className="p-10 text-center text-red-500">Article not found</div>
    );

  return (
    <div className="flex h-full w-full flex-col justify-center scroll-smooth px-8 pb-20 pt-10 sm:px-4 sm:pb-40 sm:pt-20 lg:flex-row lg:px-0">
      {/* Markdown 内容区域 */}
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

      {/* TOC 目录 */}
      <aside className="fixed bottom-20 right-10 hidden w-72 lg:block">
        <Suspense fallback={<div>Loading TOC…</div>}>
          <ul>
            {toc.map(({ id, text, level }) => (
              <li
                key={id}
                className={clsx(
                  `px-${(level - 2) * 4}`,
                  "opacity-50 hover:opacity-100",
                )}
              >
                <a href={`#${id}`}>{text}</a>
              </li>
            ))}
          </ul>
        </Suspense>
      </aside>
    </div>
  );
}

// 自定义 Hook：加载 Markdown 内容
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

// Markdown 图片 & 视频处理
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
