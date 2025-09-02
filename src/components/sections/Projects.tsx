import React from 'react';
import { GithubIcon, ExternalLinkIcon, CodeIcon, FolderIcon } from 'lucide-react';
const projects = [{
  title: 'AI Document Processor',
  description: 'An LLM-powered system that extracts, categorizes, and summarizes information from various document formats using LangChain and Hugging Face transformers.',
  technologies: ['Python', 'LangChain', 'Hugging Face', 'FastAPI'],
  github: 'https://github.com/zimkk/ai-doc-processor',
  demo: null
}, {
  title: 'DevOps Automation Pipeline',
  description: 'End-to-end CI/CD pipeline with automated testing, deployment, and monitoring for containerized applications.',
  technologies: ['Docker', 'Jenkins', 'AWS', 'Terraform'],
  github: 'https://github.com/zimkk/devops-pipeline',
  demo: null
}, {
  title: 'Intelligent Workflow Automation',
  description: 'No-code/low-code platform integration that automates business processes with AI-powered decision making.',
  technologies: ['n8n', 'Python', 'Make', 'REST APIs'],
  github: 'https://github.com/zimkk/workflow-automation',
  demo: 'https://hassannazir.vercel.app/demos/workflow'
}, {
  title: 'QA Test Automation Framework',
  description: 'Comprehensive test automation framework for web applications with reporting and CI integration.',
  technologies: ['Selenium', 'Python', 'Jenkins', 'Allure'],
  github: 'https://github.com/zimkk/qa-automation',
  demo: null
}, {
  title: 'Custom LLM Fine-tuning Pipeline',
  description: 'End-to-end pipeline for fine-tuning large language models on specialized datasets with parameter-efficient methods.',
  technologies: ['PyTorch', 'Hugging Face', 'PEFT', 'Python'],
  github: 'https://github.com/zimkk/llm-finetuning',
  demo: null
}, {
  title: 'Cloud Resource Optimizer',
  description: 'Tool that analyzes and optimizes cloud resource usage to reduce costs while maintaining performance.',
  technologies: ['Python', 'AWS SDK', 'Terraform', 'Docker'],
  github: 'https://github.com/zimkk/cloud-optimizer',
  demo: 'https://hassannazir.vercel.app/demos/cloud-optimizer'
}];
const Projects = ({
  darkMode
}) => {
  return <section id="projects" className="py-20 px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Projects & Research
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => <div key={index} className="group rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 bg-black border border-gray-700 hover:border-white">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2 rounded-md bg-gray-900 text-white">
                      <FolderIcon size={24} />
                    </div>
                    <div className="flex gap-3">
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-colors text-gray-400 hover:text-white" aria-label="GitHub repository">
                          <GithubIcon size={18} />
                        </a>}
                      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-colors text-gray-400 hover:text-white" aria-label="Live demo">
                          <ExternalLinkIcon size={18} />
                        </a>}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-300 transition-colors text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm mb-4 flex-1 text-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech, i) => <div key={i} className="px-2 py-1 rounded text-xs font-medium bg-gray-900 text-gray-300">
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