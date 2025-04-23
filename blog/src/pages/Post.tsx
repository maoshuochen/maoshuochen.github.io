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
  remarkPlugins: [remarkGfm, remarkRehype],
  rehypePlugins: [rehypeRaw, rehypeSlug, rehypeAutolinkHeadings],
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
      <Markdown {...markdownPlugins}>{markdown}</Markdown>,
    );
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2, h3, h4, h5, h6"));

    // 为不同层级生成对应缩进
    const indentClasses = ["pl-0", "pl-4", "pl-8", "pl-12", "pl-16"];

    const tocItems = headings.map((heading) => {
      const level = parseInt(heading.tagName[1], 10); // 2..6
      const id = heading.id;
      const text = heading.textContent || "";

      const indent = indentClasses[level - 2] || "pl-0";
      return (
        <li key={id} className={`${indent} opacity-50 hover:opacity-100`}>
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
  const article = articles.find((a) => a.id === articleId);
  const markdown = useFetchMarkdown("/posts/" + article?.content_url);
  const toc = useGenerateTOC(markdown);

  if (!article) {
    return <div>Article not found</div>;
  }

  const components = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      const realSrc = src?.startsWith("./img/")
        ? `/posts/${articleId}/img/${src.slice(6)}`
        : src;
      return (
        <img
          src={realSrc}
          alt={alt}
          className="h-auto w-full rounded-lg border border-zinc-200"
        />
      );
    },
    video: ({ src, ...props }: any) => {
      const realSrc = src?.startsWith("./img/")
        ? `/posts/${articleId}/img/${src.slice(6)}`
        : src;
      return (
        <video
          controls
          loading="lazy"
          className="my-4 w-full rounded-lg border border-zinc-200"
          src={realSrc}
          {...props}
        />
      );
    },
  };

  return (
    <div className="flex h-full w-full flex-col justify-center scroll-smooth px-8 pb-40 pt-10 sm:pt-20 lg:flex-row lg:px-0">
      {/* 文章内容区：小屏 100% 宽，大屏 50% */}
      <div className="prose prose-zinc w-full max-w-none dark:prose-invert prose-h1:text-2xl prose-h1:font-semibold prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:font-serif prose-p:text-base sm:prose-h1:text-3xl sm:prose-h2:text-2xl sm:prose-h3:text-xl sm:prose-h4:text-lg sm:prose-p:text-xl lg:w-1/2">
        <Markdown {...markdownPlugins} components={components}>
          {markdown}
        </Markdown>
      </div>

      {/* 目录区：小屏隐藏，大屏显示，且固定在可视顶端 */}
      <aside className="sticky top-20 hidden w-full self-start lg:ml-8 lg:block lg:w-1/4">
        <TOC toc={toc} />
      </aside>
    </div>
  );
}
