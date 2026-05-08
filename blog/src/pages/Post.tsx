import React, { Suspense, lazy, useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { articles } from "@/data";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";

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

interface MarkdownImage {
  src: string;
  alt: string;
}

// 延迟加载 Markdown 和 TOC 组件
const Markdown = lazy(() => import("react-markdown"));
const TOC = lazy(() => import("@/components/TOC"));

const markdownCache = new Map<string, string>();
const inFlight = new Map<string, AbortController>();

export default function Post() {
  const { articleId } = useParams<{ articleId: string }>();
  const { language, t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [fallbackLightboxImage, setFallbackLightboxImage] = useState<MarkdownImage | null>(null);
  const tocRef = useRef<TOCItem[]>([]);

  const article = useMemo(
    () => articles.find((a) => a.id === articleId),
    [articleId],
  );

  const contentUrl =
    language === "zh" ? article?.content_url_zh : article?.content_url;
  const otherUrl =
    language === "zh" ? article?.content_url : article?.content_url_zh;
  const markdown = useMarkdown(
    contentUrl ? `/posts/${contentUrl}` : undefined,
    otherUrl ? `/posts/${otherUrl}` : undefined,
  );
  const markdownImages = useMemo(
    () => extractMarkdownImages(markdown, articleId),
    [articleId, markdown],
  );
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (!sameToc(toc, tocRef.current)) {
      setToc(tocRef.current);
    }
  }, [markdown, toc]);

  const openLightbox = (src: string, alt?: string) => {
    const index = markdownImages.findIndex((image) => image.src === src);
    if (index >= 0) {
      setFallbackLightboxImage(null);
      setLightboxIndex(index);
      return;
    }
    setFallbackLightboxImage({ src, alt: alt || '' });
    setLightboxIndex(0);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setFallbackLightboxImage(null);
  };

  const activeLightboxImages = fallbackLightboxImage
    ? [fallbackLightboxImage]
    : markdownImages;
  const activeLightboxImage =
    lightboxIndex === null ? undefined : activeLightboxImages[lightboxIndex];

  const showPreviousImage = () => {
    if (!activeLightboxImages.length) return;
    setLightboxIndex((index) =>
      index === null ? 0 : (index - 1 + activeLightboxImages.length) % activeLightboxImages.length,
    );
  };

  const showNextImage = () => {
    if (!activeLightboxImages.length) return;
    setLightboxIndex((index) =>
      index === null ? 0 : (index + 1) % activeLightboxImages.length,
    );
  };

  if (!article) {
    return (
      <>
        <SEO
          title="Article not found"
          description="The requested article could not be found."
          path={`/post/${articleId ?? ""}`}
          noindex
        />
        <div className="p-10 text-center text-red-500">Article not found</div>
      </>
    );
  }

  const articleTitle = t(article.titleKey as TranslationKey);
  const articleDescription = t(article.subtitleKey as TranslationKey);

  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col scroll-smooth",
        "px-8 pb-10 pt-10 sm:px-20 sm:pt-20 lg:px-40",
      )}
    >
      <SEO
        title={articleTitle}
        description={articleDescription}
        path={`/post/${article.id}`}
        image={article.image_url}
        type="article"
      />
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
        <Suspense fallback={<MarkdownSkeleton />}>
          {markdown ? (
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
          ) : (
            <MarkdownSkeleton />
          )}
        </Suspense>
      </div>

      {/* 右下角 TOC 浮动 */}
      <aside className="hidden lg:block">
        <Suspense fallback={<div>Loading TOC…</div>}>
          <TOC toc={toc} />
        </Suspense>
      </aside>

      <MobileTOC toc={toc} label={language === "zh" ? "目录" : "Contents"} />

      {/* 灯箱 */}
      {activeLightboxImage && (
        <Lightbox
          src={activeLightboxImage.src}
          alt={activeLightboxImage.alt}
          isOpen={lightboxIndex !== null}
          onClose={closeLightbox}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          hasNavigation={activeLightboxImages.length > 1}
        />
      )}
    </div>
  );
}

