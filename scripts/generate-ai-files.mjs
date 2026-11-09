// Generates the AI-facing discovery files from the same data the site renders, so they never go stale:
//   llms.txt              the index LLMs and answer engines read first
//   llms-full.txt         hand-written facts, plus a generated index of every page between markers
//   portfolio.json        JSON-LD graph: person, current roles, projects, writing
//   ai-catalog.json/ard.json  ARD catalog: hand-tuned service entries plus generated page entries
// Runs after generate-route-shells.mjs in `npm run build`; writes to public/ and dist/.
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const site = 'https://hassannazir.dev';
const publicDir = path.resolve('public');
const distDir = path.resolve('dist');
const today = new Date().toISOString().slice(0, 10);

const work = JSON.parse(await readFile('src/data/work.json', 'utf8')).projects;
const career = JSON.parse(await readFile('src/data/career.json', 'utf8'));
const catalog = JSON.parse(await readFile(path.join(publicDir, 'ai-catalog.json'), 'utf8'));
const serviceEntries = catalog.entries.filter((entry) => entry.identifier.includes(':services:'));
const services = serviceEntries.map((entry) => ({ slug: entry.url.split('/').pop(), name: entry.displayName, description: entry.description }));

const blogDir = path.resolve('data/blog');
const posts = [];
for (const file of (await readdir(blogDir)).filter((name) => /\.mdx?$/.test(name))) {
  const { data } = matter(await readFile(path.join(blogDir, file), 'utf8'));
  posts.push({ slug: file.replace(/\.mdx?$/, ''), title: data.title, excerpt: data.excerpt || '', category: data.category || 'Engineering', date: String(data.publishedAt || '') });
}
posts.sort((a, b) => b.date.localeCompare(a.date));

const month = (value) => {
  const [y, m] = value.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
};
const roleLine = (role) => `${role.role}, ${role.org} (${role.type}), ${month(role.start)} to ${role.end ? month(role.end) : 'present'}${role.focus ? `: ${role.focus}` : ''}`;
const byCategory = posts.reduce((groups, post) => ((groups[post.category] ||= []).push(post), groups), {});
const products = work.filter((project) => project.kind === 'product');
const repos = work.filter((project) => project.kind === 'repo');

async function write(name, content) {
  await writeFile(path.join(publicDir, name), content);
  if ((name === 'ai-catalog.json' || name === 'ard.json') && existsSync(path.join(publicDir, '.well-known'))) {
    await writeFile(path.join(publicDir, '.well-known', name), content);
  }
  if (existsSync(distDir)) {
    await writeFile(path.join(distDir, name), content);
    if (name === 'ai-catalog.json' || name === 'ard.json') {
      const wellKnown = path.join(distDir, '.well-known');
      if (existsSync(wellKnown)) await writeFile(path.join(wellKnown, name), content);
    }
  }
}

/* ---------- llms.txt ---------- */
const llms = `# Hassan Nazir: Forward Deployed Engineer, AI and Full-Stack Software

> Hassan Nazir is a forward deployed engineer based in Islamabad and Dubai who builds AI automation, AI agents and full-stack software inside the teams that use them. He currently works as an AI Environment Engineer at Outsentia (full-time) and an ML Researcher at Anthology (part-time contract, inference optimization and GPU kernels), and is AI Architect at Uno OS. He works remotely with US, UK and EU teams.

This is the canonical machine-readable index of hassannazir.dev. Generated from the site's own data on ${today}.

## Who he is

- [About](${site}/about): Background, the full stack he covers, how engagements run, and every role on one timeline
${career.current.map((role) => `- ${roleLine(role)}`).join('\n')}
- Previously: ${career.past.filter((role, index, all) => all.findIndex((r) => r.org === role.org) === index).map((role) => `${role.role} at ${role.org}`).join('; ')}
- Education: ${career.education.degree}, ${career.education.school} (${career.education.years})
- Credentials: ${career.credentials.map((c) => c.name).join(', ')}

## Services

- [All services](${site}/services): The five ways to work with him
${services.map((s) => `- [${s.name}](${site}/services/${s.slug}): ${s.description}`).join('\n')}

## Work

- [All work](${site}/work): Live products and public source, each with its own page
${products.map((p) => `- [${p.name}](${site}/work/${p.slug}): ${p.summary} Live at ${p.live}`).join('\n')}
${repos.map((p) => `- [${p.name}](${site}/work/${p.slug}): ${p.summary}${p.repo ? ` Source: ${p.repo}` : ''}`).join('\n')}

## Writing (${posts.length} field notes)

- [All field notes](${site}/blogs): Long-form technical writing on applied AI, agents, RAG, automation, security and production engineering
${posts.slice(0, 15).map((p) => `- [${p.title}](${site}/blogs/${p.slug}): ${p.excerpt}`).join('\n')}
- The full list of every post is in [llms-full.txt](${site}/llms-full.txt) and the [RSS feed](${site}/feed.xml).

## Contact

- [Contact page](${site}/contact): Short brief form and a 30 minute call
- Book a call: https://calendly.com/hassannazir955/30min
- Email: hassannazir955@gmail.com
- GitHub: https://github.com/zimkk
- LinkedIn: https://linkedin.com/in/hassannazirrr

## Machine-readable resources

- [llms-full.txt](${site}/llms-full.txt): Detailed facts, project descriptions and a complete page index
- [portfolio.json](${site}/portfolio.json): JSON-LD graph of the person, roles, projects and writing
- [ai-catalog.json](${site}/ai-catalog.json): Agentic Resource Discovery catalog of every page
- [sitemap.xml](${site}/sitemap.xml): Every canonical URL
- [feed.xml](${site}/feed.xml): RSS feed of field notes
`;
await write('llms.txt', llms);

