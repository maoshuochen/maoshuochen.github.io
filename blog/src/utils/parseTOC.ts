// utils/parseTOC.ts
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function generateTOC(markdown: string): TOCItem[] {
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();

  const doc = new DOMParser().parseFromString(html, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3, h4, h5, h6"));

  return headings.map((el) => ({
    id: el.id,
    text: el.textContent || "",
    level: parseInt(el.tagName[1], 10),
  }));
}
