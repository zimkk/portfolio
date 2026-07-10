import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const experiences = [{
  id: 1,
  role: 'AI Architect',
  company: 'Uno OS',
  period: 'Apr 2026 — Present',
  jobType: 'Full-time',
  location: 'Hybrid',
  achievements: [
    'Define AI system architecture, model integration patterns, and platform-level AI service boundaries',
    'Architect LLM and agent workflows aligned with OS-level reliability, security, and performance requirements',
    'Partner with engineering and product teams on roadmap planning, technical standards, and production delivery'
  ]
}, {
  id: 2,
  role: 'Full Stack Engineer',
  company: 'Gridcore',
  period: 'Dec 2023 — Present',
  jobType: 'Part-time',
  location: 'Hybrid',
  achievements: [
    'Defined company-wide technology strategy, including backend architecture standards and API design guidelines',
    'Architected cloud infrastructure and model deployment pipelines with 99.9% system reliability',
    'Led engineering and DevOps functions including container orchestration, CI/CD automation, and incident response',
    'Directed client-facing solution architecture aligned with business and compliance requirements'
  ]
}, {
  id: 3,
  role: 'Senior AI Engineer',
  company: 'NDT Legacy Group',
  period: 'Aug 2025 — Apr 2026',
  jobType: 'Full-time',
  location: 'Hybrid',
  achievements: [
    'Designed and deployed a microservice-based AI automation platform processing 10K+ daily transactions at 99.9% uptime',
    'Built RESTful APIs and event-driven workflows integrating internal services, third-party APIs, Redis queues, and webhooks',
    'Implemented governance controls, audit logging, monitoring, and alerting for reliability and traceability',
    'Led cross-functional engineering, DevOps, and QA teams through architecture, delivery, and production operations',
    'Reduced operational costs by 40% and improved workflow efficiency by 60% through backend service optimization'
  ]
}, {
  id: 4,
  role: 'Senior AI Engineer',
  company: 'Schmoozzer',
  period: 'Oct 2025 — Jan 2026',
  jobType: 'Contract',
  location: 'Remote',
  achievements: [
    'Designed and deployed backend automation workflows including document-processing pipelines and conversational APIs',
    'Engineered LLM-powered REST integrations with n8n orchestration and external services',
    'Delivered scalable, idempotent backend services for high-frequency asynchronous workloads'
  ]
}, {
  id: 5,
  role: 'QA Automation Engineer',
  company: 'Brilliant Gaming',
  period: 'Feb 2025 — Sep 2025',
  jobType: 'Contract',
  location: 'Remote',
  achievements: [
    'Led an 8-person QA team validating $2M+ in monthly payment transactions with direct exposure to payment system workflows',
    'Built automated testing frameworks (unit, integration, regression) that reduced testing time by 50%',
    'Engineered AI-powered test generation identifying 200+ security edge cases across API endpoints'
  ]
}, {
  id: 6,
  role: 'Independent Consultant',
  company: 'Fiverr / Upwork',
  period: '2019 — Present',
  jobType: 'Part-time',
  location: 'Remote',
  achievements: [
    'Built 100+ backend automation solutions integrating REST APIs, vector databases, and async task queues',
    'Developed and deployed scalable API services serving 10K+ users with high reliability',
    'Delivered 20+ LLM fine-tuning and model deployment projects on cloud infrastructure'
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
