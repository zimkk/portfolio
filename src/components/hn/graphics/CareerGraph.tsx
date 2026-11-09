import { useEffect, useMemo, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks';
import Ico from './Ico';

/*
 * Career as `git log --graph`, roles only, with a time series alongside.
 * Each track is a discipline; they merge into forward-deployed and HEAD is the
 * current role. Every row shows when it started and ended, as text and as a bar
 * on one shared axis from the first role to today.
 */

type Month = [number, number];
type Commit = {
  lane: number;
  name: string;
  msg: string;
  start: Month;
  end: Month | 'now';
  title: string;
  mode?: string;
  detail: string;
  merge?: boolean;
};

const LANES = ['forward-deployed', 'full-stack', 'ai', 'qa'];

// Roles only, newest first, like `git log`. Real role dates.
const COMMITS: Commit[] = [
  { lane: 0, merge: true, name: 'outsentia', msg: 'AI environment engineer', start: [2026, 10], end: 'now', title: 'AI Environment Engineer at Outsentia', mode: 'Full-time', detail: 'Joined full time in October 2026.' },
  { lane: 2, name: 'anthology', msg: 'ML researcher, inference and GPU kernels', start: [2026, 10], end: 'now', title: 'ML Researcher at Anthology', mode: 'Contract · Part-time', detail: 'Inference optimisation and GPU kernels, and research on frontier LLMs.' },
  { lane: 0, merge: true, name: 'uno-os', msg: 'merge qa, full-stack, ai: AI architect', start: [2026, 5], end: 'now', title: 'AI Architect at Uno OS', mode: 'Part-time · Remote', detail: 'Where the three tracks meet: the final technical call on the AI and software portfolio of an AI-native business OS.' },
  { lane: 2, name: 'schmoozzer', msg: 'senior AI engineer', start: [2025, 10], end: [2026, 1], title: 'Senior AI Engineer at Schmoozzer', mode: 'Contract · Remote', detail: 'Small business automation with LLMs and n8n across seven or eight clients, including auditing and reporting workflows.' },
  { lane: 2, name: 'ndt-legacy', msg: 'senior AI engineer', start: [2025, 8], end: [2026, 4], title: 'Senior AI Engineer at NDT Legacy Group', mode: 'Part-time · Remote', detail: 'Client AI automation from discovery to production, with n8n, Zapier, REST APIs and LLM integrations.' },
  { lane: 3, name: 'brilliant-gaming', msg: 'lead QA engineer', start: [2025, 2], end: [2025, 9], title: 'Lead QA Engineer at Brilliant Gaming', mode: 'Contract · Remote', detail: 'Led an eight-person QA team on payment-critical casino flows, with UI, API and regression coverage.' },
  { lane: 3, name: 'touchstone', msg: 'back for a second stint', start: [2022, 12], end: [2023, 11], title: 'QA Executive at Touchstone, again', mode: 'Part-time · Hybrid', detail: 'A second stint on quality, compliance and internal systems QA across 14+ teams.' },
  { lane: 1, name: 'gridcore', msg: 'full-stack engineer to lead architect', start: [2021, 8], end: [2026, 10], title: 'Software Architect at GridCore', mode: 'Full-time · Hybrid', detail: 'Joined as a full-stack engineer and was promoted into lead architect across web, mobile and desktop teams. Moved on in October 2026, after five years.' },
  { lane: 3, name: 'touchstone', msg: 'init: QA executive', start: [2020, 7], end: [2021, 5], title: 'QA Executive at Touchstone Communications', mode: 'Part-time · Hybrid', detail: 'The first role. Where I learned to test the unhappy path first, while studying CS at Air University.' },
];

const ROW = 46;
const GAP = 20;
const X0 = 11;
const LAST = COMMITS.length - 1;
const x = (lane: number) => X0 + lane * GAP;
const y = (row: number) => row * ROW + ROW / 2;
const curve = (x1: number, y1: number, x2: number, y2: number, move = true) =>
  `${move ? 'M' : 'L'}${x1} ${y1} C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}`;

/*
 * qa starts everything (row 8) and merges at Uno OS (row 2).
 * full-stack branches off qa at GridCore (row 7), merges at Uno OS and at HEAD.
 * ai branches off full-stack at NDT Legacy (row 4), merges at Uno OS and at HEAD.
 */
const PATHS = [
  { lane: 0, d: `M${x(0)} ${y(2)} V${y(0)}` },
  { lane: 3, d: `M${x(3)} ${y(LAST)} V${y(3)} ${curve(x(3), y(3), x(0), y(2), false)}` },
  { lane: 1, d: `${curve(x(3), y(LAST), x(1), y(7))} V${y(1)} ${curve(x(1), y(1), x(0), y(0), false)}` },
  { lane: 1, d: curve(x(1), y(3), x(0), y(2)) },
  { lane: 2, d: `${curve(x(1), y(5), x(2), y(4))} V${y(1)} ${curve(x(2), y(1), x(0), y(0), false)}` },
  { lane: 2, d: curve(x(2), y(3), x(0), y(2)) },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const at = ([year, month]: Month) => year + (month - 1) / 12;
const label = ([year, month]: Month) => `${MONTHS[month - 1]} ${year}`;
const range = (commit: Commit) => `${label(commit.start)} → ${commit.end === 'now' ? 'now' : label(commit.end)}`;

const hashOf = (text: string) => {
  let h = 2166136261;
  for (const char of text) h = Math.imul(h ^ char.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

export default function CareerGraph() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '-15% 0px' });
  const [seen, setSeen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [holding, setHolding] = useState(false);
  const width = x(LANES.length - 1) + 12;
  const height = COMMITS.length * ROW;
  const current = COMMITS[selected];

  // One shared time axis, from the first role to a little past today.
  const { now, start, span, years } = useMemo(() => {
    const date = new Date();
    const today = date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365;
    const first = at(COMMITS[LAST].start);
    const last = today + 0.2;
    return {
      now: today,
      start: first,
      span: last - first,
      // Year marks, leaving room for the 'now' label at the end.
      years: Array.from({ length: Math.floor(today) - Math.ceil(first) + 1 }, (_, index) => Math.ceil(first) + index).filter((year) => year % 2 === 1 && today - year > 0.9),
    };
  }, []);
  const pos = (value: number) => `${((value - start) / span) * 100}%`;
  const bar = (commit: Commit) => {
    const from = at(commit.start);
    const to = commit.end === 'now' ? now : at(commit.end) + 1 / 12;
    return { left: pos(from), width: `max(4px, ${((to - from) / span) * 100}%)` };
  };

  useEffect(() => { if (inView) setSeen(true); }, [inView]);

  // Walk through the history on its own while nobody is pointing at it.
  useEffect(() => {
    if (reduced || holding || !inView) return;
    const id = window.setInterval(() => setSelected((value) => (value + 1) % COMMITS.length), 3200);
    return () => window.clearInterval(id);
  }, [reduced, holding, inView]);

  return (
    <div ref={ref} className={`hn-cg${seen ? ' is-in' : ''}`} style={{ ['--graph-w' as string]: `${width}px`, ['--now' as string]: pos(now) }}>
      <div className="hn-cg-log" onPointerLeave={() => setHolding(false)}>
        <div className="hn-cg-top">
          <p className="hn-cg-prompt hn-mono">git log --graph --all</p>
          <div className="hn-cg-axis hn-mono" aria-hidden="true">
            {years.map((year) => <span key={year} style={{ left: pos(year) }}>&rsquo;{String(year).slice(2)}</span>)}
            <span className="is-now" style={{ left: pos(now) }}>now</span>
          </div>
        </div>
        <div className="hn-cg-body">
          <svg className="hn-cg-graph" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
            {PATHS.map((path, index) => (
              <path
                key={index}
                d={path.d}
                pathLength={1}
                className={`hn-cg-lane${path.lane === current.lane ? ' is-on' : ''}${path.lane === 0 ? ' is-main' : ''}`}
                style={{ animationDelay: `${0.1 + (PATHS.length - index) * 0.08}s` }}
              />
            ))}
            {COMMITS.map((commit, row) => (
              row === 0 ? (
                <g key={row} className="hn-cg-head" transform={`translate(${x(0) - 10.5} ${y(0) - 10.5}) scale(0.875)`}>
                  <path d="M12 1.5L21.5 6.6L21.5 17.4L12 22.5L2.5 17.4L2.5 6.6Z" className="hn-cg-head-bg" />
                  <Ico size={24} />
                </g>
              ) : (
                <circle
                  key={row}
                  cx={x(commit.lane)}
                  cy={y(row)}
                  r={commit.merge ? 5 : 4.5}
                  className={`hn-cg-dot${commit.merge ? ' is-merge' : ''}${row === selected ? ' is-on' : ''}`}
                  style={{ animationDelay: `${0.2 + (LAST - row) * 0.07}s` }}
                />
              )
            ))}
          </svg>
          <ol className="hn-cg-rows">
            {COMMITS.map((commit, row) => (
              <li key={row} style={{ animationDelay: `${0.2 + (LAST - row) * 0.07}s` }}>
                <button
                  type="button"
                  className={`hn-cg-row${row === selected ? ' is-on' : ''}${row === 0 ? ' is-head' : ''}`}
                  aria-pressed={row === selected}
                  aria-label={`${commit.title}, ${range(commit)}`}
                  onPointerEnter={() => { setHolding(true); setSelected(row); }}
                  onFocus={() => { setHolding(true); setSelected(row); }}
                  onClick={() => { setHolding(true); setSelected(row); }}
                >
                  <span className="who">
                    <span className="name">{row === 0 ? 'HEAD' : commit.name}</span>
                    <span className="msg">{row === 0 ? `${commit.name}: ${commit.msg}` : commit.msg}</span>
                  </span>
                  <span className="range hn-mono">{range(commit)}</span>
                  <span className="track" aria-hidden="true">
                    <i className={commit.end === 'now' ? 'is-live' : undefined} style={bar(commit)} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <aside className="hn-cg-card">
        <div key={selected} className="hn-cg-card-inner">
          <p className="hn-cg-card-meta hn-mono">
            <span>commit {hashOf(`${current.name}${current.start.join('-')}`)}</span>
            <span className="hn-cg-branch"><i />{LANES[current.lane]}</span>
          </p>
          <h3>{selected === 0 && <Ico size={22} />}{current.title}</h3>
          <p className="hn-cg-card-when hn-mono">{[range(current), current.mode].filter(Boolean).join(' · ')}</p>
          <p className="hn-cg-card-detail">{current.detail}</p>
        </div>
        <div className="hn-cg-legend" aria-hidden="true">
          {LANES.map((lane, index) => <span key={lane} className={index === current.lane ? 'is-on' : undefined}><i />{lane}</span>)}
        </div>
      </aside>
    </div>
  );
}
