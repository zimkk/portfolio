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

// Text card for covers that are product screenshots or generic illustrations.
const textCard = (eyebrow, title, image) => `<!doctype html><html><body style="margin:0;width:1200px;height:630px;background:linear-gradient(135deg,#08090c,#111319);color:#edf0f5;font-family:Arial,Helvetica,sans-serif;overflow:hidden;position:relative">
  ${image ? `<img src="${fileUrl(image)}" style="position:absolute;right:0;top:0;width:520px;height:630px;object-fit:cover;opacity:.9">
  <div style="position:absolute;right:0;top:0;width:520px;height:630px;background:linear-gradient(90deg,#08090c 0%,rgba(8,9,12,.2) 45%,rgba(8,9,12,0) 100%)"></div>` : ''}
  <div style="position:absolute;left:70px;top:70px;width:${image ? 600 : 1000}px">
    <div style="font-family:monospace;font-size:20px;letter-spacing:3px;color:#ff5d3d;text-transform:uppercase">${escapeHtml(eyebrow)}</div>
    <div style="margin-top:28px;font-size:${title.length > 80 ? 44 : title.length > 50 ? 52 : 62}px;font-weight:700;line-height:1.05;letter-spacing:-2px">${escapeHtml(title)}</div>
  </div>
  <div style="position:absolute;left:70px;bottom:60px;font-family:monospace;font-size:20px;color:#7f8794">HASSAN NAZIR · hassannazir.dev</div>
</body></html>`;

const blogFiles = (await readdir(blogDir)).filter((f) => /.mdx?$/.test(f));
const blogMeta = await Promise.all(blogFiles.map(async (file) => ({ file, data: matter(await readFile(path.join(blogDir, file), 'utf8')).data })));
for (const p of ['/images/profile-hero.webp', ...Object.values(services).map((s) => s.image), ...blogMeta.map(({ data }) => data.image || '/images/forward-deployed-services.svg')]) await preload(p);

const jobs = [
  { key: 'default', html: textCard('Forward Deployed Engineer', 'AI Automations & Full-Stack Software Development', '/images/profile-hero.webp') },
  { key: 'services', html: textCard('Engineering Services', 'Technical delivery where strategy usually breaks.', '/images/profile-hero.webp') },
  { key: 'blogs', html: textCard('Field Notes', 'Applied AI & Software Engineering Blogs', '/images/profile-hero.webp') },
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
const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
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
