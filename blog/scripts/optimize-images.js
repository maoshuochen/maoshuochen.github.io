#!/usr/bin/env node
/**
 * 图片优化脚本
 * 压缩所有 JPG/PNG 图片，减小文件大小
 * 需要安装：npm install -D sharp
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const POSTS_DIR = './public/posts';
const QUALITY = 75; // JPEG 质量 (60-85 推荐)
const MAX_WIDTH = 1920; // 最大宽度

async function optimizeImage(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const originalSize = (await stat(filePath)).size;

    // 跳过已经优化的图片
    if (metadata.format === 'webp') return;

    let pipeline = sharp(filePath);

    // 调整大小（如果太大）
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // 转换为 WebP 格式
    const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    if (metadata.format === 'png') {
      pipeline = pipeline.webp({ quality: QUALITY, lossless: false });
    } else {
      pipeline = pipeline.webp({ quality: QUALITY });
    }

    await pipeline.toFile(outputPath);
    const newSize = (await stat(outputPath)).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${filePath} → ${outputPath}`);
    console.log(`  ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (-${savings}%)`);

    // 可选：删除原文件
    // await unlink(filePath);

  } catch (error) {
    console.error(`✗ ${filePath}: ${error.message}`);
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  console.log('🚀 开始优化图片...\n');
  await processDirectory(POSTS_DIR);
  console.log('\n✅ 优化完成！');
}

main();
