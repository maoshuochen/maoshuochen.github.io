# 陈茂烁的作品集

个人作品集网站：[maoshuochen.github.io](https://maoshuochen.github.io/)。展示产品设计、用户研究、交互设计与工业设计项目，并提供中英文内容和明暗主题切换。

## 技术栈

- React、TypeScript、Vite
- Tailwind CSS
- React Router 与 Markdown 项目详情页
- GitHub Pages 托管

## 本地运行

需要 Node.js 和 npm。在仓库根目录执行：

```bash
cd blog
npm ci
npm run dev
```

常用检查命令：

```bash
npm run lint
npm run build
npm run preview
```

## 内容位置

- `blog/src/data.tsx`：首页项目列表、顺序和封面路径
- `blog/src/i18n/translations.ts`：界面与项目卡片的中英文文案
- `blog/public/posts/`：项目的 Markdown 正文、图片和视频
- `blog/src/pages/`：首页、关于页和项目详情页

添加项目时，在 `blog/public/posts/` 下放置内容与资源，再更新 `blog/src/data.tsx` 和对应的中英文文案。

## 发布

网站使用 GitHub Pages 的 `gh-pages` 分支。确认本地构建通过后，在 `blog` 目录运行：

```bash
npm run deploy
```

该命令先构建网站，再将 `blog/dist` 发布到 `gh-pages` 分支。发布后可访问[线上网站](https://maoshuochen.github.io/)。
