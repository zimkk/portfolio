// Renders 1200x630 JPEG social cards into public/images/og/.
// Social platforms (LinkedIn, X, Facebook, Slack) don't render SVG og:images, and several
// blog covers are SVG, so every route gets a rasterized card. Run locally after adding
// posts (`npm run og:images`) and commit the output; the Vercel build only references them.
import { mkdir, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { chromium } from 'playwright';

const root = path.resolve('.');
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'images', 'og');
const blogDir = path.join(root, 'data', 'blog');
const force = process.argv.includes('--force');

const services = {
  'forward-deployed-engineer': { image: '/images/forward-deployed-services.svg', title: 'Forward Deployed Engineering' },
  'applied-ai-consulting': { image: '/images/ai-automation.svg', title: 'Applied AI Consulting' },
  'ai-agent-development': { image: '/images/cloud.svg', title: 'AI Agent & RAG Development' },
  'n8n-automation-consultant': { image: '/images/projects/n8nhub.webp', title: 'AI Automations & n8n Consulting' },
  'full-stack-software-development': { image: '/images/projects/the-home-club.webp', title: 'Full-Stack Software Development' },
};

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const mimeTypes = { '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
const dataUris = new Map();
// setContent pages can't load file:// URLs, so images are inlined as data URIs.
const fileUrl = (publicPath) => dataUris.get(publicPath);
async function preload(publicPath) {
  if (!publicPath || dataUris.has(publicPath)) return;
  const bytes = await readFile(path.join(publicDir, publicPath));
  dataUris.set(publicPath, `data:${mimeTypes[path.extname(publicPath)]};base64,${bytes.toString('base64')}`);
}

// Image-only card: the cover already carries the post's visual title.
const coverCard = (image) => `<!doctype html><html><body style="margin:0;width:1200px;height:630px;background:#08090c;overflow:hidden">
  <img src="${fileUrl(image)}" style="width:1200px;height:630px;object-fit:cover;object-position:center"></body></html>`;

// Brand fonts, inlined so the card renders exactly like the site.
const fontFace = async (file, family, weight) => `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${(await readFile(path.join(publicDir, 'fonts', file))).toString('base64')}) format('woff2')}`;
const fonts = [
  await fontFace('instrument-sans-var.woff2', 'Instrument Sans', '400 700'),
  await fontFace('ibm-plex-mono-400.woff2', 'Plex', 400),
].join('');

// Text card in the site's own system: white canvas, ink type, optional image on the right.
const textCard = (eyebrow, title, image, subtitle = '') => `<!doctype html><html><head><style>${fonts}</style></head>
<body style="margin:0;width:1200px;height:630px;overflow:hidden;position:relative;background:#FFFFFF;color:#0A0F17;font-family:'Instrument Sans',Arial,sans-serif">
  ${image ? `<div style="position:absolute;right:64px;top:64px;width:420px;height:502px;border:1px solid #D9DEE5;border-radius:22px;overflow:hidden;background:#F4F6F9">
    <img src="${fileUrl(image)}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>` : ''}
  <div style="position:absolute;left:72px;top:76px;width:${image ? 580 : 1000}px">
    <div style="font-family:'Plex',monospace;font-size:19px;letter-spacing:1.2px;color:#5B6474;text-transform:uppercase">${escapeHtml(eyebrow)}</div>
    <div style="margin-top:28px;font-weight:600;font-size:${title.length > 80 ? 46 : title.length > 50 ? 56 : 70}px;line-height:1.03;letter-spacing:-.04em">${escapeHtml(title)}</div>
    ${subtitle ? `<div style="margin-top:24px;font-size:25px;line-height:1.45;color:#4A5363">${escapeHtml(subtitle)}</div>` : ''}
  </div>
  <div style="position:absolute;left:72px;bottom:64px;font-family:'Plex',monospace;font-size:19px;letter-spacing:1.2px;color:#5B6474">HASSAN NAZIR &nbsp;·&nbsp; hassannazir.dev</div>
</body></html>`;

const work = JSON.parse(await readFile(path.join(root, 'src', 'data', 'work.json'), 'utf8')).projects;
const blogFiles = (await readdir(blogDir)).filter((f) => /.mdx?$/.test(f));
const blogMeta = await Promise.all(blogFiles.map(async (file) => ({ file, data: matter(await readFile(path.join(blogDir, file), 'utf8')).data })));
for (const p of ['/images/profile-hero.webp', ...work.map((w) => w.image).filter(Boolean), ...Object.values(services).map((s) => s.image), ...blogMeta.map(({ data }) => data.image || '/images/forward-deployed-services.svg')]) await preload(p);

const jobs = [
  { key: 'default', html: textCard('Forward Deployed Engineer', 'Hassan Nazir', '/images/profile-hero.webp', 'AI automation, AI agents and full-stack software, built inside the teams that use them.') },
  { key: 'services', html: textCard('Engineering Services', 'Pick the problem. Not the buzzword.', '/images/profile-hero.webp', 'Forward deployed engineering, applied AI, agents and RAG, n8n automation, full-stack software.') },
  { key: 'blogs', html: textCard('Field Notes', 'Field notes from production work.', '/images/profile-hero.webp', 'Applied AI, agents, RAG, automation and security engineering.') },
  { key: 'about', html: textCard('About', 'QA, full-stack, architecture, AI. Same person.', '/images/profile-hero.webp', 'AI Environment Engineer at Outsentia. ML Researcher at Anthology. AI Architect at Uno OS.') },
  { key: 'work', html: textCard('Work', 'Products and code, running in production.', '/images/projects/n8nhub.webp', 'Live products and public source, each with its own write-up.') },
  { key: 'contact', html: textCard('Contact', 'Tell me what needs to work.', '/images/profile-hero.webp', 'Send a short brief or book a 30 minute call.') },
  ...work.map((w) => ({ key: `work-${w.slug}`, html: textCard(w.kind === 'product' ? 'Live product' : 'Public source', w.name, w.image, w.summary) })),
  ...Object.entries(services).map(([slug, s]) => ({ key: `service-${slug}`, html: textCard('Engineering Service', s.title, s.image) })),
];

for (const file of (await readdir(blogDir)).filter((f) => /\.mdx?$/.test(f))) {
  const { data } = matter(await readFile(path.join(blogDir, file), 'utf8'));
  const slug = file.replace(/\.mdx?$/, '');
  const image = data.image || '/images/forward-deployed-services.svg';
  // Bespoke per-post covers live in /images/blogs; shared covers get a titled card instead.
  jobs.push({ key: slug, html: image.startsWith('/images/blogs/') ? coverCard(image) : textCard(data.category || 'Field Notes', data.title || slug, image) });
}

await mkdir(outDir, { recursive: true });
// Fall back to the system Chrome when Playwright's bundled browser build isn't downloaded.
const browser = await chromium.launch()
  .catch(() => chromium.launch({ channel: 'chrome' }))
  .catch(() => chromium.launch({ channel: 'msedge' }));
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let rendered = 0;
for (const job of jobs) {
  const out = path.join(outDir, `${job.key}.jpg`);
  if (!force && await stat(out).then(() => true, () => false)) continue;
  await page.setContent(job.html, { waitUntil: 'load' });
  await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
  rendered += 1;
}
await browser.close();
console.log(`Rendered ${rendered} of ${jobs.length} social cards into public/images/og/.`);
