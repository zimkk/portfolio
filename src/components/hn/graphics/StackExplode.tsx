import { ReactNode, useEffect, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks';

type Layer = { key: string; label: string; name: string; line: string; tools: string[]; glyph: ReactNode };

const LAYERS: Layer[] = [
  {
    key: 'interface', label: 'INTERFACE', name: 'Interface', line: 'The part people actually click.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    glyph: <><rect x="18" y="18" width="64" height="64" rx="6" /><path d="M18 32h64M28 44h22M28 54h34M28 64h14" /></>,
  },
  {
    key: 'services', label: 'SERVICES', name: 'Services', line: 'APIs that say clearly when they fail.',
    tools: ['NestJS', 'FastAPI', 'Node.js', 'REST', 'Webhooks'],
    glyph: <path d="M18 30h56l-8-7M18 50h56l-8-7M82 70H26l8 7" />,
  },
  {
    key: 'models', label: 'MODELS', name: 'Intelligence', line: 'Models, kept on a short leash.',
    tools: ['Claude', 'OpenAI', 'LangGraph', 'Ollama', 'RAG', 'Evals'],
    glyph: <><circle cx="28" cy="28" r="7" /><circle cx="72" cy="28" r="7" /><circle cx="50" cy="52" r="9" /><circle cx="28" cy="76" r="7" /><circle cx="72" cy="76" r="7" /><path d="M34 33l9 12M66 33l-9 12M34 71l9-12M66 71l-9-12" /></>,
  },
  {
    key: 'automation', label: 'AUTOMATION', name: 'Automation', line: 'The boring work, done on schedule.',
    tools: ['n8n', 'Playwright', 'Queues', 'Cron', 'Zapier'],
    glyph: <><rect x="14" y="40" width="20" height="20" rx="5" /><rect x="44" y="20" width="20" height="20" rx="5" /><rect x="44" y="60" width="20" height="20" rx="5" /><rect x="74" y="40" width="14" height="20" rx="5" /><path d="M34 50h4l6-20M38 50l6 20M64 30l10 16M64 70l10-16" /></>,
  },
  {
    key: 'data', label: 'DATA', name: 'Data', line: 'Where the truth lives. Usually.',
    tools: ['PostgreSQL', 'pgvector', 'Redis', 'MongoDB', 'Supabase'],
    glyph: <path d="M18 24h64M18 40h64M18 56h64M18 72h64M40 18v62M62 18v62" />,
  },
  {
    key: 'infra', label: 'INFRA', name: 'Infrastructure', line: 'Boxes that stay up at 3am.',
    tools: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'CI/CD'],
    glyph: <><rect x="18" y="18" width="26" height="26" rx="4" /><rect x="56" y="18" width="26" height="26" rx="4" /><rect x="18" y="56" width="26" height="26" rx="4" /><rect x="56" y="56" width="26" height="26" rx="4" /></>,
  },
];

const CX = 240;
const W = 300;
const D = 150;
const H = 14;
const TOP = 112;
const GAP = 64;

export default function StackExplode() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '-15% 0px' });
  const [active, setActive] = useState(2);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (reduced || held || !inView) return;
    const id = window.setInterval(() => setActive((value) => (value + 1) % LAYERS.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, held, inView]);

  const layer = LAYERS[active];
  const offset = (index: number) => (index === active ? -20 : index < active ? -10 : 0);

  return (
    <div ref={ref} className="hn-stack">
      <div className="hn-stack-art" onPointerLeave={() => setHeld(false)}>
        <svg viewBox="0 0 560 560" role="group" aria-label="The stack, top to bottom">
          {/* Security spine: runs through every layer */}
          <line x1="58" y1="70" x2="58" y2={TOP + GAP * 5 + 14} className="hn-pin-line" />
          <line x1="58" y1="70" x2="58" y2={TOP + GAP * 5 + 14} className="hn-pin-core" />
          <circle cx="58" cy="62" r="9" fill="var(--hn-accent)" stroke="var(--fg)" strokeWidth="1.6" />
          <path d="M54 62l3 3 5-6" className="hn-line" strokeWidth="1.6" />
          <text x="58" y="36" textAnchor="middle" className="hn-plate-label">SECURITY</text>
          <text x="58" y="48" textAnchor="middle" className="hn-plate-label" fontSize="9">EVERY LAYER</text>

          {[...LAYERS].reverse().map((item) => {
            const index = LAYERS.indexOf(item);
            const cy = TOP + index * GAP;
            const isActive = index === active;
            const t = `${CX} ${cy - D / 2}`;
            const r = `${CX + W / 2} ${cy}`;
            const b = `${CX} ${cy + D / 2}`;
            const l = `${CX - W / 2} ${cy}`;
            return (
              <g
                key={item.key}
                className={`hn-plate${isActive ? ' is-active' : ''}`}
                style={{ transform: `translateY(${offset(index)}px)` }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${item.name}: ${item.tools.join(', ')}`}
                onPointerEnter={() => { setHeld(true); setActive(index); }}
                onFocus={() => { setHeld(true); setActive(index); }}
                onClick={() => setActive(index)}
              >
                <line x1="58" y1={cy + H / 2} x2={CX - W / 2} y2={cy + H / 2} className="hn-plate-leader" />
                <circle cx="58" cy={cy + H / 2} r="3.5" fill="var(--fg)" />
                <path className="side" d={`M${l} L${b} L${r} L${CX + W / 2} ${cy + H} L${CX} ${cy + D / 2 + H} L${CX - W / 2} ${cy + H} Z`} />
                <path className="top" d={`M${t} L${r} L${b} L${l} Z`} />
                <g className="glyph" transform={`matrix(${W / 200} ${D / 200} ${-W / 200} ${D / 200} ${CX} ${cy - D / 2})`}>{item.glyph}</g>
                <path className={`hn-plate-leader${isActive ? ' is-active' : ''}`} d={`M${CX + W / 2 + 8} ${cy} H${CX + W / 2 + 46}`} />
                <text x={CX + W / 2 + 54} y={cy + 4} className={`hn-plate-label${isActive ? ' is-active' : ''}`}>{`0${index + 1} ${item.label}`}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="hn-stack-panel">
        <div key={layer.key} className="hn-stack-swap">
          <span className="hn-mono">Layer 0{active + 1} / 06</span>
          <h3>{layer.name}</h3>
          <p>{layer.line}</p>
          <ul>{layer.tools.map((tool) => <li key={tool} className="hn-chip">{tool}</li>)}</ul>
        </div>
        <div className="hn-stack-steps" role="group" aria-label="Choose a layer">
          {LAYERS.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={index === active ? 'is-active' : undefined}
              aria-label={item.name}
              onClick={() => { setHeld(true); setActive(index); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
