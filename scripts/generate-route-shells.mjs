import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const siteUrl = 'https://hassannazir.dev';
const distDir = path.resolve('dist');
const publicDir = path.resolve('public');
const blogDir = path.resolve('data/blog');
let template = await readFile(path.join(distDir, 'index.html'), 'utf8');

// Transform render-blocking stylesheet into asynchronous preloaded stylesheet with noscript fallback
template = template.replace(
  /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/[^"]+\.css)">/g,
  '<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" href="$1"></noscript>'
);
await writeFile(path.join(distDir, 'index.html'), template);

// Dynamically load all .mdx files from data/blog/
const mdxFiles = (await readdir(blogDir)).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

const articles = [];
for (const file of mdxFiles) {
  const filePath = path.join(blogDir, file);
  const rawContent = await readFile(filePath, 'utf8');
  const { data, content } = matter(rawContent);
  const slug = file.replace(/\.mdx?$/, '');

  articles.push({
    slug,
    title: data.title || slug,
    seoTitle: data.seoTitle || data.title || slug,
    description: data.excerpt || '',
    published: data.publishedAt || '2026-09-01',
    updated: data.lastUpdated || data.publishedAt || '2026-09-01',
    category: data.category || 'Engineering',
    tags: data.tags || [],
    image: data.image || '/images/forward-deployed-services.svg',
    content: content || '',
  });
}

// Sort newest first
articles.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

const services = [
  {
    slug: 'forward-deployed-engineer',
    image: '/images/forward-deployed-services.svg',
    title: 'Forward Deployed Engineer for Applied AI | Hassan Nazir',
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
    image: '/images/projects/the-home-club.webp',
    title: 'Full-Stack Software Development & AI Systems | Hassan Nazir',
    description: 'Full-stack software development and custom AI application engineering with TypeScript, React, Next.js, Python, FastAPI, PostgreSQL, and cloud infrastructure.',
    heading: 'Engineered for production from database to interface.',
    serviceType: 'Full-Stack Software Development',
  },
];

// Internal-link graph for crawlers: every article and service page links to related
// field notes so no URL depends on the /blogs index alone to be discovered.
const serviceCategories = {
  'forward-deployed-engineer': ['Forward Deployed Engineering'],
  'applied-ai-consulting': ['Artificial Intelligence', 'AI News', 'Reasoning Models', 'Structured Outputs', 'Model Fine-Tuning', 'Edge & Local AI', 'Deep Learning'],
  'ai-agent-development': ['AI Agents', 'RAG & Vector Search', 'Agentic Memory', 'Model Context Protocol', 'Browser & UI Agents', 'AI Code Generation'],
  'n8n-automation-consultant': ['n8n & AI Automations'],
  'full-stack-software-development': ['Full-Stack Software Development', 'Infrastructure & Caching', 'Distributed Systems', 'Security Engineering'],
};

function relatedArticles(article, limit = 4) {
  const tags = new Set(article.tags.map((t) => t.toLowerCase()));
  return articles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score: (a.category === article.category ? 3 : 0) + a.tags.filter((t) => tags.has(t.toLowerCase())).length * 2,
    }))
    .sort((x, y) => y.score - x.score || new Date(y.a.published).getTime() - new Date(x.a.published).getTime())
    .slice(0, limit)
    .map(({ a }) => a);
}

function articlesForService(slug, limit = 6) {
  const categories = serviceCategories[slug] || [];
  const matches = articles.filter((a) => categories.includes(a.category));
  return (matches.length ? matches : articles).slice(0, limit);
}

const articleLinkList = (items) => `
        <ul>
          ${items.map((a) => `<li><a href="/blogs/${a.slug}">${escapeHtml(a.title)}</a></li>`).join('\n          ')}
        </ul>`;

// Search engines flag <title> over ~65 chars; add the name suffix only when it fits.
function documentTitle(title) {
  const branded = `${title} | Hassan Nazir`;
  return branded.length <= 65 ? branded : title;
}

