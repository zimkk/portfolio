import { useMemo, useState } from 'react';
import { useInView } from '../hooks';
import Ico from './Ico';

type Role = {
  id: string;
  org: string;
  role: string;
  segments: Array<[number, number | 'now']>;
  period: string;
  mode: string;
  detail: string;
  edu?: boolean;
};

const at = (year: number, month: number) => year + (month - 1) / 12;

const ROLES: Role[] = [
  { id: 'touchstone', org: 'Touchstone Communications', role: 'QA Executive', segments: [[at(2020, 7), at(2021, 6)], [at(2022, 12), at(2023, 12)]], period: 'Jul 2020 to May 2021, Dec 2022 to Nov 2023', mode: 'Part-time · Hybrid', detail: 'Quality, compliance and internal systems QA across 14+ teams. Where I learned to test the unhappy path first.' },
  { id: 'air', org: 'Air University', role: 'BS Computer Science', segments: [[at(2020, 9), at(2024, 7)]], period: '2020 to 2024', mode: 'Islamabad', detail: 'Bachelor of Science in Computer Science.', edu: true },
  { id: 'gridcore', org: 'GridCore', role: 'Software Architect', segments: [[at(2021, 8), at(2026, 11)]], period: 'Aug 2021 to Oct 2026', mode: 'Full-time · Hybrid', detail: 'Promoted into lead architect across web, mobile and desktop teams. Client discovery, NestJS and React delivery, and applied AI where it actually helps operations. Moved on in October 2026 after five years.' },
  { id: 'brilliant', org: 'Brilliant Gaming', role: 'Lead QA Engineer', segments: [[at(2025, 2), at(2025, 10)]], period: 'Feb 2025 to Sep 2025', mode: 'Contract · Remote', detail: 'Led an eight-person QA team on payment-critical casino flows. UI, API and regression coverage.' },
  { id: 'ndt', org: 'NDT Legacy Group', role: 'Senior AI Engineer', segments: [[at(2025, 8), at(2026, 5)]], period: 'Aug 2025 to Apr 2026', mode: 'Part-time · Remote', detail: 'Client AI automation from discovery to production, with n8n, Zapier, REST APIs and LLM integrations.' },
  { id: 'schmoozzer', org: 'Schmoozzer', role: 'Senior AI Engineer', segments: [[at(2025, 10), at(2026, 2)]], period: 'Oct 2025 to Jan 2026', mode: 'Contract · Remote', detail: 'Small business automation with LLMs and n8n across seven or eight clients, including auditing and reporting workflows.' },
  { id: 'uno', org: 'Uno OS', role: 'AI Architect', segments: [[at(2026, 5), 'now']], period: 'May 2026 to now', mode: 'Part-time · Remote', detail: 'The final technical call on the AI and software portfolio. Architecting an AI-native business OS with a team of seven.' },
  { id: 'anthology', org: 'Anthology', role: 'ML Researcher', segments: [[at(2026, 10), 'now']], period: 'Oct 2026 to now', mode: 'Contract · Part-time', detail: 'Inference optimisation and GPU kernels, and research on frontier LLMs.' },
  { id: 'outsentia', org: 'Outsentia', role: 'AI Environment Engineer', segments: [[at(2026, 10), 'now']], period: 'Oct 2026 to now', mode: 'Full-time', detail: 'Joined full time in October 2026.' },
];

const START = at(2020, 5);

export default function CareerTimeline() {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: '0px 0px -15% 0px' });
  const [active, setActive] = useState('outsentia');
  const now = useMemo(() => {
    const date = new Date();
    return date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365;
  }, []);
  const end = now + 0.45;
  const span = end - START;
  const x = (value: number) => `${((value - START) / span) * 100}%`;
  const years = Array.from({ length: Math.floor(end) - 2020 }, (_, index) => 2021 + index).filter((year) => year < now - 0.2);
  const current = ROLES.find((role) => role.id === active) ?? ROLES[ROLES.length - 1];

  return (
    <div className="hn-career">
      <div ref={ref} className={`hn-gantt${inView ? ' is-in' : ''}`}>
        <div className="hn-gantt-axis">
          {years.map((year) => <span key={year} className="hn-mono" style={{ left: x(year) }}>{year}</span>)}
        </div>
        <div className="hn-gantt-rows">
          <div className="hn-gantt-grid" aria-hidden="true">
            {years.map((year) => <i key={year} style={{ left: x(year) }} />)}
            <span className="hn-gantt-now" style={{ left: x(now) }}><span className="hn-mono">Now</span></span>
          </div>
          {ROLES.map((role, index) => (
            <button
              key={role.id}
              type="button"
              className={`hn-gantt-row${role.id === active ? ' is-active' : ''}`}
              onPointerEnter={() => setActive(role.id)}
              onFocus={() => setActive(role.id)}
              onClick={() => setActive(role.id)}
              aria-pressed={role.id === active}
            >
              <span>{role.org}<small>{role.role}</small></span>
              <span className="hn-gantt-track" aria-hidden="true">
                {role.segments.map(([from, to], segment) => {
                  const stop = to === 'now' ? now : to;
                  return (
                    <span
                      key={segment}
                      className={`hn-gantt-bar${role.edu ? ' is-edu' : ''}${to === 'now' ? ' is-live' : ''}`}
                      style={{ left: x(from), width: `${((stop - from) / span) * 100}%`, animationDelay: `${index * 90}ms` }}
                    >
                      {to === 'now' && <Ico size={14} />}
                    </span>
                  );
                })}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="hn-career-detail" key={current.id}>
        <h3 className="hn-stack-swap">{current.role}<br /><span style={{ fontWeight: 400, fontSize: 17, letterSpacing: 0 }}>{current.org}</span></h3>
        <p className="hn-stack-swap">{current.detail}</p>
        <span className="hn-mono">{current.period}<br />{current.mode}</span>
      </div>
    </div>
  );
}
