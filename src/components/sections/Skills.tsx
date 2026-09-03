import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const skillGroups = [
  {
    name: 'Backend & APIs',
    description: 'Core backend engineering stack for distributed systems, API design, and production services',
    skills: [
      'Python',
      'REST API Design & Versioning',
      'Microservices Architecture',
      'Event-Driven Systems',
      'FastAPI',
      'Node.js',
      'Java / Spring Boot'
    ]
  },
  {
    name: 'Data & AI/ML',
    description: 'Databases, LLM tooling, and ML frameworks for applied AI systems and intelligent automation',
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis / Queues',
      'LangChain / RAG',
      'OpenAI / Claude APIs',
      'PyTorch',
      'TensorFlow',
      'Hugging Face Fine-tuning'
    ]
  },
  {
    name: 'Cloud, Security & Quality',
    description: 'Cloud, DevOps, security, and testing practices for reliable and compliance-aware delivery',
    skills: [
      'AWS',
      'GCP',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Jenkins',
      'OAuth2 / JWT',
      'Audit Logging & Monitoring',
      'Selenium / Playwright',
      'Linux Administration'
    ]
  }
];

const Skills = ({ }: { darkMode?: boolean }) => {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          index="03"
          label="Skills"
          title="Technical stack"
        />

        <div className="space-y-12">
          {skillGroups.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.08} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12">
              <div>
                <h3 className="text-white font-medium">{group.name}</h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                  {group.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 content-start">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-neutral-300 border border-neutral-800 rounded-md hover:border-neutral-600 hover:text-white transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
