import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SEOHead from './components/ui/SEOHead';
import { PageShell, useBookingCtx } from './components/hn/chrome';
import { BuildLogSection, CareerLogSection, ContactSection, MethodSection, RangeSection, WhoSection, WorkSection, WritingSection } from './components/hn/sections';
import Ico from './components/hn/graphics/Ico';
import D20 from './components/hn/graphics/D20';

function HomeHero() {
  const { openBooking, prefetch } = useBookingCtx();
  return (
    <section className="hn-hero hn-alt" aria-labelledby="hn-hero-title">
      <div className="hn-frame hn-hero-grid">
        <div>
          <p className="hn-hero-eyebrow hn-mono"><span><Ico size={16} /> Forward deployed engineer</span><span>Islamabad / Dubai</span></p>
          <h1 id="hn-hero-title" className="hn-hero-name" aria-label="Hassan Nazir, forward deployed engineer">
            <span><span>Hassan</span></span>
            <span><span>Nazir</span></span>
          </h1>
          <p className="hn-hero-claim">From QA to production AI. <span className="hn-mark">One engineer.</span></p>
          <p className="hn-hero-copy">I work inside your team until the hardest part of the operation runs reliably on software. Every face of the die is a real role, project or credential.</p>
          <div className="hn-hero-actions">
            <button type="button" className="hn-btn hn-btn-primary" onClick={openBooking} onPointerEnter={prefetch} onFocus={prefetch}>
              <Ico /> Book 30 minutes <ArrowUpRight size={16} />
            </button>
            <Link to="/work" className="hn-btn hn-btn-ghost">See the work <ArrowRight size={16} /></Link>
          </div>
        </div>
        <D20 />
      </div>
    </section>
  );
}

export function App() {
  return (
    <>
      <SEOHead page="home" />
      <PageShell>
        <HomeHero />
        <WhoSection index="02" />
        <RangeSection index="03" />
        <MethodSection index="04" />
        <WorkSection index="05" />
        <BuildLogSection index="06" />
        <CareerLogSection index="07" />
        <WritingSection index="08" />
        <ContactSection index="09" />
      </PageShell>
    </>
  );
}