const routes = [
  {
    route: '/services',
    image: '/images/forward-deployed-services.svg',
    title: 'Forward Deployed Engineering & AI Services | Hassan Nazir',
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
    route: '/blogs',
    title: 'Applied AI & Software Engineering Blogs | Hassan Nazir',
    description: 'Technical blogs and deep dives by Hassan Nazir about agentic AI, LLM systems, computer vision, security architecture, and production engineering.',
    type: 'CollectionPage',
    heading: 'Applied AI and software engineering blogs.',
    summary: 'Long-form technical guides and production architectures about AI agents, model systems, security architecture, computer vision, deep learning, and production delivery.',
  },
  ...articles.map((article) => ({
    route: `/blogs/${article.slug}`,
    title: documentTitle(article.seoTitle),
    socialTitle: article.title,
    description: article.description,
    type: 'BlogPosting',
    heading: article.title,
    summary: article.description,
    published: article.published,
    updated: article.updated,
    category: article.category,
    article,
    image: article.image,
    content: article.content,
  })),
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function markdownToHtml(markdown) {
  if (!markdown) return '';

  const lines = markdown.split(/\r?\n/);
  const htmlParts = [];
  let inCodeBlock = false;
  let codeLang = '';
  let codeLines = [];
  let inTable = false;
  let tableRows = [];
  let inList = false;
  let listType = 'ul';
  let listItems = [];
  let inBlockquote = false;
  let blockquoteLines = [];

  function formatInline(str) {
    if (!str) return '';
    let res = escapeHtml(str);
    res = res.replace(/`([^`]+)`/g, '<code>$1</code>');
    res = res.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    res = res.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    res = res.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    res = res.replace(/_([^_]+)_/g, '<em>$1</em>');
    res = res.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return res;
  }

  function flushList() {
    if (inList) {
      const itemsHtml = listItems.map((li) => `<li>${formatInline(li)}</li>`).join('');
      htmlParts.push(`<${listType}>${itemsHtml}</${listType}>`);
      inList = false;
      listItems = [];
    }
  }

  function flushBlockquote() {
    if (inBlockquote) {
      const bqText = blockquoteLines.map((l) => formatInline(l)).join('<br>');
      htmlParts.push(`<blockquote><p>${bqText}</p></blockquote>`);
      inBlockquote = false;
      blockquoteLines = [];
    }
  }

  function flushTable() {
    if (inTable && tableRows.length > 0) {
      let tHtml = '<table><thead>';
      const headerCells = tableRows[0];
      tHtml += `<tr>${headerCells.map((c) => `<th>${formatInline(c.trim())}</th>`).join('')}</tr></thead><tbody>`;
      for (let i = 1; i < tableRows.length; i++) {
        tHtml += `<tr>${tableRows[i].map((c) => `<td>${formatInline(c.trim())}</td>`).join('')}</tr>`;
      }
      tHtml += '</tbody></table>';
      htmlParts.push(tHtml);
      inTable = false;
      tableRows = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        const codeContent = escapeHtml(codeLines.join('\n'));
        const langClass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : '';
        htmlParts.push(`<pre><code${langClass}>${codeContent}</code></pre>`);
        inCodeBlock = false;
        codeLines = [];
        codeLang = '';
        continue;
      } else {
        flushList();
        flushBlockquote();
        flushTable();
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim().split(/[:\s]/)[0];
        codeLines = [];
        continue;
      }
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushBlockquote();
      flushTable();
      continue;
    }

    if (trimmed.startsWith('>')) {
      flushList();
      flushTable();
      inBlockquote = true;
      blockquoteLines.push(trimmed.replace(/^>\s?/, ''));
      continue;
    } else {
      flushBlockquote();
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        continue;
      }
      flushList();
      const cells = trimmed.slice(1, -1).split('|');
      if (!inTable) {
        inTable = true;
        tableRows = [cells];
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      flushList();
      const level = trimmed.match(/^(#{1,6})/)[0].length;
      const text = trimmed.replace(/^#{1,6}\s+/, '');
      htmlParts.push(`<h${level}>${formatInline(text)}</h${level}>`);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
      continue;
    }

    flushList();
    htmlParts.push(`<p>${formatInline(trimmed)}</p>`);
  }

  flushList();
  flushBlockquote();
  flushTable();

  return htmlParts.join('\n');
}

// Search results truncate descriptions around 155-160 characters; cut at a word boundary.
const metaDescription = (text) => {
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:\s]+$/, '')}...`;
};

const replaceMeta = (html, selector, value) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(`(<meta ${escapedSelector} content=")[^"]*("[^>]*>)`);
  return html.replace(expression, (_match, p1, p2) => `${p1}${escapeHtml(value)}${p2}`);
};

