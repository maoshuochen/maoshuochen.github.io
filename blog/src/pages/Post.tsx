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

    const tocItems = headings.map((heading) => {
      const level = parseInt(heading.tagName[1], 10);
      const id = heading.id;
      const text = heading.textContent || "";

      return (
        <li
          key={id}
          className={`px-${(level - 2) * 4} opacity-50 hover:opacity-100`}
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
  const markdown = useFetchMarkdown("/posts/" + article?.content_url);
  const toc = useGenerateTOC(markdown);

  if (!article) {
    return <div>Article not found</div>;
  }

  //替换图片和视频路径
  const components = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      const realSrc = src?.startsWith("./img/")
        ? `/posts/${articleId}/img/${src.slice(6)}`
        : src;
      return (
        <img
          src={realSrc}
          alt={alt}
          className="rounded-lg border border-zinc-200"
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
    <div className="flex h-full w-full justify-center scroll-smooth pb-40 pt-20">
      <Markdown
        {...markdownPlugins}
        className="prose prose-zinc w-1/2 max-w-none dark:prose-invert prose-h1:font-semibold prose-p:font-serif prose-p:text-xl"
        components={components}
      >
        {markdown}
      </Markdown>
      <TOC toc={toc} />
    </div>
  );
}
