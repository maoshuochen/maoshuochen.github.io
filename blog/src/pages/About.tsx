import clsx from "clsx";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 pt-4 sm:px-0">
      <div className="w-full p-4 sm:w-3/4 sm:p-8">
        {/* 基本信息 */}
        <div className="mb-8">
          <h1
            className={clsx(
              "py-8 font-sans text-2xl font-medium",
              "sm:py-12 sm:text-4xl/relaxed",
            )}
          >
            {t('aboutTitle')}
          </h1>
          <p className="font-medium text-lg">{t('name')}</p>
          <div className="text-zinc-600 dark:text-zinc-400">
            <p>{t('education')} | {t('age')}</p>
            <p>📧 maoshuochen@qq.com</p>
            <p>📱 18916265983</p>
          </div>
        </div>

        {/* 自我介绍 */}
        <div className="mb-8">
          <h2 className="mb-2 font-medium text-zinc-800 dark:text-zinc-200">
            {t('selfIntroTitle')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {t('selfIntroText')}
          </p>
        </div>

        {/* 教育经历 */}
        <div className="mb-8">
          <h2 className="mb-4 font-medium text-zinc-800 dark:text-zinc-200">
            {t('educationTitle')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="pb-2 text-left font-medium">{t('school')}</th>
                  <th className="pb-2 text-left font-medium">{t('degree')}</th>
                  <th className="pb-2 text-left font-medium">{t('major')}</th>
                  <th className="pb-2 text-left font-medium">{t('time')}</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600 dark:text-zinc-400">
                <tr className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-2">{t('tongjiMaster')}</td>
                  <td className="py-2">{t('master')}</td>
                  <td className="py-2">{t('interactionDesign')}</td>
                  <td className="py-2">2020.09-2023.06</td>
                </tr>
                <tr>
                  <td className="py-2">{t('tongjiBachelor')}</td>
                  <td className="py-2">{t('bachelor')}</td>
                  <td className="py-2">{t('industrialDesign')}</td>
                  <td className="py-2">2016.09-2020.06</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 工作经历 */}
        <div className="mb-8">
          <h2 className="mb-4 font-medium text-zinc-800 dark:text-zinc-200">
            {t('workTitle')}
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">{t('alibaba')}</p>
              <p className="text-sm text-zinc-500">{t('workPeriod')}</p>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  {t('work1Title')}
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
                  <li>
                    <span className="font-medium">{t('work1Item1')}</span>
                    {t('work1Item1Text')}
                  </li>
                  <li>
                    <span className="font-medium">{t('work1Item2')}</span>
                    {t('work1Item2Text')}
                  </li>
                  <li>
                    <span className="font-medium">{t('work1Item3')}</span>
                    {t('work1Item3Text')}
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  {t('work2Title')}
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
                  <li>
                    <span className="font-medium">{t('work2Item1')}</span>
                    {t('work2Item1Text')}
                  </li>
                  <li>
                    <span className="font-medium">{t('work2Item2')}</span>
                    {t('work2Item2Text')}
                  </li>
                  <li>
                    <span className="font-medium">{t('work2Item3')}</span>
                    {t('work2Item3Text')}
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                  {t('work3Title')}
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
                  <li>
                    <span className="font-medium">{t('work3Item1')}</span>
                    {t('work3Item1Text')}
                  </li>
                  <li>
                    <span className="font-medium">{t('work3Item2')}</span>
                    {t('work3Item2Text')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 关于 AI */}
        <div className="mb-8">
          <h2 className="mb-2 font-medium text-zinc-800 dark:text-zinc-200">
            {t('aiTitle')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {t('aiText1')}
          </p>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {t('aiText2')}
          </p>
        </div>
      </div>
    </div>
  );
}
