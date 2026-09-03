import { readFile } from 'node:fs/promises';

const host = 'hassannazir.dev';
const key = process.env.INDEXNOW_KEY || '8f39d42b1c7e4a90a6f3b2d859ce7104';
const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith(`https://${host}/`) || url === `https://${host}`);

if (!urlList.length) throw new Error('No canonical URLs were found in public/sitemap.xml.');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow submission failed with HTTP ${response.status}: ${await response.text()}`);
}

console.log(`Successfully submitted ${urlList.length} URLs to IndexNow for instant search indexing.`);