/* ---------- llms-full.txt: refresh the generated page index ---------- */
const START = '<!-- generated:index:start -->';
const END = '<!-- generated:index:end -->';
let full = await readFile(path.join(publicDir, 'llms-full.txt'), 'utf8');
full = full.replace(/\(\d+ production engineering field guides\)/g, `(${posts.length} production engineering field guides)`);
const index = `${START}
## Complete page index (generated ${today})

### Current roles
${career.current.map((role) => `- ${roleLine(role)}`).join('\n')}

### Pages
- ${site}/ : Home
- ${site}/about : About, stack, method and career timeline
- ${site}/work : All work
- ${site}/services : All services
- ${site}/blogs : All field notes
- ${site}/contact : Contact and booking

### Project pages
${work.map((p) => `- ${site}/work/${p.slug} : ${p.name}. ${p.summary}`).join('\n')}

### Service pages
${services.map((s) => `- ${site}/services/${s.slug} : ${s.name}`).join('\n')}

### Field notes by topic
${Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length).map(([category, items]) => `#### ${category} (${items.length})\n${items.map((p) => `- ${site}/blogs/${p.slug} : ${p.title} (${p.date})`).join('\n')}`).join('\n\n')}
${END}`;
full = full.includes(START) ? full.replace(new RegExp(`${START}[\\s\\S]*?${END}`), index) : `${full.trimEnd()}\n\n${index}\n`;
await write('llms-full.txt', full);

/* ---------- portfolio.json ---------- */
const personId = `${site}/#hassan-nazir`;
const portfolio = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${site}/#profile`,
  url: site,
  dateModified: today,
  mainEntity: {
    '@type': 'Person',
    '@id': personId,
    name: 'Hassan Nazir',
    jobTitle: 'Forward Deployed Engineer & Full-Stack AI Architect',
    url: site,
    image: `${site}/images/profile.png`,
    sameAs: ['https://github.com/zimkk', 'https://linkedin.com/in/hassannazirrr'],
    homeLocation: { '@type': 'Place', name: 'Islamabad, Pakistan and Dubai, UAE' },
    worksFor: career.current.map((role) => ({ '@type': 'Organization', name: role.org, description: `${role.role} (${role.type}) since ${month(role.start)}${role.focus ? `: ${role.focus}` : ''}` })),
    alumniOf: { '@type': 'CollegeOrUniversity', name: career.education.school, description: `${career.education.degree} (${career.education.years})` },
    hasCredential: career.credentials.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c.name, recognizedBy: { '@type': 'Organization', name: c.by } })),
    knowsAbout: ['Forward deployed engineering', 'AI agents', 'Retrieval-augmented generation', 'n8n automation', 'Full-stack software development', 'LLM inference optimization', 'GPU kernels', 'Frontier LLM research', 'Security engineering'],
  },
  hasPart: work.map((p) => ({
    '@type': p.repo && !p.live ? 'SoftwareSourceCode' : 'CreativeWork',
    name: p.name,
    url: `${site}/work/${p.slug}`,
    description: p.description,
    keywords: p.stack.join(', '),
    author: { '@id': personId },
    ...(p.repo ? { codeRepository: p.repo } : {}),
    ...(p.live ? { sameAs: p.live } : {}),
  })),
  subjectOf: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${site}/blogs/${p.slug}`, datePublished: p.date, author: { '@id': personId } })),
};
await write('portfolio.json', `${JSON.stringify(portfolio, null, 2)}\n`);

/* ---------- ai-catalog.json / ard.json ---------- */
const entry = (id, name, url, description, tags, queries) => ({ identifier: `urn:air:hassannazir.dev:${id}`, displayName: name, type: 'text/html', url, description, tags, representativeQueries: queries });
const generated = [
  entry('pages:about', 'About Hassan Nazir', `${site}/about`, 'Background, current roles, the stack he covers, how engagements run, and every role on one timeline.', ['about', 'career', 'profile'], ['who is Hassan Nazir', 'Hassan Nazir current role', 'Hassan Nazir experience']),
  entry('pages:work', 'Work by Hassan Nazir', `${site}/work`, 'Live products and public source code, each with its own page.', ['portfolio', 'projects', 'open-source'], ['Hassan Nazir projects', 'Hassan Nazir open source']),
  entry('pages:blogs', 'Field notes', `${site}/blogs`, `${posts.length} long-form technical field notes on applied AI, agents, RAG, automation and security.`, ['writing', 'blog'], ['Hassan Nazir blog', 'forward deployed engineering articles']),
  entry('pages:contact', 'Contact Hassan Nazir', `${site}/contact`, 'Send a short brief or book a 30 minute call.', ['contact', 'booking'], ['contact Hassan Nazir', 'book a call with a forward deployed engineer']),
  ...work.map((p) => entry(`work:${p.slug}`, p.name, `${site}/work/${p.slug}`, p.summary, [p.discipline, ...p.stack.slice(0, 3).map((t) => t.toLowerCase())], [`${p.name} by Hassan Nazir`])),
];
const nextCatalog = `${JSON.stringify({ ...catalog, entries: [...serviceEntries, ...generated] }, null, 2)}\n`;
await write('ai-catalog.json', nextCatalog);
await write('ard.json', nextCatalog);

console.log(`Generated llms.txt, llms-full.txt index, portfolio.json and ai-catalog.json (${generated.length + serviceEntries.length} entries).`);
