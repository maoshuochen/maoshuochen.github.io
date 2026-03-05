import { articles } from "@/data";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 pt-4 sm:px-0">
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
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} t={t} />
      ))}
    </div>
  );
}

// 🎯 单个文章卡片
function ArticleCard({ article, t }: { article: (typeof articles)[number]; t: (key: TranslationKey) => string }) {
  return (
    <div className="w-full cursor-pointer">
      <Link to={`/post/${article.id}`}>
        <div
          className={clsx(
            "h-56 w-full rounded-xl",
            "border border-zinc-100 dark:border-zinc-800",
            "bg-white bg-cover p-6",
            "duration-300 hover:shadow-xl",
            "hover:shadow-zinc-200 dark:hover:shadow-zinc-900",
            "sm:h-72 sm:p-12",
          )}
          style={{ backgroundImage: `url(/posts/${article.image_url})` }}
        />
        <div
          className={clsx(
            "flex w-full flex-col items-start",
            "space-y-1 pt-2",
            "sm:space-y-2 sm:pt-4",
          )}
        >
          <h2 className="font-sans text-xl font-medium sm:text-2xl">
            {t(article.titleKey as TranslationKey)}
          </h2>
          <h3 className="text-lg font-light sm:text-xl">{t(article.subtitleKey as TranslationKey)}</h3>
        </div>
      </Link>
    </div>
  );
}
