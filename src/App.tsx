import SEOHead from './components/ui/SEOHead';
import { PageShell, useBookingCtx } from './components/hn/chrome';
import { BuildLogSection, CareerLogSection, ContactSection, MethodSection, MoreLink, WhoSection, WorkSection, WritingSection } from './components/hn/sections';
import D20 from './components/hn/graphics/D20';

function HomeHero() {
  const { openBooking, prefetch } = useBookingCtx();
  return (
    <section className="hn-frame hn-hero-grid" aria-labelledby="hn-hero-title">
      <div>
        <p className="hn-hero-eyebrow hn-mono"><span>Forward deployed engineer</span><span>Islamabad / Dubai</span></p>
        <h1 id="hn-hero-title" className="hn-hero-name" aria-label="Hassan Nazir, forward deployed engineer">
          <span>Hassan</span>
          <span>Nazir</span>
        </h1>
        <p className="hn-hero-claim"><b>From QA to production AI.</b> I work inside your team until the hard part runs on software.</p>
        <div className="hn-hero-actions">
          <button type="button" className="hn-btn hn-btn-primary" onClick={openBooking} onPointerEnter={prefetch} onFocus={prefetch}>Book 30 minutes</button>
          <MoreLink to="/work">See the work</MoreLink>
        </div>
      </div>
      <D20 />
    </section>
  );
}

export function App() {
  return (
    <>
      <SEOHead page="home" />
      <PageShell>
        <HomeHero />
        <WorkSection />
        <WhoSection teaser />
        <MethodSection />
        <BuildLogSection limit={6} />
        <CareerLogSection />
        <WritingSection />
        <ContactSection />
      </PageShell>
    </>
  );
}
