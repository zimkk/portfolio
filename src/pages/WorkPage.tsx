import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { PageShell } from '../components/hn/chrome';
import { BuildLogSection, CtaBand, PageHero, WorkSection } from '../components/hn/sections';
import { breadcrumbSchema, schemaIds, siteConfig } from '../config/metadata';
import { projectPath, projects } from '../data/work';

const url = `${siteConfig.url}/work`;

export default function WorkPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#work`,
    url,
    name: 'Work by Hassan Nazir',
    author: { '@id': schemaIds.personId },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteConfig.url}${projectPath(project.slug)}`,
        name: project.name,
      })),
    },
  };
  return (
    <>
      <SEOHead
        title="Work: Live Products and Open Source | Hassan Nazir"
        description="Live products and public source code by Hassan Nazir: AI agents, n8n automation, ML pipelines, security tooling and full-stack software, each with its own write-up."
        url={url}
        image="/images/og/work.jpg"
        jsonLd={[schema, breadcrumbSchema([{ name: 'Home', url: siteConfig.url }, { name: 'Work', url }])]}
      />
      <PageShell>
        <PageHero
          eyebrow="Work"
          title="Products and code"
          mark="running in production."
          lede={`${projects.length} projects. Live products people use, and public source you can read. Every one has its own page with the stack, the parts that were hard, and the services it sits under.`}
        >
          <Link to="/services" className="hn-btn hn-btn-ghost">How I can help <ArrowRight size={16} /></Link>
          <Link to="/blogs" className="hn-link">The writing behind it <ArrowRight size={14} /></Link>
        </PageHero>
        <WorkSection index="01" cta={false} />
        <BuildLogSection index="02" />
        <CtaBand heading="Got something that should be on this page?" line="Tell me what it is, what it should do, and what it does instead." />
      </PageShell>
    </>
  );
}
