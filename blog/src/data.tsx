export interface Article {
  id: string;
  titleKey: string;
  subtitleKey: string;
  image_url: string;
  content_url: string;
  content_url_zh: string;
}

export const articles: Article[] = [
  {
    id: "paperclip",
    titleKey: "paperclipTitle",
    subtitleKey: "paperclipSubtitle",
    image_url: "paperclip/paperclip-cover.webp",
    content_url: "paperclip/paperclip.md",
    content_url_zh: "paperclip/paperclip.zh.md",
  },
  {
    id: "minimalism",
    titleKey: "minimalismTitle",
    subtitleKey: "minimalismSubtitle",
    image_url: "minimalism/minimalism-cover.jpg",
    content_url: "minimalism/minimalism.md",
    content_url_zh: "minimalism/minimalism.zh.md",
  },
  {
    id: "digital-twin",
    titleKey: "digitalTwinTitle",
    subtitleKey: "digitalTwinSubtitle",
    image_url: "digital-twin/digital-twin-cover.jpg",
    content_url: "digital-twin/digital-twin.md",
    content_url_zh: "digital-twin/digital-twin.zh.md",
  },
  {
    id: "spotlight",
    titleKey: "spotlightTitle",
    subtitleKey: "spotlightSubtitle",
    image_url: "spotlight/spotlight-cover.webp",
    content_url: "spotlight/spotlight.md",
    content_url_zh: "spotlight/spotlight.zh.md",
  },
];
