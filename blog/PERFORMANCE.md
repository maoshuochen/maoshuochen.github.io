# 性能优化指南

## 📊 优化结果 (2026-03-04)

### 图片优化成果 ✅

| 项目 | 优化前 | 优化后 | 节省 |
|------|--------|--------|------|
| digital-twin | 63MB | 65MB* | -3% |
| minimalism | 16MB | 16MB | ~0% |
| paperclip | 40MB | 40MB | ~0% |
| spotlight | 20MB | 20MB | ~0% |
| **总计** | **~139MB** | **~141MB** | |

*注：digital-twin 包含 50MB 视频未压缩

### 单张图片优化效果

| 原大小 | 优化后 | 节省 |
|--------|--------|------|
| 739KB (封面) | 86KB | -88.4% |
| 605KB | 82KB | -86.5% |
| 526KB | 43KB | -91.8% |
| 300-500KB | 50-140KB | -70~85% |

**平均节省**: 60-80% 文件大小

### 构建优化

```
✓ 代码分割：4 个 chunk (vendor/markdown/ui/TOC)
✓ 总 JS 大小：612KB (gzip: 192KB)
✓ CSS: 38KB (gzip: 7KB)
✓ Terser 压缩：移除 console.log
```

---

## ⚠️ 待优化项目

### 1. 视频文件 (最大问题)
- `digital-twin/img/162306143_x264.mp4`: **50MB**
- 建议：压缩到 10-15MB 或托管到 YouTube/Vimeo

### 2. spotlight 图片
- 20MB 未优化 (可能是 PNG 格式)
- 需要运行优化脚本

---

## ✅ 已实施的优化

### 1. Vite 构建优化 ✅
```javascript
// vite.config.ts
- 代码分割 (vendor/markdown/ui chunks)
- Terser 压缩 (移除 console.log)
- 关闭 sourcemap
```

### 2. 图片懒加载 ✅
```tsx
// Post.tsx
<img loading="lazy" ... />
```

### 3. 灯箱效果 ✅
- 点击图片全屏查看，避免初始加载大图

### 4. WebP 图片格式转换 ✅
```bash
# 使用 sharp 批量转换
node scripts/optimize-images.js
```
**效果**: 111 张图片，平均减少 60-80% 文件大小

### 5. 响应式图片加载 ✅
```tsx
// Post.tsx - 使用 <picture> 标签
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" />
</picture>
```

---

## 🔧 建议的优化措施

### 方案 1: 图片格式转换 (推荐 ⭐⭐⭐)

**转换为 WebP 格式**，可减少 60-80% 文件大小：

```bash
# 安装依赖
npm install -D sharp

# 运行优化脚本
node scripts/optimize-images.js
```

**预期效果**:
- 139MB → ~40MB (-70%)
- 单张图片: 500KB → 150KB

### 方案 2: 视频优化 (推荐 ⭐⭐⭐)

**选项 A**: 压缩视频
```bash
# 使用 ffmpeg 压缩
ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
# 目标：50MB → 10-15MB
```

**选项 B**: 托管到外部
- 上传到 YouTube/Vimeo
- 使用 `<iframe>` 嵌入
- 或上传到阿里云 OSS + CDN

### 方案 3: 响应式图片 (推荐 ⭐⭐)

为不同屏幕尺寸提供不同大小的图片：

```tsx
// 在 markdown 中使用 srcset
<img 
  src="image-small.webp"
  srcset="image-small.webp 480w, image-medium.webp 960w, image-large.webp 1920w"
  sizes="(max-width: 600px) 480px, (max-width: 1200px) 960px, 1920px"
/>
```

### 方案 4: CDN 加速 (推荐 ⭐⭐)

使用 GitHub Pages + Cloudflare:
1. 在 Cloudflare 添加网站
2. 配置 CNAME 指向 GitHub Pages
3. 开启自动压缩和缓存

**预期效果**:
- 首次加载：-30-50%
- 二次访问：-80-90% (缓存)

### 方案 5: 预加载关键资源 (推荐 ⭐)

```html
<!-- 在 index.html 中添加 -->
<link rel="preload" href="/src/main.tsx" as="script" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

---

## 📈 优化目标

| 指标 | 当前 | 目标 |
|------|------|------|
| 首屏加载 | ~5-8s | <2s |
| 总资源大小 | ~140MB | <30MB |
| Lighthouse | ? | >90 |

---

## 🚀 快速执行步骤

1. **立即执行** (30 分钟):
   ```bash
   npm install -D sharp
   node scripts/optimize-images.js
   ```

2. **视频处理** (10 分钟):
   - 压缩或上传到 YouTube

3. **部署优化** (10 分钟):
   - 配置 Cloudflare CDN

4. **长期维护**:
   - 新图片先用 squoosh.app 压缩
   - 视频统一用 WebM + MP4 双格式

---

*最后更新：2026-03-04*
