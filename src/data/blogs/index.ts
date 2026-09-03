/// <reference types="vite/client" />
import matter from 'gray-matter';
import { BlogPost } from './types';

export * from './types';

// Eagerly glob all 40 individual .mdx files from /data/blog/*.mdx
const mdxModules = import.meta.glob('/data/blog/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

let idCounter = 1;
export const allBlogPosts: BlogPost[] = Object.entries(mdxModules).map(([filePath, rawContent]) => {
  const { data, content } = matter(rawContent);
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