// --- Hooks & Helpers ---

// 获取 Markdown 内容（带缓存与预取）
function useMarkdown(url?: string, prefetchUrl?: string) {
  const [markdown, setMarkdown] = useState(() =>
    url ? markdownCache.get(url) ?? "" : "",
  );
  useEffect(() => {
    if (!url) return;
    const cached = markdownCache.get(url);
    if (cached) {
      setMarkdown(cached);
      return;
    }
    if (inFlight.has(url)) return;
    const controller = new AbortController();
    inFlight.set(url, controller);
    fetch(url, { signal: controller.signal })
      .then((res) => res.text())
      .then((text) => {
        markdownCache.set(url, text);
        setMarkdown(text);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        if (!markdownCache.has(url)) {
          setMarkdown("Error loading markdown");
        }
      })
      .finally(() => {
        inFlight.delete(url);
      });
    return () => {
      controller.abort();
      inFlight.delete(url);
    };
  }, [url]);

  useEffect(() => {
    if (!prefetchUrl) return;
    if (markdownCache.has(prefetchUrl) || inFlight.has(prefetchUrl)) return;
    const controller = new AbortController();
    inFlight.set(prefetchUrl, controller);
    fetch(prefetchUrl, { signal: controller.signal })
      .then((res) => res.text())
      .then((text) => {
        markdownCache.set(prefetchUrl, text);
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
      })
      .finally(() => {
        inFlight.delete(prefetchUrl);
      });
    return () => {
      controller.abort();
      inFlight.delete(prefetchUrl);
    };
  }, [prefetchUrl]);

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

function MarkdownSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-label="Loading content">
      <div className="h-9 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-3">
        <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="h-64 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-3">
        <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-10/12 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

function MobileTOC({ toc, label }: { toc: TOCItem[]; label: string }) {
  const [open, setOpen] = useState(false);

  if (toc.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={clsx(
          "fixed bottom-4 right-4 z-30 rounded-full border px-4 py-2 text-sm shadow-lg",
          "border-zinc-200 bg-white/95 text-zinc-900 backdrop-blur",
          "dark:border-zinc-800 dark:bg-zinc-950/95 dark:text-zinc-50",
        )}
        aria-expanded={open}
      >
        {label}
      </button>

      {open && (
        <div
          className={clsx(
            "fixed inset-x-4 bottom-16 z-30 max-h-[50vh] overflow-auto rounded-lg border p-4 shadow-2xl",
            "border-zinc-200 bg-white/95 backdrop-blur",
            "dark:border-zinc-800 dark:bg-zinc-950/95",
          )}
        >
          <ul className="space-y-2">
            {toc.map(({ id, text, level }) => (
              <li key={id} style={{ paddingLeft: `${Math.max(0, level - 2) * 12}px` }}>
                <button
                  type="button"
                  onClick={() => scrollToHeading(id)}
                  className="block w-full text-left text-sm text-zinc-600 dark:text-zinc-300"
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function extractMarkdownImages(markdown: string, articleId?: string): MarkdownImage[] {
  if (!markdown || !articleId) return [];
  const images: MarkdownImage[] = [];
  const pattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(markdown))) {
    const rawSrc = match[2].trim();
    if (!rawSrc || rawSrc.startsWith("data:")) continue;
    images.push({
      alt: match[1] || "",
      src: resolveImagePath(rawSrc, articleId) ?? rawSrc,
    });
  }

  return images;
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
      const resolvedSrc = resolveMediaPath(src, articleId);
      return (
        <video
          controls
          playsInline
          preload="metadata"
          src={resolvedSrc}
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
        node.properties.src = resolveMediaPath(node.properties.src, articleId);
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
  return resolveMediaPath(src, articleId);
}

function resolveMediaPath(src?: string, articleId?: string) {
  if (!src) return src;
  if (src.startsWith("./") && articleId) {
    return `/posts/${articleId}/${src.slice(2)}`;
  }
  return src;
}
