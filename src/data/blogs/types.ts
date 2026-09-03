export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  seoKeywords: string[];
  image: string;
  content: string;
}
