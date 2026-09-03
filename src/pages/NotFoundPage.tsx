import { useEffect, useRef, useState } from 'react';

const JOKES = [
  {
    title: <>Your request took off,<br />found nothing,<br />and did not survive re-entry.</>,
    sub: <>The page was either <strong>never written</strong>, <strong>renamed by committee</strong>, or <strong>deleted during a refactor that was "just cleanup"</strong>. The PR description said <em>"minor housekeeping"</em>. It was not minor. It was not housekeeping.</>,
    logs: [
      '> checking if page exists...',
      '> it does not.',
      '> checking if it ever existed...',
      '> also no.',
      '> blaming the intern...',
      '> intern quit in 2023.',
      '> blaming the senior dev...',
      '> senior dev is "in a meeting".',
      '> reverting to last known good state...',
      '> last known good state: 404.',
      '> shipping anyway. 🚀',
    ],
    footnote: <>Error code: <code>PEBKAC-404</code> · Confidence level: extremely high · Root cause: <em>vibes</em></>,
  },
  {
    title: <>The page exists.<br />Just not in this dimension.<br />Or this server.</>,
    sub: <>Some engineer wrote <code>router.delete('/this-page')</code> and called it a "small cleanup commit". The commit message was <em>"misc"</em>. It is always <em>"misc"</em>.</>,
    logs: [
      '> initializing search...',
      '> grep -r "this page" ./',
      '> no matches found.',
      '> expanding search to prod...',
      '> expanding search to staging...',
      '> expanding search to "Dave\'s laptop"...',
      '> Dave left the company.',
      '> expanding search to the void...',
      '> the void says: 404.',
      '> closing ticket as "works as designed". 🎫',
    ],
    footnote: <>Last seen: <code>never</code> · Git blame: <em>Dave</em> · Dave\'s status: <em>unavailable</em></>,
  },
  {
    title: <>This URL was valid.<br />Someone had opinions<br />about folder structure.</>,
    sub: <>The page existed until someone opened a PR called <em>"cleanup: reorganize routes for scalability"</em>. No tests broke. No one noticed. For three weeks. Then you clicked this link.</>,
    logs: [
      '> tracing route...',
      '> found in v1 codebase.',
      '> v1 was deprecated "temporarily".',
      '> that was 4 years ago.',
      '> checking v2...',
      '> v2 has "upcoming" tag since 2022.',
      '> checking v3...',
      '> v3 is a Notion doc with no assignee.',
      '> escalating to engineering leadership...',
      '> auto-reply: currently OOO. 🏖️',
    ],
    footnote: <>Ticket status: <code>WONT_FIX</code> · Priority: <em>P4</em> · ETA: <em>next quarter</em></>,
  },
  {
    title: <>HTTP 404:<br />The server looked.<br />It looked really hard.</>,
    sub: <>It checked every folder. It walked every route. It even looked in <code>node_modules</code>, which took 45 seconds and found 800MB of <strong>not this page</strong>.</>,
    logs: [
      '> starting exhaustive search...',
      '> checked /public ... nothing.',
      '> checked /src ... nothing.',
      '> checked /dist ... nothing.',
      '> checked node_modules ...',
      '> still checking node_modules ...',
      '> found 847 deprecated packages.',
      '> found 3 critical vulnerabilities.',
      '> found 1 "TODO: fix later" from 2019.',
      '> did not find your page. 📦',
    ],
    footnote: <>node_modules size: <code>847MB</code> · Your page size: <em>0 bytes</em> · Fair: <em>no</em></>,
  },
  {
    title: <>The good news:<br />nothing is broken.<br />The bad news: nothing is here.</>,
    sub: <>The server is healthy. The database is up. The CDN is responding. Everything is working perfectly, except for the part where <strong>this page does not exist</strong>. Peak uptime. Zero content.</>,
    logs: [
      '> running health checks...',
      '> server: ✓ healthy',
      '> database: ✓ connected',
      '> cache: ✓ warm',
      '> CDN: ✓ responding',
      '> load balancer: ✓ balanced',
      '> uptime: ✓ 99.99%',
      '> requested page: ✗ does not exist',
      '> status: perfectly broken. 🏆',
    ],
    footnote: <>SLA: <code>99.99%</code> · Uptime: <em>excellent</em> · Your page: <em>not covered</em></>,
  },
];

export default function NotFoundPage() {
  const [joke] = useState(() => JOKES[Math.floor(Math.random() * JOKES.length)]);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      const i = indexRef.current;
      if (i < joke.logs.length) {
        setVisibleLogs((prev) => [...prev, joke.logs[i]]);
        indexRef.current = i + 1;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 340);
    return () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
  }, [joke.logs]);

  return (
    <main className="nf-shell">
      <div className="nf-inner">
        <div className="nf-runway" aria-hidden="true">
          <span className="nf-plane">✈️</span>
          <span className="nf-explosion">💥</span>
          <div className="nf-runway-line" />
        </div>

        <div className="nf-badge">HTTP 404</div>
        <h1 className="nf-title">{joke.title}</h1>
        <p className="nf-sub">{joke.sub}</p>

        <div className="nf-terminal" aria-label="Fake diagnostic output">
          <div className="nf-terminal-bar">
            <span /><span /><span />
            <code>diagnostic.sh — not-found-investigation</code>
          </div>
          <div className="nf-terminal-body">
            {visibleLogs.map((line, i) => (
              <p key={i} className={typeof line === 'string' && (line.includes('🚀') || line.includes('🏆') || line.includes('🏖️') || line.includes('🎫') || line.includes('📦')) ? 'nf-log-ship' : ''}>
                {line}
              </p>
            ))}
            {visibleLogs.length < joke.logs.length && <span className="nf-cursor">▊</span>}
          </div>
        </div>

        <div className="nf-actions">
          <a href="/" className="nf-btn-secondary">← Abort mission</a>
          <a href="/blogs" className="nf-btn-primary">Read things that exist ↗</a>
        </div>

        <p className="nf-footnote">{joke.footnote}</p>
      </div>
    </main>
  );
}
