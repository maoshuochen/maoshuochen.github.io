import { useEffect } from "react";

const SITE_URL = "https://maoshuochen.com";
const SITE_NAME = "Maoshuo Chen";
const DEFAULT_IMAGE = "/logo/star.svg";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = absoluteUrl(path);
    const imageUrl = absoluteUrl(image.startsWith("/posts/") || image.startsWith("/") ? image : `/posts/${image}`);

    document.title = fullTitle;
    document.documentElement.lang = /[\u4e00-\u9fff]/.test(description) ? "zh-CN" : "en";

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);
    setCanonical(canonicalUrl);
    setJsonLd(jsonLd ?? defaultJsonLd(fullTitle, description, canonicalUrl, imageUrl, type));
  }, [description, image, jsonLd, noindex, path, title, type]);

  return null;
}

function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setJsonLd(data: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>('script[data-seo-json-ld="true"]');
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.seoJsonLd = "true";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function defaultJsonLd(
  title: string,
  description: string,
  url: string,
  image: string,
  type: SEOProps["type"],
) {
  if (type === "article") {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: title,
      description,
      url,
      image,
      author: {
        "@type": "Person",
        name: SITE_NAME,
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": type === "profile" ? "ProfilePage" : "WebSite",
    name: title,
    description,
    url,
    image,
  };
}
