import React from 'react';
import { GithubIcon, ExternalLinkIcon, CodeIcon, FolderIcon } from 'lucide-react';
import { GlowingEffect } from '../ui/GlowingEffect';
const projects = [{
  title: 'AI Document Processor',
  description: 'An LLM-powered system that extracts, categorizes, and summarizes information from various document formats using LangChain and Hugging Face transformers.',
  technologies: ['Python', 'LangChain', 'Hugging Face', 'FastAPI'],
  github: 'https://github.com/zimkk',
  demo: null,
  image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80'
}, {
  title: 'DevOps Automation Pipeline',
  description: 'End-to-end CI/CD pipeline with automated testing, deployment, and monitoring for containerized applications.',
  technologies: ['Docker', 'Jenkins', 'AWS', 'Terraform'],
  github: 'https://github.com/zimkk',
  demo: null,
  image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80'
}, {
  title: 'Intelligent Workflow Automation',
  description: 'No-code/low-code platform integration that automates business processes with AI-powered decision making.',
  technologies: ['n8n', 'Python', 'Make', 'REST APIs'],
  github: 'https://n8nhub.hassannazir.dev',
  demo: 'https://n8nhub.hassannazir.dev',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
}, {
  title: 'QA Test Automation Framework',
  description: 'Comprehensive test automation framework for web applications with reporting and CI integration.',
  technologies: ['Selenium', 'Python', 'Jenkins', 'Allure'],
  github: 'https://github.com/zimkk',
  demo: null,
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
}, {
  title: 'Custom LLM Fine-tuning Pipeline',
  description: 'End-to-end pipeline for fine-tuning large language models on specialized datasets with parameter-efficient methods.',
  technologies: ['PyTorch', 'Hugging Face', 'PEFT', 'Python'],
  github: 'https://github.com/zimkk',
  demo: null,
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
}, {
  title: 'Cloud Resource Optimizer',
  description: 'Tool that analyzes and optimizes cloud resource usage to reduce costs while maintaining performance.',
  technologies: ['Python', 'AWS SDK', 'Terraform', 'Docker'],
  github: 'https://github.com/zimkk',
  demo: 'https://github.com/zimkk',
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
}];
const Projects = ({
  darkMode
}) => {
  return <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 md:mb-12 text-white">
            Projects & Research
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