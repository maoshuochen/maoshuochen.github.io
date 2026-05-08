import { articles } from "@/data";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import { useState } from "react";
import SEO from "@/components/SEO";

export default function Home() {
  const { language } = useLanguage();
  const description =
    language === "zh"
      ? "陈茂烁的产品设计作品集，关注用户体验、交互设计、产品管理与 AI 产品思考。"
      : "Maoshuo Chen's product design portfolio, focused on user experience, interaction design, product management, and AI product thinking.";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 pt-4 sm:px-0">
      <SEO title="Maoshuo Chen" description={description} />
      <Intro />
      <ArticleGrid />
    </div>
  );
}

// 🎯 Intro 区域
function Intro() {
  const { t } = useLanguage();
  const [isWaving, setIsWaving] = useState(true);

  const handleWaveClick = () => {
    setIsWaving(false);
    setTimeout(() => setIsWaving(true), 50);
  };

  return (
    <div className="w-full p-4 sm:w-3/4 sm:p-8">
      <h1
        className={clsx(
          "py-12 font-sans text-2xl font-medium",
          "sm:py-20 sm:text-4xl/relaxed",
        )}
      >
        <span
          className="cursor-pointer select-none"
          onClick={handleWaveClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleWaveClick();
            }
          }}
          aria-label="Wave emoji"
        >
          <span className={isWaving ? 'wave-animation' : ''}>👋</span>
        </span>
        {' '}{t('homeIntro1').replace('👋 ', '')}
        <br />{t('homeIntro2')}
      </h1>
    </div>
  );
}

// 🎯 文章列表区域
function ArticleGrid() {
  const { t } = useLanguage();
  return (
    <div
      className={clsx(
        "grid w-full grid-cols-1 gap-8 p-4",
        "sm:w-3/4 sm:grid-cols-2 sm:gap-16 sm:p-8",
      )}
    >
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} t={t} />
      ))}
    </div>
  );
}

// 🎯 单个文章卡片
function ArticleCard({
  article,
  index,
  t,
}: {
  article: (typeof articles)[number];
  index: number;
  t: (key: TranslationKey) => string;
}) {
  const title = t(article.titleKey as TranslationKey);
  const subtitle = t(article.subtitleKey as TranslationKey);

  return (
    <div className="w-full cursor-pointer">
      <Link to={`/post/${article.id}`} aria-label={`${title}: ${subtitle}`}>
        <div
          className={clsx(
            "h-56 w-full overflow-hidden rounded-xl",
            "border border-zinc-100 dark:border-zinc-800",
            "bg-white",
            "duration-300 hover:shadow-xl",
            "hover:shadow-zinc-200 dark:hover:shadow-zinc-900",
            "sm:h-72",
          )}
        >
          <img
            src={`/posts/${article.image_url}`}
            alt={title}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>
        <div
          className={clsx(
            "flex w-full flex-col items-start",
            "space-y-1 pt-2",
            "sm:space-y-2 sm:pt-4",
          )}
        >
          <h2 className="font-sans text-xl font-medium sm:text-2xl">
            {title}
          </h2>
          <h3 className="text-lg font-light sm:text-xl">{subtitle}</h3>
        </div>
      </Link>
    </div>
  );
}
