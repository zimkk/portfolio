import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const siteUrl = 'https://hassannazir.dev';
const distDir = path.resolve('dist');
const publicDir = path.resolve('public');
const blogDir = path.resolve('data/blog');
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

// Dynamically load all .mdx files from data/blog/
const mdxFiles = (await readdir(blogDir)).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

const articles = [];
for (const file of mdxFiles) {
  const filePath = path.join(blogDir, file);
  const rawContent = await readFile(filePath, 'utf8');
  const { data } = matter(rawContent);
  const slug = file.replace(/\.mdx?$/, '');

  articles.push({
    slug,
    title: data.title || slug,
    description: data.excerpt || '',
    published: data.publishedAt || '2026-09-01',
    category: data.category || 'Engineering',
    tags: data.tags || [],
    image: data.image || '/images/forward-deployed-services.svg',
  });
}

// Sort newest first
articles.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

const services = [
  {
    slug: 'forward-deployed-engineer',
    image: '/images/forward-deployed-services.svg',
    title: 'Forward Deployed Engineer for Applied AI and Software Delivery | Hassan Nazir',
    description: 'Hire a Forward Deployed Engineer who embeds with your team, turns unclear operational requirements into working software, integrates it, and owns the path to production.',
    heading: 'Put an engineer where the ambiguity lives.',
    serviceType: 'Forward Deployed Engineering',
  },
  {
    slug: 'applied-ai-consulting',
    image: '/images/ai-automation.svg',
    title: 'Applied AI Consulting for Production Systems | Hassan Nazir',
    description: 'Applied AI consulting for US and European teams that need working LLM applications, document intelligence, automation, evaluation, and production infrastructure.',
    heading: 'Move the AI work from promising to operational.',
    serviceType: 'Applied AI Consulting',
  },
  {
    slug: 'ai-agent-development',
    image: '/images/cloud.svg',
    title: 'AI Agent Development and RAG Engineering Services | Hassan Nazir',
    description: 'Production AI agent and RAG development using LangGraph, model tools, vector search, evaluation, durable jobs, observability, and full-stack product engineering.',
    heading: 'Agents need an operating system, not another demo.',
    serviceType: 'AI Agent and RAG Development',
  },
  {
    slug: 'n8n-automation-consultant',
    image: '/images/projects/n8nhub.webp',
    title: 'AI Automations & n8n Workflow Consulting | Hassan Nazir',
    description: 'n8n automation consulting and AI workflows, API integrations, data pipelines, lead operations, document processing, and self-hosted production delivery.',
    heading: 'Automate the operation, not just the happy path.',
    serviceType: 'AI Automations & n8n Consulting',
  },
  {
    slug: 'full-stack-software-development',
    image: '/images/projects/wonderkit.webp',
    title: 'Full-Stack Software Development & Custom AI Systems | Hassan Nazir',
    description: 'Full-stack software development and custom AI application engineering with TypeScript, React, Next.js, Python, FastAPI, PostgreSQL, and cloud infrastructure.',
    heading: 'Engineered for production from database to interface.',
    serviceType: 'Full-Stack Software Development',
  },
];

const routes = [
  {
    route: '/services',
    image: '/images/forward-deployed-services.svg',
    title: 'Forward Deployed Engineering and Applied AI Services | Hassan Nazir',
    description: 'Engineering services for US and European teams that need applied AI, agents, RAG, n8n automation, and production software delivered through real operational constraints.',
    type: 'CollectionPage',
    heading: 'Technical delivery where strategy usually breaks.',
    summary: 'Forward deployed engineering, applied AI consulting, AI agent and RAG development, and reliable n8n automation for US, European, and distributed teams.',
  },
  ...services.map((service) => ({
    route: `/services/${service.slug}`,
    title: service.title,
    description: service.description,
    type: 'Service',
    heading: service.heading,
    summary: service.description,
    serviceType: service.serviceType,
    image: service.image,
  })),
  {
    route: '/work',
    title: 'Applied AI & Software Engineering Blogs | Hassan Nazir',
    description: 'Technical blogs, deep dives, and production architectures by Forward Deployed Engineer Hassan Nazir.',
    type: 'CollectionPage',
    heading: 'Applied AI & software engineering blogs.',
    summary: 'Technical guides and production architectures on AI automations, agentic systems, security, and full-stack software development.',
  },
  {
    route: '/blogs',
    title: 'Applied AI & Software Engineering Blogs | Hassan Nazir',
    description: 'Technical blogs and deep dives by Hassan Nazir about agentic AI, LLM systems, computer vision, security architecture, and production engineering.',
    type: 'CollectionPage',
    heading: 'Applied AI and software engineering blogs.',
    summary: 'Long-form technical guides and production architectures about AI agents, model systems, security architecture, computer vision, deep learning, and production delivery.',
  },
  ...articles.map((article) => ({
    route: `/blogs/${article.slug}`,
    title: `${article.title} | Hassan Nazir`,
    description: article.description,
    type: 'BlogPosting',
    heading: article.title,
    summary: article.description,
    published: article.published,
    image: article.image,
  })),
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const replaceMeta = (html, selector, value) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(`(<meta ${escapedSelector} content=")[^"]*("[^>]*>)`);
  return html.replace(expression, `$1${escapeHtml(value)}$2`);
};

