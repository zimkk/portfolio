import { CSSProperties } from 'react';

const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

/* ------------------------------------------------------------------ */
/* Repository glyphs: 120 x 120, ink line art, volt for the live bit. */
/* ------------------------------------------------------------------ */

function cube(cx: number, cy: number, s: number) {
  const k = s * 0.866;
  return {
    top: `M${cx} ${cy - s / 2}L${cx + k} ${cy}L${cx} ${cy + s / 2}L${cx - k} ${cy}Z`,
    left: `M${cx - k} ${cy}L${cx} ${cy + s / 2}L${cx} ${cy + 1.5 * s}L${cx - k} ${cy + s}Z`,
    right: `M${cx} ${cy + s / 2}L${cx + k} ${cy}L${cx + k} ${cy + s}L${cx} ${cy + 1.5 * s}Z`,
  };
}

function Cube({ cx, cy, s, volt = false }: { cx: number; cy: number; s: number; volt?: boolean }) {
  const faces = cube(cx, cy, s);
  return (
    <>
      <path d={faces.left} className="g-paper" />
      <path d={faces.right} className="g-paper" style={{ fill: 'var(--side)' }} />
      <path d={faces.top} className={volt ? 'g-accent' : 'g-paper'} />
    </>
  );
}

const countyDots = Array.from({ length: 60 }, (_, index) => ({ x: 17 + (index % 10) * 9.6, y: 34 + Math.floor(index / 10) * 10.4, index }));
const liveCounties = new Map([[7, 0], [22, 0.6], [38, 1.2], [51, 1.8], [14, 2.2], [45, 2.6]]);

