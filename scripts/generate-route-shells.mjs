import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://hassannazir.dev';
const distDir = path.resolve('dist');
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const articles = [
  {
    slug: 'advanced-prompt-engineering-llms',
    title: 'Advanced Prompt Engineering Techniques for Large Language Models',
    description: 'Explore prompt engineering strategies for specialized LLM applications, including reasoning patterns, few-shot learning, and domain adaptation.',
    published: '2025-01-15',
  },
  {
    slug: 'zero-trust-architecture-implementation',
    title: 'Implementing Zero Trust Architecture in Cloud Environments',
    description: 'A practical guide to Zero Trust cloud architecture covering identity verification, micro-segmentation, and continuous monitoring.',
    published: '2025-01-10',
  },
  {
    slug: 'ai-powered-threat-detection',
    title: 'Building AI-Powered Threat Detection Systems: From Theory to Production',
    description: 'Build and deploy machine-learning systems for threat detection using anomaly models, feature engineering, and real-time monitoring.',
    published: '2025-01-05',
  },
  {
    slug: 'deep-learning-transformers-attention-mechanisms-2025',
    title: 'Deep Learning Evolution: Transformers, Attention Mechanisms, and the Future of Neural Networks',
    description: 'A technical guide to transformers, multi-head attention, LoRA, QLoRA, and the evolution of modern neural architectures.',
    published: '2025-01-25',
  },
  {
    slug: 'agentic-ai-autonomous-systems-langchain-autogpt',
    title: 'Agentic AI: Building Autonomous Multi-Agent Systems with LangChain and Modern Frameworks',
    description: 'Architectures and implementation patterns for autonomous agents, tool use, planning, and multi-agent collaboration.',
    published: '2025-01-27',
  },
  {
    slug: 'computer-vision-sam-dino-foundation-models-2025',
    title: 'Computer Vision Revolution: SAM, DINOv2, and Foundation Models Transforming Visual AI',
    description: 'A guide to SAM, DINOv2, vision transformers, zero-shot learning, segmentation, and visual foundation models.',
    published: '2025-01-26',
  },
  {
    slug: 'ai-trends-2025-multimodal-llms-enterprise-adoption',
    title: 'AI Trends 2025: Multimodal LLMs, Enterprise Adoption, and the Future of Artificial Intelligence',
    description: 'An analysis of multimodal foundation models, enterprise adoption, regulation, and emerging production AI patterns.',
    published: '2025-01-27',
  },
];

const services = [
  {
    slug: 'forward-deployed-engineer',
    image: '/images/forward-deployed-services.webp',
    title: 'Forward Deployed Engineer for Applied AI and Software Delivery | Hassan Nazir',
    description: 'Hire a Forward Deployed Engineer who embeds with your team, turns unclear operational requirements into working software, integrates it, and owns the path to production.',
    heading: 'Put an engineer where the ambiguity lives.',
    serviceType: 'Forward Deployed Engineering',
  },
  {
    slug: 'applied-ai-consulting',
    image: '/images/ai-automation.jpg',
    title: 'Applied AI Consulting for Production Systems | Hassan Nazir',
    description: 'Applied AI consulting for US and European teams that need working LLM applications, document intelligence, automation, evaluation, and production infrastructure.',
    heading: 'Move the AI work from promising to operational.',
    serviceType: 'Applied AI Consulting',
  },
  {
    slug: 'ai-agent-development',
    image: '/images/cloud.webp',
    title: 'AI Agent Development and RAG Engineering Services | Hassan Nazir',
    description: 'Production AI agent and RAG development using LangGraph, model tools, vector search, evaluation, durable jobs, observability, and full-stack product engineering.',
    heading: 'Agents need an operating system, not another demo.',
    serviceType: 'AI Agent and RAG Development',
  },
  {
    slug: 'n8n-automation-consultant',
    image: '/images/projects/n8nhub.webp',
    title: 'n8n Automation Consultant for AI Workflows and Integrations | Hassan Nazir',
    description: 'n8n automation consulting for reliable AI workflows, API integrations, data pipelines, lead operations, document processing, and self-hosted production delivery.',
    heading: 'Automate the operation, not just the happy path.',
    serviceType: 'n8n Automation Consulting',
  },
];

const routes = [
  {
    route: '/services',
    image: '/images/forward-deployed-services.webp',
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
    title: 'Engineering Work & Case Studies — Hassan Nazir',
    description: 'Selected product, automation, AI, cloud, and quality-engineering work by Forward Deployed Engineer Hassan Nazir.',
    type: 'CollectionPage',
    heading: 'Engineering work that made it past the demo.',
    summary: 'Case studies in production AI, cloud security, quality engineering, architecture, implementation, and operational outcomes.',
  },
  {
    route: '/blogs',
    title: 'Applied AI & Engineering Field Notes — Hassan Nazir',
    description: 'Technical field notes by Hassan Nazir about agentic AI, LLM systems, computer vision, security architecture, and production engineering.',
    type: 'CollectionPage',
    heading: 'Applied AI and engineering field notes.',
    summary: 'Long-form technical writing about AI agents, model systems, security architecture, computer vision, deep learning, and production delivery.',
  },
  ...articles.map((article) => ({
    route: `/blogs/${article.slug}`,
    title: `${article.title} | Hassan Nazir`,
    description: article.description,
    type: 'BlogPosting',
    heading: article.title,
    summary: article.description,
    published: article.published,
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
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Place', name: 'European Union' },
            { '@type': 'Country', name: 'United Kingdom' },
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
    .replace(/<main class="crawler-fallback">[\s\S]*?<\/main>/, `<main class="crawler-fallback"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.summary)}</p><p>Written and maintained by <a href="${siteUrl}">Hassan Nazir</a>, Forward Deployed Engineer and Applied AI practitioner.</p><nav aria-label="Site index"><a href="/">Portfolio</a> · <a href="/services">Services</a> · <a href="/work">Work</a> · <a href="/blogs">Field notes</a> · <a href="/llms.txt">AI-readable index</a></nav></main>`);

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

console.log(`Generated ${routes.length} crawler-first route shells.`);
