import { useEffect, useState } from 'react';
import data from './work.json';

type Discipline = 'full-stack' | 'ml' | 'automation' | 'security';
export type Project = {
  slug: string;
  name: string;
  kind: 'product' | 'repo';
  discipline: Discipline;
  date: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  live?: string;
  repo?: string;
  image?: string;
  glyph?: string;
  services: string[];
  keywords: string[];
};

export const projects = data.projects as Project[];
export const products = projects.filter((project) => project.kind === 'product');
export const repos = projects.filter((project) => project.kind === 'repo');
export const projectBySlug = (slug?: string) => projects.find((project) => project.slug === slug);
export const projectPath = (slug: string) => `/work/${slug}`;

/** Service slugs and display names, mirrored from the services pages. */
export const SERVICE_NAMES: Record<string, string> = {
  'forward-deployed-engineer': 'Forward Deployed Engineering',
  'applied-ai-consulting': 'Applied AI Consulting',
  'ai-agent-development': 'AI Agent and RAG Development',
  'n8n-automation-consultant': 'AI Automations & n8n',
  'full-stack-software-development': 'Full-Stack Software Development',
};

export const DISCIPLINE_LABEL: Record<Discipline, string> = {
  'full-stack': 'Full-stack',
  ml: 'Applied ML',
  automation: 'Automation',
  security: 'Security',
};

export const projectsForService = (serviceSlug: string) => projects.filter((project) => project.services.includes(serviceSlug));

/** Other work that shares a service or a discipline, closest first. */
export function relatedProjects(project: Project, limit = 3) {
  return projects
    .filter((other) => other.slug !== project.slug)
    .map((other) => ({
      other,
      score: other.services.filter((service) => project.services.includes(service)).length * 2 + (other.discipline === project.discipline ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ other }) => other);
}

export type Post = { title: string; summary?: string; tags?: string[]; date: string; slug: string };

/** Blog posts that match a set of keywords, read lazily from /search.json. */
export function useRelatedPosts(keywords: string[], limit = 3) {
  const [posts, setPosts] = useState<Post[]>([]);
  const key = keywords.join('|');
  useEffect(() => {
    let cancelled = false;
    fetch('/search.json')
      .then((response) => (response.ok ? response.json() : []))
      .then((items: Post[]) => {
        if (cancelled || !Array.isArray(items)) return;
        const words = key.split('|').map((word) => word.toLowerCase()).filter(Boolean);
        const scored = items
          .map((post) => {
            const haystack = `${post.title} ${post.summary ?? ''} ${(post.tags ?? []).join(' ')}`.toLowerCase();
            return { post, score: words.reduce((sum, word) => sum + (haystack.includes(word) ? 1 : 0), 0) };
          })
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date));
        setPosts(scored.slice(0, limit).map(({ post }) => post));
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [key, limit]);
  return posts;
}