for (const route of routes) {
  const canonical = `${siteUrl}${route.route}`;
  const schema = route.type === 'BlogPosting'
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: route.heading,
        description: route.description,
        url: canonical,
        mainEntityOfPage: canonical,
        datePublished: `${route.published}T00:00:00Z`,
        dateModified: `${route.published}T00:00:00Z`,
        author: { '@type': 'Person', '@id': `${siteUrl}/#hassan-nazir`, name: 'Hassan Nazir' },
      }
    : route.type === 'Service'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: route.serviceType,
          serviceType: route.serviceType,
          description: route.description,
          url: canonical,
          provider: { '@type': 'Person', '@id': `${siteUrl}/#hassan-nazir`, name: 'Hassan Nazir' },
          areaServed: [
            { '@type': 'Country', name: 'United States', identifier: 'US' },
            { '@type': 'Place', name: 'North America' },
            { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' },
            { '@type': 'Place', name: 'European Union' },
            { '@type': 'Place', name: 'Worldwide' },
          ],
        }
      : {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: route.title,
        description: route.description,
        url: canonical,
        inLanguage: 'en',
        author: { '@type': 'Person', '@id': `${siteUrl}/#hassan-nazir`, name: 'Hassan Nazir' },
      };

  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*("[^>]*>)/, `$1${canonical}$2`)
    .replace(/<script type="application\/ld\+json" data-rh="true">[\s\S]*?<\/script>/, `<script type="application/ld+json" data-rh="true">${JSON.stringify(schema)}</script>`)
    .replace(/<main class="crawler-fallback">[\s\S]*?<\/main>/, `<main class="crawler-fallback"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.summary)}</p><p>Written and maintained by <a href="${siteUrl}">Hassan Nazir</a>, Forward Deployed Engineer and Applied AI practitioner.</p><nav aria-label="Site index"><a href="/">Portfolio</a> · <a href="/services">Services</a> · <a href="/blogs">Blogs</a> · <a href="/llms.txt">AI-readable index</a></nav></main>`);

  html = route.image
    ? html.replace('/images/profile-hero.webp', route.image)
    : html.replace(/\s*<link rel="preload" as="image" href="\/images\/profile-hero\.webp" fetchpriority="high" \/>/, '');

  html = replaceMeta(html, 'name="description"', route.description);
  html = replaceMeta(html, 'property="og:type"', route.type === 'BlogPosting' ? 'article' : 'website');
  html = replaceMeta(html, 'property="og:url"', canonical);
  html = replaceMeta(html, 'property="og:title"', route.title);
  html = replaceMeta(html, 'property="og:description"', route.description);
  html = replaceMeta(html, 'name="twitter:title"', route.title);
  html = replaceMeta(html, 'name="twitter:description"', route.description);

  const outputDir = path.join(distDir, route.route.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html);
  await writeFile(path.join(distDir, `${route.route.slice(1)}.html`), html);
}

// 1. Generate search.json
const searchIndex = articles.map((a) => ({
  title: a.title,
  summary: a.description,
  tags: a.tags,
  date: a.published,
  slug: a.slug,
  url: `/blogs/${a.slug}`,
}));
const searchJsonStr = JSON.stringify(searchIndex, null, 2);
await writeFile(path.join(publicDir, 'search.json'), searchJsonStr);
await writeFile(path.join(distDir, 'search.json'), searchJsonStr);

// 2. Generate tag-data.json
const tagCounts = {};
articles.forEach((a) => {
  a.tags.forEach((t) => {
    const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    tagCounts[slug] = (tagCounts[slug] || 0) + 1;
  });
});
const tagJsonStr = JSON.stringify(tagCounts, null, 2);
await writeFile(path.join(publicDir, 'tag-data.json'), tagJsonStr);
await writeFile(path.join(distDir, 'tag-data.json'), tagJsonStr);

