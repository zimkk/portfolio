import { chromium } from 'playwright';
import { mkdir, readFile } from 'fs/promises';

// Refreshes the screenshots of every live product listed in src/data/work.json.
// Run with: npm run screenshots
const { projects } = JSON.parse(await readFile('src/data/work.json', 'utf8'));
const sites = projects.filter((project) => project.live).map((project) => ({ slug: project.slug, url: project.live }));

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
