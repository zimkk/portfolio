import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const stats = [
  { number: '5+', label: 'Years Experience' },
  { number: '100+', label: 'Solutions Delivered' },
  { number: '10K+', label: 'Daily Transactions' },
  { number: '99.9%', label: 'Platform Uptime' }
];

const focusAreas = [
  'Forward Deployed Engineering',
  'Applied AI Systems',
  'Event-Driven Automation',
  'Microservices & APIs',
  'Cloud & DevOps'
];

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeader index="01" label="About" title="Engineer, end to end." />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Prose */}
          <Reveal className="lg:col-span-3 space-y-6 text-neutral-300 leading-relaxed">
            <p className="text-lg text-white">
              I'm Hassan Nazir — a Forward Deployed Engineer working across
              applied AI, product engineering, and end-to-end systems delivery.
            </p>
            <p>
              I design REST and event-driven architectures that handle 10K+ daily
              transactions with 99.9% uptime. My work has cut operational costs by
              40% and improved workflow efficiency by 60% through intelligent
              backend automation.
            </p>
            <p>
              I focus on security, observability, and compliance-sensitive
              systems — clean service boundaries, production readiness, and
              measurable outcomes — while expanding Java and Spring Boot expertise
              alongside deep Python and API engineering work.
            </p>

            <div className="pt-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
                Focus Areas
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {focusAreas.map(area => (
                  <li key={area} className="flex items-center gap-3 text-neutral-300">
                    <span className="w-1 h-1 bg-neutral-500 rounded-full flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-px bg-neutral-900 border border-neutral-900 rounded-lg overflow-hidden">
              {stats.map(stat => (
                <div key={stat.label} className="bg-black p-6">
                  <div className="text-3xl font-semibold text-white tracking-tight">
                    {stat.number}
                  </div>
                  <div className="mt-1 text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