for (const route of routes) {
  const canonical = `${siteUrl}${route.route}`;
  const ogKey = route.type === 'BlogPosting' ? route.article.slug
    : route.type === 'Service' ? `service-${route.route.split('/').pop()}`
    : route.route.slice(1);
  const ogImage = `${siteUrl}/images/og/${ogKey}.jpg`;
  const schema = route.type === 'BlogPosting'
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: route.heading,
        description: route.description,
        url: canonical,
        mainEntityOfPage: canonical,
        datePublished: `${route.published}T00:00:00Z`,
        dateModified: `${route.updated || route.published}T00:00:00Z`,
        image: [ogImage],
        inLanguage: 'en',
        articleSection: route.category,
        keywords: route.article.tags.join(', '),
        author: { '@type': 'Person', '@id': `${siteUrl}/#hassan-nazir`, name: 'Hassan Nazir', url: siteUrl },
        publisher: { '@type': 'Person', '@id': `${siteUrl}/#hassan-nazir`, name: 'Hassan Nazir', url: siteUrl, image: `${siteUrl}/images/profile.png` },
      }
    : route.type === 'Service'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: route.serviceType,
          serviceType: route.serviceType,
          description: route.description,
          url: canonical,
          image: ogImage,
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

  let bodyContent = '';
  if (route.type === 'BlogPosting') {
    // The shell already renders the title as the page's single <h1>; drop the markdown's own H1.
    const articleHtml = markdownToHtml(route.content.replace(/^\s*#\s+.+\r?\n/, ''));
    bodyContent = `
      <article>
        <h1>${escapeHtml(route.heading)}</h1>
        <div class="crawler-meta">
          <time datetime="${escapeHtml(route.published)}">${escapeHtml(route.published)}</time> · 
          <span>${escapeHtml(route.category || 'Engineering')}</span> · 
          <span>By Hassan Nazir</span>
        </div>
        <p class="crawler-lead"><strong>${escapeHtml(route.summary)}</strong></p>
        <div class="crawler-content">
          ${articleHtml}
        </div>
      </article>
      <section aria-label="Related field notes">
        <h2>Related field notes</h2>${articleLinkList(relatedArticles(route.article))}
      </section>
      <nav aria-label="More articles">
        ${(() => {
          const index = articles.findIndex((a) => a.slug === route.article.slug);
          const newer = articles[index - 1];
          const older = articles[index + 1];
          return [
            newer ? `<a href="/blogs/${newer.slug}" rel="prev">Newer: ${escapeHtml(newer.title)}</a>` : '',
            older ? `<a href="/blogs/${older.slug}" rel="next">Older: ${escapeHtml(older.title)}</a>` : '',
          ].filter(Boolean).join(' · ');
        })()}
      </nav>
      <footer class="crawler-footer">
        <p>Written and maintained by <a href="${siteUrl}">Hassan Nazir</a>, Forward Deployed Engineer and Full-Stack AI Architect.</p>
        <nav aria-label="Site index">
          <a href="/">Home</a> · <a href="/services">Services</a> · <a href="/blogs">Blogs</a> · <a href="/llms.txt">AI-readable index</a>
        </nav>
      </footer>
    `;
  } else if (route.route === '/blogs') {
    bodyContent = `
      <section>
        <h1>${escapeHtml(route.heading)}</h1>
        <p>${escapeHtml(route.summary)}</p>
        <h2>Field Guides &amp; Production Architecture Notes</h2>
        <ul>
          ${articles.map((a) => `
            <li>
              <a href="/blogs/${a.slug}"><strong>${escapeHtml(a.title)}</strong></a>
              <p>${escapeHtml(a.description)}</p>
            </li>
          `).join('')}
        </ul>
      </section>
      <footer class="crawler-footer">
        <nav aria-label="Site index">
          <a href="/">Home</a> · <a href="/services">Services</a> · <a href="/blogs">Blogs</a> · <a href="/llms.txt">AI-readable index</a>
        </nav>
      </footer>
    `;
  } else if (route.type === 'Service') {
    bodyContent = `
      <article>
        <h1>${escapeHtml(route.heading)}</h1>
        <p><strong>${escapeHtml(route.description)}</strong></p>
        <section>
          <h2>${escapeHtml(route.serviceType)} — Delivery &amp; Scope</h2>
          <p>Production execution across AI automations, agentic systems, full-stack software development, and systems integration for US and global teams.</p>
        </section>
        <section>
          <h2>Field notes from this practice</h2>${articleLinkList(articlesForService(route.route.split('/').pop()))}
        </section>
        <section>
          <h2>Related engineering services</h2>
          <ul>
            ${services.filter((s) => `/services/${s.slug}` !== route.route).map((s) => `<li><a href="/services/${s.slug}">${escapeHtml(s.serviceType)}</a></li>`).join('\n            ')}
          </ul>
        </section>
      </article>
      <footer class="crawler-footer">
        <nav aria-label="Site index">
          <a href="/">Home</a> · <a href="/services">Services</a> · <a href="/blogs">Blogs</a> · <a href="/llms.txt">AI-readable index</a>
        </nav>
      </footer>
    `;
  } else {
    bodyContent = `
      <h1>${escapeHtml(route.heading)}</h1>
      <p>${escapeHtml(route.summary)}</p>
      <ul>
        ${services.map((s) => `
          <li>
            <a href="/services/${s.slug}"><strong>${escapeHtml(s.title)}</strong></a>
            <p>${escapeHtml(s.description)}</p>
          </li>
        `).join('')}
      </ul>
      <footer class="crawler-footer">
        <nav aria-label="Site index">
          <a href="/">Home</a> · <a href="/services">Services</a> · <a href="/blogs">Blogs</a> · <a href="/llms.txt">AI-readable index</a>
        </nav>
      </footer>
    `;
  }

  let html = template
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeHtml(route.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*("[^>]*>)/, (_match, p1, p2) => `${p1}${canonical}${p2}`)
    .replace(/<script type="application\/ld\+json" data-rh="true">[\s\S]*?<\/script>/, () => `<script type="application/ld+json" data-rh="true">${JSON.stringify(schema)}</script>`)
    .replace(/\s*<!-- prepaint-hero:start -->[\s\S]*?<!-- prepaint-hero:end -->/, '')
    .replace(/<main class="crawler-fallback">[\s\S]*?<\/main>/, () => `<main class="crawler-fallback">${bodyContent}</main>`);

  html = route.image
    ? html.replace('/images/profile-hero.webp', () => route.image)
    : html.replace(/\s*<link rel="preload" as="image" href="\/images\/profile-hero\.webp" fetchpriority="high" \/>/, '');

  html = replaceMeta(html, 'name="description"', metaDescription(route.description));
  html = replaceMeta(html, 'property="og:image"', ogImage);
  html = replaceMeta(html, 'name="twitter:image"', ogImage);
  html = replaceMeta(html, 'property="og:image:alt"', route.heading);
  html = replaceMeta(html, 'name="twitter:image:alt"', route.heading);
  html = replaceMeta(html, 'property="og:type"', route.type === 'BlogPosting' ? 'article' : 'website');
  html = replaceMeta(html, 'property="og:url"', canonical);
  html = replaceMeta(html, 'property="og:title"', route.socialTitle || route.title);
  html = replaceMeta(html, 'property="og:description"', route.description);
  html = replaceMeta(html, 'name="twitter:title"', route.socialTitle || route.title);
  html = replaceMeta(html, 'name="twitter:description"', metaDescription(route.description));

  const outputDir = path.join(distDir, route.route.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html);
  await writeFile(path.join(distDir, `${route.route.slice(1)}.html`), html);
}

// Homepage static HTML: surface the newest field notes so crawlers reach them in one hop
const homeHtml = template.replace('<!-- latest-field-notes -->', () => `<h2>Latest Field Notes</h2>${articleLinkList(articles.slice(0, 10))}`);
await writeFile(path.join(distDir, 'index.html'), homeHtml);

// 404 page: Vercel serves dist/404.html with a real 404 status for any path without a static
// file, so unknown URLs stop returning 200 (soft 404s). The SPA still boots and renders NotFoundPage.
let notFoundHtml = template
  .replace(/<title>.*?<\/title>/, '<title>Page not found | Hassan Nazir</title>')
  .replace(/\s*<link rel="canonical"[^>]*>/, '')
  .replace(/\s*<link rel="preload" as="image" href="\/images\/profile-hero\.webp" fetchpriority="high" \/>/, '')
  .replace(/<script type="application\/ld\+json" data-rh="true">[\s\S]*?<\/script>/, '')
  .replace(/\s*<!-- prepaint-hero:start -->[\s\S]*?<!-- prepaint-hero:end -->/, '')
  .replace(/<main class="crawler-fallback">[\s\S]*?<\/main>/, () => `<main class="crawler-fallback">
        <h1>Page not found</h1>
        <p>This page does not exist or has moved.</p>
        <h2>Latest Field Notes</h2>${articleLinkList(articles.slice(0, 6))}
        <nav aria-label="Site index"><a href="/">Home</a> · <a href="/services">Services</a> · <a href="/blogs">Blogs</a></nav>
      </main>`);
notFoundHtml = replaceMeta(notFoundHtml, 'name="robots"', 'noindex,follow');
notFoundHtml = replaceMeta(notFoundHtml, 'name="googlebot"', 'noindex,follow');
await writeFile(path.join(distDir, '404.html'), notFoundHtml);

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
      <media:content url="${siteUrl}/images/og/${a.slug}.jpg" medium="image" type="image/jpeg" width="1200" height="630" />
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
    <updated>${new Date(a.updated).toISOString()}</updated>
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
    image: `${siteUrl}/images/og/${a.slug}.jpg`,
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
  ...articles.map((a) => ({ loc: `${siteUrl}/blogs/${a.slug}`, changefreq: 'monthly', priority: '0.8', lastmod: a.updated })),
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

// 5. Ensure ai-catalog.json, ard.json and .well-known/ exist in dist
try {
  const aiCatalogContent = await readFile(path.join(publicDir, 'ai-catalog.json'), 'utf8');
  await writeFile(path.join(distDir, 'ai-catalog.json'), aiCatalogContent);
  await writeFile(path.join(distDir, 'ard.json'), aiCatalogContent);
  await mkdir(path.join(distDir, '.well-known'), { recursive: true });
  await writeFile(path.join(distDir, '.well-known', 'ai-catalog.json'), aiCatalogContent);
  await writeFile(path.join(distDir, '.well-known', 'ard.json'), aiCatalogContent);
} catch (err) {
  console.warn('ai-catalog/ard sync error:', err);
}

console.log(`Generated ${routes.length} crawler-first route shells from dynamic .mdx files.`);
console.log(`Generated search.json, tag-data.json, feed.xml, sitemap.xml, ai-catalog.json, and ard.json successfully.`);