export function RepoGlyph({ repo }: { repo: string }) {
  switch (repo) {
    case 'wonderkit':
      return (
        <svg viewBox="0 0 120 120" className="hn-repo-glyph" aria-hidden="true">
          <path d="M60 60L24 24M60 60L96 24M60 60L24 96M60 60L96 96" className="g-line g-flow" />
          <rect x="43" y="43" width="34" height="34" rx="9" className="g-accent" />
          <path d="M53 60h14M60 53v14" className="g-line" />
          {[[24, 24], [96, 24], [96, 96], [24, 96]].map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r="11" className="g-paper g-pulse" style={delay(index * 0.6)} />
          ))}
        </svg>
      );
    case 'vigil':
      return (
        <svg viewBox="0 0 120 120" className="hn-repo-glyph" aria-hidden="true">
          <circle cx="60" cy="60" r="48" className="g-paper" />
          <circle cx="60" cy="60" r="32" className="g-soft" />
          <circle cx="60" cy="60" r="16" className="g-soft" />
          <path d="M60 12v96M12 60h96" className="g-soft" />
          <g className="g-sweep">
            <path d="M60 60L60 12A48 48 0 0 1 93.9 26Z" fill="var(--hn-accent)" opacity=".75" />
            <path d="M60 60V12" className="g-line" />
          </g>
          <circle cx="82" cy="40" r="4.5" className="g-paper g-blink" />
          <circle cx="40" cy="80" r="4.5" className="g-paper g-blink" style={delay(1.4)} />
          <circle cx="60" cy="60" r="3.5" fill="var(--fg)" />
        </svg>
      );
    case 'erdman-ny-county':
      return (
        <svg viewBox="0 0 120 120" className="hn-repo-glyph" aria-hidden="true">
          <rect x="6" y="20" width="108" height="78" rx="10" className="g-paper" />
          {countyDots.map(({ x, y, index }) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="var(--surface)"
              stroke="var(--fg)"
              strokeWidth="1.2"
              className={liveCounties.has(index) ? 'g-blink' : undefined}
              style={liveCounties.has(index) ? delay(liveCounties.get(index) ?? 0) : undefined}
            />
          ))}
          <path d="M84 104h26M84 110h16" className="g-soft" />
          <text x="10" y="112" fontFamily="var(--hn-mono)" fontSize="9" fill="var(--fg-2)">60 SITES</text>
        </svg>
      );
    case 'Lead-Scraper-Google-Maps':
      return (
        <svg viewBox="0 0 120 120" className="hn-repo-glyph" aria-hidden="true">
          {[0, 1, 2, 3].map((index) => (
            <rect key={index} x={14 + (index % 2) * 46} y={22 + Math.floor(index / 2) * 46} width="46" height="46" fill="var(--hn-accent)" className="g-cell" style={delay(index * 0.75)} />
          ))}
          <rect x="14" y="22" width="92" height="92" rx="4" className="g-line" />
          <path d="M60 22v92M14 68h92M37 22v92M83 22v92M14 45h92M14 91h92" className="g-soft" />
          <g className="g-bob">
            <path d="M60 66C60 66 45 50 45 40a15 15 0 0 1 30 0c0 10-15 26-15 26z" className="g-accent" />
            <circle cx="60" cy="40" r="5" className="g-paper" />
          </g>
        </svg>
      );
    case 'mynecraft':
      return (
        <svg viewBox="0 0 120 120" className="hn-repo-glyph" aria-hidden="true">
          <Cube cx={41} cy={60} s={22} />
          <Cube cx={79} cy={60} s={22} />
          <Cube cx={60} cy={71} s={22} />
          <g className="g-bob">
            <Cube cx={60} cy={30} s={22} volt />
          </g>
        </svg>
      );
    case 'legal-Document-Summerizer':
      return (
        <svg viewBox="0 0 120 120" className="hn-repo-glyph" aria-hidden="true">
          <path d="M26 12h48l20 20v76H26z" className="g-paper" />
          <path d="M74 12v20h20" className="g-line" />
          {[[36, 40, 44], [36, 52, 36], [36, 64, 48], [36, 76, 28]].map(([x, y, w], index) => (
            <g key={y}>
              <rect x={x - 2} y={y - 5} width={w + 4} height="9" rx="2" fill="var(--hn-accent)" className="g-hl" style={delay(index * 0.35)} />
              <path d={`M${x} ${y}h${w}`} className="g-line" />
            </g>
          ))}
          <circle cx="88" cy="94" r="15" className="g-accent" />
          <path d="M81 94l5 5 9-10" className="g-line g-draw" strokeWidth="2.6" />
        </svg>
      );
    case 'n8nhub':
      return (
        <svg viewBox="0 0 120 120" className="hn-repo-glyph" aria-hidden="true">
          <path d="M36 60h6c8 0 8-24 16-24h4M42 60c8 0 8 24 16 24h4M84 36h6c6 0 6 24 0 24M84 84h6c6 0 6-24 0-24" className="g-line g-flow" />
          <rect x="10" y="48" width="26" height="24" rx="7" className="g-paper" />
          <path d="M19 60l4-5v10z" fill="var(--fg)" />
          <rect x="60" y="24" width="24" height="24" rx="7" className="g-paper" />
          <rect x="60" y="72" width="24" height="24" rx="7" className="g-paper" />
          <circle cx="98" cy="60" r="10" className="g-accent g-pulse" />
          <path d="M66 36h12M66 84h12" className="g-soft" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Service glyphs: 84 x 64.                                            */
/* ------------------------------------------------------------------ */

export function ServiceGlyph({ slug, className = 'hn-svc-glyph' }: { slug: string; className?: string }) {
  const common = { viewBox: '0 0 84 64', className, 'aria-hidden': true } as const;
  switch (slug) {
    case 'forward-deployed-engineer':
      return (
        <svg {...common}>
          <path d="M4 50c10-8 16 6 26-2s14-10 22-2 18 6 28-4" className="hn-line-soft" />
          <path d="M42 46V12" className="hn-line" />
          <path d="M42 12h22l-6 7 6 7H42" className="g-accent" />
          <circle cx="42" cy="47" r="3.5" fill="var(--fg)" />
        </svg>
      );
    case 'applied-ai-consulting':
      return (
        <svg {...common}>
          <path d="M34 34l-9 16a4 4 0 0 0 3.5 6h27a4 4 0 0 0 3.5-6L50 34z" className="g-accent" />
          <path d="M34 8h16M36 8v26L22 56a4 4 0 0 0 3.5 6h33a4 4 0 0 0 3.5-6L48 34V8" className="hn-line" />
          <circle cx="40" cy="46" r="2.5" fill="var(--fg)" />
          <circle cx="48" cy="41" r="1.8" fill="var(--fg)" />
        </svg>
      );
    case 'ai-agent-development':
      return (
        <svg {...common}>
          <path d="M20 16l22 16M64 16L42 32M42 32v18" className="hn-line" />
          <circle cx="20" cy="16" r="8" className="g-paper" />
          <circle cx="64" cy="16" r="8" className="g-paper" />
          <circle cx="42" cy="32" r="10" className="g-accent g-pulse" />
          <circle cx="42" cy="54" r="6" className="g-paper" />
        </svg>
      );
    case 'n8n-automation-consultant':
      return (
        <svg {...common}>
          <path d="M22 32h10M52 32h10" className="hn-line g-flow" />
          <rect x="4" y="22" width="18" height="20" rx="5" className="g-paper" />
          <rect x="32" y="22" width="20" height="20" rx="5" className="g-accent" />
          <rect x="62" y="22" width="18" height="20" rx="5" className="g-paper" />
          <path d="M38 32h8M42 28v8" className="hn-line" />
        </svg>
      );
    case 'full-stack-software-development':
    default:
      return (
        <svg {...common}>
          <path d="M42 40l30-10-30-10-30 10z" className="g-paper" transform="translate(0 14)" />
          <path d="M42 40l30-10-30-10-30 10z" className="g-paper" transform="translate(0 2)" />
          <path d="M42 40l30-10-30-10-30 10z" className="g-accent" transform="translate(0 -10)" />
        </svg>
      );
  }
}

export function BrokenCable() {
  return (
    <svg viewBox="0 0 480 360" aria-hidden="true">
      <path d="M0 250C80 250 90 170 170 170h28" className="hn-line" strokeWidth="2.4" />
      <rect x="196" y="156" width="34" height="28" rx="6" className="g-paper" />
      <path d="M230 164h12M230 176h12" className="hn-line" strokeWidth="2.4" />
      <path d="M480 110C400 110 390 190 310 190h-28" className="hn-line" strokeWidth="2.4" />
      <rect x="250" y="176" width="34" height="28" rx="6" className="g-accent" />
      <path d="M266 186v8" className="hn-line" />
      <g transform="translate(246 160)">
        <path className="hn-spark" d="M0-34l4 10 10-4-6 9 9 6-11 1 1 11-7-8-7 8 1-11-11-1 9-6-6-9 10 4z" fill="var(--hn-accent)" stroke="var(--fg)" strokeWidth="1.4" strokeLinejoin="round" />
        <path className="hn-spark" d="M-20-8l-10-6M20-6l11-5M-14 10l-10 6" fill="none" stroke="var(--fg)" strokeWidth="1.8" strokeLinecap="round" />
        <circle className="hn-spark" cx="16" cy="18" r="3" fill="var(--fg)" />
      </g>
      <text x="240" y="300" textAnchor="middle" fontFamily="var(--hn-sans)" fontWeight="900" fontSize="96" letterSpacing="-5" fill="none" stroke="var(--fg)" strokeWidth="1.6">404</text>
    </svg>
  );
}
