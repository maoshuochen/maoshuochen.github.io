import React, { Suspense, lazy, useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { articles } from "@/data";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useLanguage } from "@/i18n/LanguageContext";
import Lightbox from "@/components/Lightbox";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface RehypeNode {
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: RehypeNode[];
}

interface MdastNode {
  type?: string;
  value?: unknown;
  depth?: number;
  children?: MdastNode[];
  data?: {
    hProperties?: Record<string, unknown>;
  };
}
// 延迟加载 Markdown 和 TOC 组件
const Markdown = lazy(() => import("react-markdown"));
const TOC = lazy(() => import("@/components/TOC"));

export default function Post() {
  const { articleId } = useParams<{ articleId: string }>();
  const { language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  const tocRef = useRef<TOCItem[]>([]);

  const article = useMemo(
    () => articles.find((a) => a.id === articleId),
    [articleId],
  );

  const contentUrl =
    language === "zh" ? article?.content_url_zh : article?.content_url;
  const markdown = useMarkdown(`/posts/${contentUrl || ""}`);
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (!sameToc(toc, tocRef.current)) {
      setToc(tocRef.current);
    }
  }, [markdown, toc]);

  const openLightbox = (src: string, alt?: string) => {
    setLightboxImage(src);
    setLightboxAlt(alt || '');
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

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
            remarkPlugins={[remarkParse, remarkGfm, remarkCollectToc(tocRef)]}
            rehypePlugins={[
              rehypeRaw,
              rehypeImagePaths(articleId),
              rehypeStripEventHandlers(),
              rehypeAutolinkHeadings,
            ]}
            components={getMarkdownComponents(articleId, openLightbox)}
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

      {/* 灯箱 */}
      <Lightbox
        src={lightboxImage}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
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

function remarkCollectToc(tocRef: React.MutableRefObject<TOCItem[]>) {
  return () => (tree: MdastNode) => {
    const nextToc: TOCItem[] = [];
    const slugCounts = new Map<string, number>();

    const visitNode = (node: MdastNode) => {
      if (node.type === "heading" && node.depth) {
        if (node.depth >= 2 && node.depth <= 6) {
          const text = extractText(node).trim();
          if (text) {
            const id = uniqueSlug(text, slugCounts);
            node.data = node.data ?? {};
            node.data.hProperties = node.data.hProperties ?? {};
            node.data.hProperties.id = id;
            nextToc.push({
              id,
              text,
              level: node.depth,
            });
          }
        }
      }
      if (node.children) {
        node.children.forEach(visitNode);
      }
    };

    visitNode(tree);
    tocRef.current = nextToc;
  };
}

function extractText(node: MdastNode): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return typeof node.value === "string" ? node.value : String(node.value ?? "");
  }
  if (!node.children) return "";
  return node.children.map(extractText).join("");
}

function uniqueSlug(text: string, slugCounts: Map<string, number>) {
  const base = slugifyHeading(text) || "section";
  const count = slugCounts.get(base) ?? 0;
  slugCounts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u00c0-\u024f\u4e00-\u9fff -]/g, "")
    .replace(/\s+/g, "-");
}

function sameToc(a: TOCItem[], b: TOCItem[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].id !== b[i].id || a[i].text !== b[i].text || a[i].level !== b[i].level) {
      return false;
    }
  }
  return true;
}

function rehypeStripEventHandlers() {
  return (tree: RehypeNode) => {
    const visitNode = (node: RehypeNode) => {
      if (!node) return;
      if (node.properties) {
        for (const key of Object.keys(node.properties)) {
          if (key.startsWith("on")) {
            delete node.properties[key];
          }
        }
      }
      if (node.children) {
        node.children.forEach(visitNode);
      }
    };
    visitNode(tree);
  };
}

// 生成图片和视频组件
function getMarkdownComponents(articleId?: string, openLightbox?: (src: string, alt?: string) => void) {
  return {
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const { src, alt, className, ...rest } = props;
      const resolvedSrc = resolveImagePath(src, articleId);
      
      return (
        <img
          loading="lazy"
          src={resolvedSrc}
          alt={alt}
          className={clsx(
            className,
            "h-auto w-full cursor-zoom-in rounded-lg border border-zinc-200",
            "transition-transform hover:scale-[1.02]",
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (resolvedSrc) {
              openLightbox?.(resolvedSrc, alt);
            }
          }}
          {...rest}
        />
      );
    },
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const { href, children, ...rest } = props;
      // 检测是否是图片链接（包含 img 标签的链接）
      const hasImageChild = React.isValidElement(children) && 
        (children as React.ReactElement).type === 'img';
      
      if (hasImageChild) {
        return (
          <a
            {...rest}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ display: 'inline-block' }}
          >
            {children}
          </a>
        );
      }
      return <a href={href} {...rest}>{children}</a>;
    },
    video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => {
      const { src, className, ...rest } = props;
      return (
        <video
          controls
          playsInline
          preload="metadata"
          src={src}
          className={clsx(
            className,
            "my-4 w-full rounded-lg border border-zinc-200",
          )}
          {...rest}
        />
      );
    },
    iframe: (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => {
      const { onLoad, className, ...rest } = props;
      const safeOnLoad = typeof onLoad === "function" ? onLoad : undefined;
      return (
        <iframe
          {...rest}
          onLoad={safeOnLoad}
          className={clsx(className, "my-4 w-full rounded-lg border border-zinc-200")}
        />
      );
    },
  };
}

// rehype 插件：转换图片和视频路径
function rehypeImagePaths(articleId?: string) {
  return (tree: RehypeNode) => {
    if (!tree || !tree.children) return;
    
    const visitNode = (node: RehypeNode) => {
      if (!node) return;
      
      // 处理图片
      if (node.tagName === 'img' && typeof node.properties?.src === "string") {
        node.properties.src = resolveImagePath(node.properties.src, articleId);
      }
      // 处理视频
      if (node.tagName === 'video' && typeof node.properties?.src === "string") {
        if (node.properties.src.startsWith('./img/')) {
          node.properties.src = `/posts/${articleId}/img/${node.properties.src.slice(6)}`;
        }
      }
      
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(visitNode);
      }
    };
    
    tree.children.forEach(visitNode);
  };
}

// 解析图片路径
function resolveImagePath(src?: string, articleId?: string) {
  if (!src) return src;
  if (src.startsWith("./img/")) {
    const imgPath = `/posts/${articleId}/img/${src.slice(6)}`;
    // 如果已经是 .webp 格式，直接使用
    if (src.endsWith('.webp')) {
      return imgPath;
    }
    // 否则使用 .webp 格式
    return `${imgPath}.webp`;
  }
  return src;
}
