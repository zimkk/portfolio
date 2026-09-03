import { useEffect, useRef, useState } from 'react';

const API = 'https://witty-404.zimkk.workers.dev';

interface Joke {
  id: string;
  title: string;
  subtitle: string;
  logs: string[];
  footnote: string;
  emoji: string;
  pathTemplate?: string;
}

export default function NotFoundPage() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    fetch(`${API}/?path=${encodeURIComponent(path)}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: Joke) => setJoke(data))
      .catch(() => {
        setJoke({
          id: 'fallback',
          title: 'Your request took off,\nfound nothing,\nand did not survive re-entry.',
          subtitle: 'The page was either never written, renamed by committee, or deleted during a refactor that was "just cleanup". The PR description said "minor housekeeping". It was not minor.',
          logs: [
            '> checking if page exists...',
            '> it does not.',
            '> checking the API for a witty response...',
            '> the API also returned 404.',
            '> this is fine. 🔥',
          ],
          footnote: 'Error code: `PEBKAC-404` · Root cause: vibes',
          emoji: '✈️💥',
        });
      });
  }, []);

  useEffect(() => {
    if (!joke || timerRef.current) return;
    indexRef.current = 0;
    setVisibleLogs([]);
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
  }, [joke]);

  const displaySubtitle = joke?.pathTemplate
    ? joke.pathTemplate.replace('{path}', window.location.pathname)
    : joke?.subtitle ?? '';

  const titleLines = (joke?.title ?? '').split('\n');

  return (
    <main className="nf-shell">
      <div className="nf-inner">
        <div className="nf-runway" aria-hidden="true">
          <span className="nf-plane">✈️</span>
          <span className="nf-explosion">💥</span>
          <div className="nf-runway-line" />
        </div>

        <div className="nf-badge">HTTP 404</div>

        {joke ? (
          <>
            <h1 className="nf-title">
              {titleLines.map((line, i) => (
                <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
              ))}
            </h1>

            <p className="nf-sub">{displaySubtitle}</p>

            <div className="nf-terminal" aria-label="Diagnostic output">
              <div className="nf-terminal-bar">
                <span /><span /><span />
                <code>diagnostic.sh — not-found-investigation</code>
              </div>
              <div className="nf-terminal-body">
                {visibleLogs.map((line, i) => (
                  <p key={i} className={/[🚀🏆🏖️🎫📦🔥]/.test(line) ? 'nf-log-ship' : ''}>{line}</p>
                ))}
                {visibleLogs.length < joke.logs.length && <span className="nf-cursor">▊</span>}
              </div>
            </div>

            <div className="nf-actions">
              <a href="/" className="nf-btn-secondary">← Abort mission</a>
              <a href="/blogs" className="nf-btn-primary">Read things that exist ↗</a>
            </div>

            <p className="nf-footnote">
              {joke.footnote} · joke: <code>{joke.id}</code>
            </p>
          </>
        ) : (
          <div className="nf-loading">
            <p>Diagnosing the situation<span className="nf-cursor">▊</span></p>
          </div>
        )}
      </div>
    </main>
  );
}
