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
    image_url: "minimalism/minimalism-cover.webp",
    content_url: "minimalism/minimalism.md",
    content_url_zh: "minimalism/minimalism.zh.md",
  },
  {
    id: "digital-twin",
    titleKey: "digitalTwinTitle",
    subtitleKey: "digitalTwinSubtitle",
    image_url: "digital-twin/digital-twin-cover.webp",
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
  {
    id: "mosey",
    titleKey: "moseyTitle",
    subtitleKey: "moseySubtitle",
    image_url: "mosey/mosey-cover.jpg",
    content_url: "mosey/mosey.md",
    content_url_zh: "mosey/mosey.md",
  },
  {
    id: "cubes-footbridge",
    titleKey: "cubesFootbridgeTitle",
    subtitleKey: "cubesFootbridgeSubtitle",
    image_url: "cubes-footbridge/final11192-01-Copy.webp",
    content_url: "cubes-footbridge/cubes-footbridge.md",
    content_url_zh: "cubes-footbridge/cubes-footbridge.md",
  },
  {
    id: "fluxor",
    titleKey: "fluxorTitle",
    subtitleKey: "fluxorSubtitle",
    image_url: "fluxor/img/image-1575701513586-768x432-1.webp",
    content_url: "fluxor/fluxor.md",
    content_url_zh: "fluxor/fluxor.md",
  },
  {
    id: "ingenious-skin",
    titleKey: "ingeniousSkinTitle",
    subtitleKey: "ingeniousSkinSubtitle",
    image_url: "ingenious-skin/img/1650211836-Panel1-scaled.jpg",
    content_url: "ingenious-skin/ingenious-skin.md",
    content_url_zh: "ingenious-skin/ingenious-skin.md",
  },
  {
    id: "science-exhibition",
    titleKey: "scienceExhibitionTitle",
    subtitleKey: "scienceExhibitionSubtitle",
    image_url: "science-exhibition/img/Studio1_Page_03-1536x864.jpg",
    content_url: "science-exhibition/science-exhibition.md",
    content_url_zh: "science-exhibition/science-exhibition.md",
  },
  {
    id: "helmet-generative",
    titleKey: "helmetGenerativeTitle",
    subtitleKey: "helmetGenerativeSubtitle",
    image_url: "helmet-generative/Artboard-1.webp",
    content_url: "helmet-generative/helmet-generative.md",
    content_url_zh: "helmet-generative/helmet-generative.md",
  },
];
