import React from 'react';
import { GithubIcon, ExternalLinkIcon } from 'lucide-react';
import { GlowingEffect } from '../ui/GlowingEffect';

const projects = [{
  title: 'The Home Club',
  description: 'Sports club platform for memberships, programs, and community engagement with a polished public-facing web experience.',
  technologies: ['React', 'Web App', 'Sports', 'Full Stack'],
  github: null,
  demo: 'https://thehomeclubsports.com',
  image: '/images/projects/the-home-club.jpg'
}, {
  title: 'N8NHUB',
  description: 'Curated library of 2000+ n8n workflow templates for automation builders, with searchable categories and ready-to-use integrations.',
  technologies: ['n8n', 'Automation', 'Workflows', 'No-Code'],
  github: null,
  demo: 'https://n8nhub.hassannazir.dev',
  image: '/images/projects/n8nhub.jpg'
}, {
  title: 'SpeedyInfluencer',
  description: 'Influencer marketing platform connecting brands and creators with campaign tools, analytics, and streamlined collaboration workflows.',
  technologies: ['React', 'Marketing', 'SaaS', 'Full Stack'],
  github: null,
  demo: 'https://speedyinfluencer.com',
  image: '/images/projects/speedyinfluencer.png'
}, {
  title: 'SmartFurs',
  description: 'E-commerce platform for purebred puppies with breed listings, buyer discovery, and a modern storefront experience.',
  technologies: ['React', 'E-commerce', 'Vercel', 'Web App'],
  github: null,
  demo: 'https://smartfurs.vercel.app',
  image: '/images/projects/smartfurs.jpg'
}, {
  title: 'Fooocus',
  description: 'SDXL-based image generation tool focused on prompting and generating high-quality visuals with a streamlined, minimal setup.',
  technologies: ['Python', 'SDXL', 'GenAI', 'Gradio'],
  github: 'https://github.com/zimkk/Fooocus',
  demo: null,
  image: 'https://raw.githubusercontent.com/lllyasviel/Fooocus/main/sdxl_styles/samples/artstyle_hyperrealism.jpg'
}, {
  title: 'erdman-ny-county',
  description: 'Backend-focused project with Python services and structured workflows for production-style application logic.',
  technologies: ['Python', 'Backend', 'APIs', 'Automation'],
  github: 'https://github.com/zimkk/erdman-ny-county',
  demo: null,
  image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200'
}, {
  title: 'legal-Document-Summerizer',
  description: 'Application for summarizing legal documents using a fine-tuned LLM pipeline focused on domain-specific outputs.',
  technologies: ['Python', 'LLM', 'NLP', 'Model Fine-tuning'],
  github: 'https://github.com/zimkk/legal-Document-Summerizer',
  demo: null,
  image: 'https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg?auto=compress&cs=tinysrgb&w=1200'
}, {
  title: 'Anomaly-Detection-System',
  description: 'Python-based anomaly detection project for identifying unusual network behavior using data science techniques.',
  technologies: ['Python', 'Data Science', 'Anomaly Detection', 'Security'],
  github: 'https://github.com/zimkk/Anomaly-Detection-System',
  demo: null,
  image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1200'
}, {
  title: 'genAi',
  description: 'Experimental generative AI workspace for prototypes and practical GenAI implementation ideas.',
  technologies: ['TypeScript', 'GenAI', 'Automation', 'APIs'],
  github: 'https://github.com/zimkk/genAi',
  demo: null,
  image: 'https://images.pexels.com/photos/7942665/pexels-photo-7942665.jpeg?auto=compress&cs=tinysrgb&w=1200'
}];

const Projects = ({
  darkMode
}) => {
  return <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 md:mb-12 text-white">
            Just Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => <div key={index} className="group rounded-lg h-full flex flex-col transition-all duration-300 bg-black border border-gray-700 hover:border-white relative overflow-hidden">
                <GlowingEffect 
                  variant="white" 
                  proximity={100} 
                  spread={30} 
                  movementDuration={1.5}
                />
                
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Links Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-black/60 backdrop-blur-sm transition-all duration-300 text-gray-300 hover:text-white hover:bg-black/80" aria-label="GitHub repository">
                        <GithubIcon size={18} />
                      </a>}
                    {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-black/60 backdrop-blur-sm transition-all duration-300 text-gray-300 hover:text-white hover:bg-black/80" aria-label="Live demo">
                        <ExternalLinkIcon size={18} />
                      </a>}
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-300 transition-colors text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 flex-1 text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech, i) => <div key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-900/80 text-gray-300 border border-gray-800 hover:border-gray-600 transition-colors">
                        {tech}
                      </div>)}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Projects;
