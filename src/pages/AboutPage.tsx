import SEOHead from '../components/ui/SEOHead';
import { PageShell } from '../components/hn/chrome';
import { CareerSection, CtaBand, MethodSection, MoreLink, PageHero, QUICK_ANSWERS, QuickAnswersSection, RangeSection, WhoSection } from '../components/hn/sections';
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
        image="/images/og/about.jpg"
        jsonLd={[
          schema,
          breadcrumbSchema([{ name: 'Home', url: siteConfig.url }, { name: 'About', url }]),
          { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: QUICK_ANSWERS.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
        ]}
      />
      <PageShell>
        <PageHero
          title="QA, full-stack, architecture, AI. Same person."
          lede="I join teams with a complex operation and a deadline, and I stay accountable until the software behind it runs in production."
        >
          <MoreLink to="/work">See the work</MoreLink>
        </PageHero>
        <WhoSection />
        <RangeSection />
        <MethodSection />
        <CareerSection />
        <QuickAnswersSection />
        <CtaBand heading="Sound like the person you need?" line="Thirty minutes is usually enough to tell whether I am the right person for it." />
      </PageShell>
    </>
  );
}