// 3. Generate feed.xml (RSS 2.0 Feed), atom.xml, and feed.json (JSON Feed 1.1)
const nowUtc = new Date().toUTCString();

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Hassan Nazir — Engineering &amp; Applied AI Blogs</title>
    <link>${siteUrl}/blogs</link>
    <description>Technical field guides, production architectures, and deep dives on Forward Deployed Engineering, AI automations, agentic systems, security, and full-stack software development.</description>
    <language>en-US</language>
    <lastBuildDate>${nowUtc}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <docs>https://www.rssboard.org/rss-specification</docs>
    ${articles.map((a) => `
    <item>
      <title>${escapeHtml(a.title)}</title>
      <link>${siteUrl}/blogs/${a.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blogs/${a.slug}</guid>
      <pubDate>${new Date(a.published).toUTCString()}</pubDate>
      <dc:creator>Hassan Nazir</dc:creator>
      <description>${escapeHtml(a.description)}</description>
      <category>${escapeHtml(a.category)}</category>
      ${(a.tags || []).map((t) => `<category>${escapeHtml(t)}</category>`).join('\n      ')}
      ${a.image ? `<media:content url="${siteUrl}${a.image}" medium="image" />` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Hassan Nazir — Engineering &amp; Applied AI Blogs</title>
  <subtitle>Technical field guides, production architectures, and deep dives on Forward Deployed Engineering, AI automations, agentic systems, security, and full-stack software development.</subtitle>
  <link href="${siteUrl}/blogs" />
  <link href="${siteUrl}/atom.xml" rel="self" type="application/atom+xml" />
  <updated>${new Date().toISOString()}</updated>
  <id>${siteUrl}/blogs</id>
  <author>
    <name>Hassan Nazir</name>
    <email>hassannazir955@gmail.com</email>
    <uri>${siteUrl}</uri>
  </author>
  ${articles.map((a) => `
  <entry>
    <title>${escapeHtml(a.title)}</title>
    <link href="${siteUrl}/blogs/${a.slug}" />
    <id>${siteUrl}/blogs/${a.slug}</id>
    <updated>${new Date(a.published).toISOString()}</updated>
    <summary>${escapeHtml(a.description)}</summary>
    <category term="${escapeHtml(a.category)}" />
  </entry>`).join('')}
</feed>`;

const jsonFeed = {
  version: 'https://jsonfeed.org/version/1.1',
  title: 'Hassan Nazir — Engineering & Applied AI Blogs',
  home_page_url: `${siteUrl}/blogs`,
  feed_url: `${siteUrl}/feed.json`,
  description: 'Technical field guides and production architectures on Forward Deployed Engineering, AI automations, agentic systems, security, and full-stack software development.',
  authors: [
    {
      name: 'Hassan Nazir',
      url: siteUrl,
      avatar: `${siteUrl}/images/profile.png`,
    },
  ],
  items: articles.map((a) => ({
    id: `${siteUrl}/blogs/${a.slug}`,
    url: `${siteUrl}/blogs/${a.slug}`,
    title: a.title,
    summary: a.description,
    date_published: `${a.published}T00:00:00Z`,
    tags: a.tags,
    image: a.image ? `${siteUrl}${a.image}` : undefined,
  })),
};

await writeFile(path.join(publicDir, 'feed.xml'), rssFeed.trim());
await writeFile(path.join(distDir, 'feed.xml'), rssFeed.trim());

await writeFile(path.join(publicDir, 'atom.xml'), atomFeed.trim());
await writeFile(path.join(distDir, 'atom.xml'), atomFeed.trim());

await writeFile(path.join(publicDir, 'feed.json'), JSON.stringify(jsonFeed, null, 2));
await writeFile(path.join(distDir, 'feed.json'), JSON.stringify(jsonFeed, null, 2));

// 4. Generate sitemap.xml
const sitemapUrls = [
  { loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${siteUrl}/services`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${siteUrl}/blogs`, changefreq: 'daily', priority: '0.9' },
  ...services.map((s) => ({ loc: `${siteUrl}/services/${s.slug}`, changefreq: 'monthly', priority: '0.8' })),
  ...articles.map((a) => ({ loc: `${siteUrl}/blogs/${a.slug}`, changefreq: 'monthly', priority: '0.8', lastmod: a.published })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls.map((u) => `
  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('')}
</urlset>`;
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml.trim());
await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml.trim());

console.log(`Generated ${routes.length} crawler-first route shells from dynamic .mdx files.`);
console.log(`Generated search.json, tag-data.json, feed.xml, and sitemap.xml successfully.`);
