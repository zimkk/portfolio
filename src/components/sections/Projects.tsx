import React from 'react';
import { GithubIcon, ArrowUpRightIcon } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const projects = [{
  title: 'The Home Club',
  description: 'Sports club platform for memberships, programs, and community engagement with a polished public-facing web experience.',
  technologies: ['React', 'Web App', 'Full Stack'],
  github: null,
  demo: 'https://thehomeclubsports.com',
  image: '/images/projects/the-home-club.webp'
}, {
  title: 'N8NHUB',
  description: 'Curated library of 2000+ n8n workflow templates for automation builders, with searchable categories and ready-to-use integrations.',
  technologies: ['n8n', 'Automation', 'Workflows'],
  github: null,
  demo: 'https://n8nhub.hassannazir.dev',
  image: '/images/projects/n8nhub.webp'
}, {
  title: 'SpeedyInfluencer',
  description: 'Influencer marketing platform connecting brands and creators with campaign tools, analytics, and streamlined collaboration workflows.',
  technologies: ['React', 'SaaS', 'Full Stack'],
  github: null,
  demo: 'https://speedyinfluencer.com',
  image: '/images/projects/speedyinfluencer.webp'
}, {
  title: 'SmartFurs',
  description: 'E-commerce platform for purebred puppies with breed listings, buyer discovery, and a modern storefront experience.',
  technologies: ['React', 'E-commerce', 'Web App'],
  github: null,
  demo: 'https://smartfurs.vercel.app',
  image: '/images/projects/smartfurs.webp'
}, {
  title: 'Fooocus',
  description: 'SDXL-based image generation tool focused on prompting and generating high-quality visuals with a streamlined, minimal setup.',
  technologies: ['Python', 'SDXL', 'GenAI'],
  github: 'https://github.com/zimkk/Fooocus',
  demo: null,
  image: 'https://raw.githubusercontent.com/lllyasviel/Fooocus/main/sdxl_styles/samples/artstyle_hyperrealism.jpg'
}, {
  title: 'erdman-ny-county',
  description: 'Backend-focused project with Python services and structured workflows for production-style application logic.',
  technologies: ['Python', 'Backend', 'APIs'],
  github: 'https://github.com/zimkk/erdman-ny-county',
  demo: null,
  image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200'
}, {
  title: 'Legal Document Summarizer',
  description: 'Application for summarizing legal documents using a fine-tuned LLM pipeline focused on domain-specific outputs.',
  technologies: ['Python', 'LLM', 'Fine-tuning'],
  github: 'https://github.com/zimkk/legal-Document-Summerizer',
  demo: null,
  image: 'https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg?auto=compress&cs=tinysrgb&w=1200'
}, {
  title: 'Anomaly Detection System',
  description: 'Python-based anomaly detection project for identifying unusual network behavior using data science techniques.',
  technologies: ['Python', 'Data Science', 'Security'],
  github: 'https://github.com/zimkk/Anomaly-Detection-System',
  demo: null,
  image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200'
}, {
  title: 'genAi',
  description: 'Experimental generative AI workspace for prototypes and practical GenAI implementation ideas.',
  technologies: ['TypeScript', 'GenAI', 'APIs'],
  github: 'https://github.com/zimkk/genAi',
  demo: null,
  image: 'https://images.pexels.com/photos/7942665/pexels-photo-7942665.jpeg?auto=compress&cs=tinysrgb&w=1200'
}];

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeader index="06" label="Work" title="Selected projects" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const href = project.demo ?? project.github;
            return (
              <Reveal key={project.title} delay={(i % 3) * 0.08} className="h-full">
              <a
                href={href ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full border border-neutral-900 rounded-lg overflow-hidden hover:border-neutral-700 transition-colors duration-300"
              >
                <div className="relative h-44 overflow-hidden border-b border-neutral-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-medium text-white">{project.title}</h3>
                    <span className="text-neutral-600 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-0.5">
                      {project.demo ? <ArrowUpRightIcon size={16} /> : <GithubIcon size={16} />}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs font-mono text-neutral-600">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
