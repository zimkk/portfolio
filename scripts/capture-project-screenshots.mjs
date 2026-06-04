import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const sites = [
  { slug: 'the-home-club', url: 'https://thehomeclubsports.com' },
  { slug: 'n8nhub', url: 'https://n8nhub.hassannazir.dev' },
  { slug: 'speedyinfluencer', url: 'https://speedyinfluencer.com' },
  { slug: 'smartfurs', url: 'https://smartfurs.vercel.app' },
];

await mkdir('public/images/projects', { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const site of sites) {
  const outPath = `public/images/projects/${site.slug}.jpg`;
  try {
    console.log(`Capturing ${site.url}...`);
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(4000);
    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 88,
      fullPage: false,
    });
    console.log(`Saved ${outPath}`);
  } catch (error) {
    console.error(`Failed ${site.slug}:`, error.message);
  }
}

await browser.close();
