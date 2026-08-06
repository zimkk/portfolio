import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import EditorialNav from '../components/ui/EditorialNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { schemaIds, siteConfig } from '../config/metadata';

const workProjects = [
  {
    title: 'Enterprise AI Automation Platform',
    client: 'NDT Legacy Group',
    duration: '6 months',
    year: '2025',
    category: 'AI / Automation',
    description: 'A production automation platform spanning document processing, AI decision support, internal services, third-party APIs, queues, and audit controls.',
    image: '/images/ai-automation.jpg',
    technologies: ['Python', 'n8n', 'LangChain', 'OpenAI API', 'PostgreSQL', 'Docker'],
    challenges: ['Integrating legacy systems', 'Real-time processing at scale', 'Domain-specific model behavior'],
    solutions: ['Custom API bridges and service boundaries', 'Event-driven workflows backed by Redis', 'Evaluation datasets and tuned model integrations'],
    results: ['60% less manual processing', '95% automated-decision accuracy', '$200K+ estimated annual savings'],
    stats: [['Manual work', '−60%'], ['Accuracy', '95%'], ['Annual value', '$200K+']],
    href: 'https://n8nhub.hassannazir.dev',
  },
  {
    title: 'Cloud Security Monitoring System',
    client: 'Gridcore',
    duration: '5 months',
    year: '2024—2025',
    category: 'Cloud / Security',
    description: 'A threat-detection and incident-response layer for distributed cloud infrastructure, designed to improve signal quality without interrupting legitimate operations.',
    image: '/images/cloud.jpg',
    technologies: ['Python', 'AWS', 'Terraform', 'Grafana', 'Elasticsearch', 'Docker'],
    challenges: ['Cross-environment threat detection', 'Reducing false-positive noise', 'Safe automated response'],
    solutions: ['ML-assisted anomaly detection', 'Context-aware alert filtering', 'Graduated response with manual override'],
    results: ['99.2% monitored-system uptime', '85% faster incident response', 'Zero successful breaches during deployment'],
    stats: [['Uptime', '99.2%'], ['Response', '−85%'], ['Breaches', '0']],
  },
  {
    title: 'Automated QA Testing Framework',
    client: 'Brilliant Gaming',
    duration: '4 months',
    year: '2025',
    category: 'Quality / Testing',
    description: 'A modular automation framework for critical gaming and payment journeys, integrated into CI/CD and designed for reliable parallel execution.',
    image: '/images/software-testing.jpg',
    technologies: ['Python', 'Selenium', 'Pytest', 'Jenkins', 'Allure', 'Docker'],
    challenges: ['Complex transaction scenarios', 'Existing CI/CD integration', 'Cross-environment test reliability'],
    solutions: ['Reusable modular test architecture', 'Parallel execution and resource allocation', 'Environment-independent configuration'],
    results: ['70% less manual test time', '95% critical-journey coverage', '50% faster release cycles'],
    stats: [['Testing time', '−70%'], ['Coverage', '95%'], ['Release speed', '+50%']],
  },
];

const WorkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All work');
  const categories = ['All work', ...workProjects.map((project) => project.category)];
  const visibleProjects = selectedCategory === 'All work' ? workProjects : workProjects.filter((project) => project.category === selectedCategory);
  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected engineering case studies by Hassan Nazir',
    numberOfItems: workProjects.length,
    itemListElement: workProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        image: `${siteConfig.url}${project.image}`,
        creator: { '@id': schemaIds.personId },
        dateCreated: project.year.slice(0, 4),
        keywords: project.technologies.join(', '),
        url: project.href || `${siteConfig.url}/work`,
      },
    })),
  };

  return (
    <PageTransition>
      <SEOHead page="work" jsonLd={workSchema} />
      <main className="route-shell overflow-x-hidden w-full max-w-full">
        <EditorialNav />
        <section className="archive-hero">
          <p>Case studies in production AI, cloud security, and quality engineering.</p>
          <h1>Systems that made it past the demo.</h1>
          <div><span>Architecture</span><span>Implementation</span><span>Operational evidence</span></div>
        </section>

        <div className="archive-filters" role="group" aria-label="Filter case studies">
          {categories.map((category) => <button type="button" key={category} onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category}>{category}</button>)}
        </div>

        <section className="study-list">
          {visibleProjects.map((project) => (
            <article className="study" key={project.title}>
              <div className="study-heading">
                <p>{project.category} · {project.year}</p>
                <h2>{project.title}</h2>
                <div><span>{project.client}</span><span>{project.duration}</span></div>
              </div>
              <div className="study-media"><img src={project.image} alt={project.title} /></div>
              <div className="study-overview">
                <p>{project.description}</p>
                <ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer">Open related product <ArrowUpRight size={16} /></a>}
              </div>
              <div className="study-stats">{project.stats.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
              <div className="study-detail">
                <div><h3>The constraint</h3><ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>The engineering response</h3><ul>{project.solutions.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h3>What changed</h3><ul>{project.results.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
            </article>
          ))}
        </section>

        <section className="route-cta"><p>Have a system with real constraints?</p><h2>Let’s work through the difficult part.</h2><a href="/#contact">Start with a concise brief <ArrowRight size={18} /></a></section>
      </main>
    </PageTransition>
  );
};

export default WorkPage;
