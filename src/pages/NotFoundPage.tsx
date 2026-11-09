import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { SiteFooter, SiteNav } from '../components/hn/chrome';
import { useBooking } from '../components/hn/hooks';
import { BrokenCable } from '../components/hn/graphics/glyphs';

// witty-404: a Cloudflare Worker that writes a different excuse for every missing page.
const API = 'https://witty-404.zimkk.workers.dev';

interface Joke {
  id: string;
  title: string;
  subtitle: string;
  logs: string[];
  footnote: string;
  emoji?: string;
  pathTemplate?: string;
}

const FALLBACK: Joke = {
  id: 'fallback',
  title: 'Your request took off, found nothing, and did not survive re-entry.',
  subtitle: 'The page was never written, renamed by committee, or deleted in a refactor that was "just cleanup". It was not just cleanup.',
  logs: [
    '> checking if page exists...',
    '> it does not.',
    '> asking the API for a witty response...',
    '> the API also returned 404.',
    '> this is fine.',
  ],
  footnote: 'Root cause: vibes',
};

export default function NotFoundPage() {
  const { openBooking, prefetch, modal } = useBooking();
  const [joke, setJoke] = useState<Joke | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    fetch(`${API}/?path=${encodeURIComponent(path)}`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: Joke) => setJoke(data))
      .catch(() => setJoke(FALLBACK));
  }, []);

  useEffect(() => {
    if (!joke) return;
    let index = 0;
    setVisibleLogs([]);
    timerRef.current = setInterval(() => {
      if (index < joke.logs.length) {
        const line = joke.logs[index];
        index += 1;
        setVisibleLogs((previous) => [...previous, line]);
      } else if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 340);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [joke]);

  const subtitle = joke?.pathTemplate ? joke.pathTemplate.replace('{path}', window.location.pathname) : joke?.subtitle ?? '';

  return (
    <>
      <SEOHead title="Page not found | Hassan Nazir" description="This page does not exist or has moved." noindex />
      <div className="hn">
        <SiteNav onBook={openBooking} onPrefetch={prefetch} />
        <main className="hn-404 hn-alt">
          <div className="hn-frame hn-404-grid">
            <div>
              <span className="hn-chip">HTTP 404</span>
              <h1>{joke ? joke.title.replace(/\n/g, ' ') : 'Diagnosing the situation'}</h1>
              {subtitle && <p className="hn-lede">{subtitle}</p>}
              <div className="hn-404-term" aria-label="Diagnostic output">
                {visibleLogs.map((line, index) => <p key={index}>{line}</p>)}
                {(!joke || visibleLogs.length < joke.logs.length) && <span className="hn-cursor">▊</span>}
              </div>
              <div className="hn-404-actions">
                <a href="/" className="hn-btn hn-btn-primary"><ArrowLeft size={16} /> Back to the start</a>
                <a href="/blogs" className="hn-btn hn-btn-ghost">Read things that exist <ArrowUpRight size={16} /></a>
              </div>
              {joke && <p className="hn-mono" style={{ marginTop: 26, color: 'var(--fg-2)' }}>{joke.footnote} · joke {joke.id}</p>}
            </div>
            <div className="hn-404-art"><BrokenCable /></div>
          </div>
        </main>
        <SiteFooter />
      </div>
      {modal}
    </>
  );
}
