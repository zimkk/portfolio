import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { PageShell } from '../components/hn/chrome';
import { CareerSection, CtaBand, MethodSection, PageHero, RangeSection, WhoSection } from '../components/hn/sections';
import { breadcrumbSchema, schemaIds, siteConfig } from '../config/metadata';

const url = `${siteConfig.url}/about`;

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#about`,
    url,
    name: 'About Hassan Nazir',
    mainEntity: { '@id': schemaIds.personId },
  };
  return (
    <>
      <SEOHead
        title="About Hassan Nazir | Forward Deployed Engineer"
        description="Who Hassan Nazir is, how he works with teams, the stack he covers from interface to infrastructure, and six years of QA, full-stack, ML and security work."
        url={url}
        image="/images/og/default.jpg"
        jsonLd={[schema, breadcrumbSchema([{ name: 'Home', url: siteConfig.url }, { name: 'About', url }])]}
      />
      <PageShell>
        <PageHero
          eyebrow="About"
          title="QA, then full-stack, then architecture, then AI."
          mark="Same person throughout."
          lede="I join teams that have a messy operation and a deadline, and I stay until the software holding it together is running. Here is how that tends to go."
        >
          <Link to="/work" className="hn-btn hn-btn-ghost">See the work <ArrowRight size={16} /></Link>
          <Link to="/services" className="hn-link">Ways to work together <ArrowRight size={14} /></Link>
        </PageHero>
        <WhoSection index="01" />
        <RangeSection index="02" />
        <MethodSection index="03" />
        <CareerSection index="04" />
        <CtaBand heading="If this sounds like the person you need, say hello." line="Thirty minutes is usually enough to tell whether I am the right person for it." />
      </PageShell>
    </>
  );
}
