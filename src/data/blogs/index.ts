/// <reference types="vite/client" />
import { BlogPost } from './types';

export * from './types';

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fmMatch) return { data: {}, content: raw };
  const yamlBlock = fmMatch[1];
  const content = fmMatch[2] ?? '';
  const data: Record<string, unknown> = {};
  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx < 1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rawVal = line.slice(colonIdx + 1).trim();
    if (!rawVal) continue;
    if (rawVal.startsWith('[')) {
      try { data[key] = JSON.parse(rawVal.replace(/'/g, '"')); } catch { data[key] = []; }
    } else {
      data[key] = rawVal.replace(/^['"]|['"]$/g, '');
    }
  }
  return { data, content };
}

// Eagerly glob all individual .mdx files from /data/blog/*.mdx
const mdxModules = import.meta.glob('/data/blog/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

let idCounter = 1;
export const allBlogPosts: BlogPost[] = Object.entries(mdxModules).map(([filePath, rawContent]) => {
  const { data, content } = parseFrontmatter(rawContent);
  const slug = filePath.split('/').pop()?.replace(/\.mdx?$/, '') || '';

  return {
    id: idCounter++,
    slug,
    title: data.title || '',
    category: data.category || 'Engineering',
    readTime: data.readTime || '8 min read',
    publishedAt: data.publishedAt || '2026-09-01',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    seoKeywords: data.seoKeywords || [],
    image: data.image || '/images/forward-deployed-services.svg',
    content: content.trim(),
  };
});

// Sort chronologically descending
export const blogPosts: BlogPost[] = allBlogPosts.sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
