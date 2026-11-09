import SEOHead from '../components/ui/SEOHead';
import { PageShell } from '../components/hn/chrome';
import { ContactSection } from '../components/hn/sections';
import { breadcrumbSchema, schemaIds, siteConfig } from '../config/metadata';

const url = `${siteConfig.url}/contact`;

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contact`,
    url,
    name: 'Contact Hassan Nazir',
    mainEntity: { '@id': schemaIds.personId },
  };
  return (
    <>
      <SEOHead
        title="Contact Hassan Nazir | Book a 30 Minute Call"
        description="Send Hassan Nazir a short brief or book a 30 minute call about AI automation, agents, n8n workflows or full-stack software. Remote, with US, UK and EU overlap."
        url={url}
        image="/images/og/contact.jpg"
        jsonLd={[schema, breadcrumbSchema([{ name: 'Home', url: siteConfig.url }, { name: 'Contact', url }])]}
      />
      <PageShell>
        <ContactSection index="01" headingLevel="h1" first />
      </PageShell>
    </>
  );
}
