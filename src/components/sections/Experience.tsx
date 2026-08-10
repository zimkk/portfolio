import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const experiences = [{
  id: 1,
  role: 'Software Architect & Full-Stack Engineer',
  company: 'GridCore',
  period: 'Aug 2021 — Present',
  jobType: 'Hybrid',
  location: 'Islamabad, Pakistan',
  achievements: [
    'Promoted twice over a five-year tenure into a Lead Architect role, owning technical direction across web, cross-platform mobile, and desktop applications',
    'Architected and planned concurrent client projects, defining system boundaries, data models, API contracts, infrastructure, and engineering priorities',
    'Built and evolved IDitracker for IDitech Mexico, supporting 220+ employees and 200 clients with RBAC, real-time updates, audit logging, and inventory workflows',
    'Directed engineering across React, Next.js, TypeScript, NestJS, Node.js, Python, PostgreSQL, MongoDB, Redis, Docker, and CI/CD',
    'Integrated LLM applications, RAG, vector-backed retrieval, agent orchestration, and workflow automation into client systems'
  ]
}, {
  id: 2,
  role: 'AI Architect',
  company: 'Uno OS',
  period: 'May 2026 — Present',
  jobType: 'Part-time',
  location: 'Remote',
  achievements: [
    'Serve as final technical decision-maker for the AI and software portfolio, leading seven engineers across four client engagements',
    'Own technical discovery, scoping, estimation, and architecture planning from requirements through implementation roadmaps',
    'Architect an AI-native Business Operating System consolidating core business functions on Next.js, Node.js, and PostgreSQL',
    'Design autonomous workflow architecture for email operations, reporting, invoicing, and reminders',
    'Contribute to security architecture, secure code review, and application security design from the initial architecture phase'
  ]
}, {
  id: 3,
  role: 'Senior AI Engineer',
  company: 'NDT Legacy Group',
  period: 'Aug 2025 — Apr 2026',
  jobType: 'Part-time',
  location: 'Remote',
  achievements: [
    'Collaborated with clients to identify bottlenecks and deliver AI-driven automation across operational processes',
    'Led end-to-end engagements from discovery and solution architecture through implementation, testing, and post-production support',
    'Architected solutions using n8n, Zapier, REST APIs, and custom logic integrated with LLM and CRM systems',
    'Advanced to Senior AI Engineer with ownership of client architecture, complex delivery, and production troubleshooting'
  ]
}, {
  id: 4,
  role: 'Senior AI Engineer',
  company: 'Schmoozzer',
  period: 'Oct 2025 — Jan 2026',
  jobType: 'Contract',
  location: 'Remote',
  achievements: [
    'Architected AI-driven automation for SMBs using LLM services, n8n orchestration, and existing SaaS platforms',
    'Managed 7–8 client projects, overseeing solution architecture and supervising junior engineers',
    'Delivered an internal auditing and reporting automation system for a New York County sector central office',
    'Integrated third-party platforms via REST APIs, webhooks, vector databases, and agent-based components'
  ]
}, {
  id: 5,
  role: 'Lead QA Engineer',
  company: 'Brilliant Gaming',
  period: 'Feb 2025 — Sep 2025',
  jobType: 'Contract',
  location: 'Remote',
  achievements: [
    'Led an 8-person QA team validating EPWIN, a casino/gaming platform with real-money transaction flows',
    'Co-defined QA strategy, test planning, regression scope, and release criteria with development teams',
    'Led UI/E2E automation, API validation, regression, CI execution, and exploratory testing on payment-critical modules',
    'Participated in release sign-off and go/no-go decisions alongside principal engineers'
  ]
}, {
  id: 6,
  role: 'QA Executive',
  company: 'Touchstone Communications',
  period: 'Dec 2022 — Nov 2023',
  jobType: 'Part-time',
  location: 'Hybrid',
  achievements: [
    'Earlier stint Jul 2020 — May 2021; returned Dec 2022 — Nov 2023 for software quality and compliance',
    'Executed functional, regression, UAT, workflow, access-control, and data-validation testing across internal systems used by 14+ teams',
    'Authored test cases, defect reports, SOPs, compliance reports, and audit findings',
    'Owned new-hire software and compliance training during the final five months'
  ]
}];

const Experience = ({ }) => {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeader index="02" label="Experience" title="Where I've worked" />

        <div className="divide-y divide-neutral-900 border-t border-b border-neutral-900">
          {experiences.map(exp => (
            <Reveal key={exp.id}>
            <article className="py-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 group">
              <div>
                <p className="text-sm font-mono text-neutral-500">{exp.period}</p>
                <p className="mt-2 text-xs text-neutral-600">
                  {exp.jobType} · {exp.location}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {exp.role}
                  <span className="text-neutral-500 font-normal"> · {exp.company}</span>
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-400 leading-relaxed">
                      <span className="mt-2 w-1 h-1 bg-neutral-600 rounded-full flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
