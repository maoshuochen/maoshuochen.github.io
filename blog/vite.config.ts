import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // 让 Vite 打包 .webp
  assetsInclude: ["**/*.webp"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  build: {
    // 代码分割优化
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          markdown: ['react-markdown', 'remark-parse', 'remark-gfm', 'remark-rehype', 'rehype-raw', 'rehype-slug', 'rehype-autolink-headings', 'rehype-stringify'],
          ui: ['@radix-ui/react-icons', '@radix-ui/react-navigation-menu', '@radix-ui/react-slot', 'lucide-react', 'class-variance-authority'],
        },
      },
    },
    // 生成 sourcemap 用于分析
    sourcemap: false,
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
