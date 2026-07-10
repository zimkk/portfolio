import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const certifications = [
  {
    name: 'Certified Ethical Hacker — Practical (CEH-P)',
    issuer: 'NUST-NCAI / NAVTTC',
    date: '2024',
    description: 'EC-Council curriculum covering current cybersecurity operations and protocols, with hands-on work in Active Directory, network security, and OSINT.'
  },
  {
    name: 'Practical Ethical Hacking (PEH)',
    issuer: 'TCM Security Academy',
    date: '2024',
    description: 'Intermediate-level practical coursework in networking, Python scripting, and malware analysis.'
  },
  {
    name: 'ISO/IEC 27001 Information Security Associate',
    issuer: 'SkillFront',
    date: '2024',
    description: 'ISMS implementation, risk assessment and management, security policy development, and effectiveness review.'
  }
];

const Certifications = ({ }) => {
  return (
    <section id="certifications" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeader index="04" label="Credentials" title="Certifications" />

        <div className="divide-y divide-neutral-900 border-t border-b border-neutral-900">
          {certifications.map(cert => (
            <Reveal key={cert.name} className="py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12">
              <div>
                <p className="text-sm font-mono text-neutral-500">{cert.date}</p>
                <p className="mt-2 text-xs text-neutral-600">{cert.issuer}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{cert.name}</h3>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
