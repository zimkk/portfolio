import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const experiences = [{
  id: 1,
  role: 'SR. AI ENGINEER',
  company: 'NDT Legacy Group',
  companyRole: 'SR. AI ENGINEER',
  period: 'Aug 2025 - Present',
  jobType: 'Full-time',
  location: 'Hybrid',
  description: 'Architected enterprise AI automation platforms processing 10K+ daily transactions with 99.9% uptime.',
  achievements: [
    'Architected enterprise AI automation platforms processing 10K+ daily transactions with 99.9% uptime',
    'Designed scalable LLM and multi-agent systems using LangChain and fine-tuned models',
    'Led cross-functional AI, DevOps, and QA teams from design to production deployment',
    'Reduced operational costs by 40% and improved workflow efficiency by 60% through intelligent automation',
    'Established system governance, monitoring, and performance optimization frameworks'
  ]
}, {
  id: 2,
  role: 'Full Stack Engineer',
  company: 'Gridcore',
  companyRole: 'Full Stack Engineer',
  period: 'Dec 2023 - Present',
  jobType: 'Part-time',
  location: 'Hybrid',
  description: 'Design and build end-to-end web applications and APIs, from React/Next.js frontends to backend services and cloud deployment.',
  achievements: [
    'Developed full-stack web applications using React, Next.js, and TypeScript with RESTful and API-driven backends',
    'Built and maintained scalable backend services and APIs using Python (FastAPI) and Node.js (Express)',
    'Designed and deployed cloud infrastructure (AWS) with Docker and CI/CD pipelines for reliable delivery',
    'Drove technology strategy and client solution architecture, aligning full-stack solutions with business goals'
  ]
}, {
  id: 3,
  role: 'Senior AI Engineer',
  company: 'Schmoozzer',
  companyRole: 'Senior AI Engineer',
  period: 'Oct 2025 - Jan 2026',
  jobType: 'Contract',
  location: 'Remote',
  description: 'Designed and deployed AI-driven automation workflows for enterprise clients.',
  achievements: [
    'Designed and deployed AI-driven automation workflows for enterprise clients',
    'Engineered LLM-powered conversational and document-processing systems',
    'Integrated AI platforms with n8n and external APIs for production use'
  ]
}, {
  id: 4,
  role: 'QA Automation Engineer',
  company: 'Brilliant Gaming',
  companyRole: 'QA Automation Engineer',
  period: 'Feb 2025 - Sep 2025',
  jobType: 'Contract',
  location: 'Remote',
  description: 'Led an 8-person QA team managing $2M+ monthly payment transactions.',
  achievements: [
    'Led an 8-person QA team managing $2M+ monthly payment transactions',
    'Built automated testing frameworks, reducing testing time by half',
    'Created an AI-powered test generation identifying 200+ security scenarios',
    'Implemented automated reporting systems'
  ]
}, {
  id: 5,
  role: 'QA Executive',
  company: 'Touchstone Communications',
  companyRole: 'QA Executive',
  period: 'Dec 2023 - Nov 2024',
  jobType: 'Full-time',
  location: 'On-site',
  description: 'QC for Non-voice campaign.',
  achievements: [
    'QC for Non-voice campaign',
    'Performed risk-based audits to identify process gaps',
    'Executed test cases to validate parameter assessments',
    'Delivered concise reports and recommendations to reduce risk'
  ]
}, {
  id: 6,
  role: 'Independent Consultant',
  company: 'Fiverr/Upwork',
  companyRole: 'Independent Consultant',
  period: '2019 - Present',
  jobType: 'Part-time',
  location: 'Remote',
  description: 'Delivered 20+ custom LLM fine-tuning projects and 100+ AI automation solutions.',
  achievements: [
    'Delivered 20+ custom LLM fine-tuning projects using Hugging Face & Unsloth',
    'Built 100+ AI automation solutions with LangChain and vector databases',
    'Created no-code AI workflows serving 10K+ users',
    'Executed 10+ computer vision projects'
  ]
}];

const Experience = ({  }) => {
  const [expandedId, setExpandedId] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    const section = document.getElementById('experience');
    if (section) {
      observer.observe(section);
    }
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const toggleExpand = (id: any) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 md:mb-12 text-white text-center">
            Work Experience
          </h2>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Modern Timeline Line with Gradient */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent opacity-60"></div>
            
            {/* Animated Timeline Pulse */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px">
              <div className="h-full bg-gradient-to-b from-white via-gray-300 to-white animate-pulse opacity-30"></div>
            </div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Modern Timeline Node */}
                  <div className="absolute left-2 md:left-6 w-6 h-6 z-10">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping"></div>
                    {/* Inner Dot */}
                    <div className="absolute inset-1 bg-white rounded-full shadow-lg">
                      <div className="absolute inset-0.5 bg-black rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Connection Line to Content */}
                  <div className="absolute left-8 md:left-12 top-3 w-4 md:w-8 h-px bg-gradient-to-r from-white/60 to-transparent"></div>
                  
                  {/* Content Card */}
                  <div 
                    className="ml-12 sm:ml-16 md:ml-24 bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 sm:p-6 hover:border-gray-600/50 transition-all duration-300 transform hover:translate-x-1"
                    style={{
                      transitionDelay: `${200 + index * 100}ms`
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                      <div className="md:w-1/3">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.company}
                        </h3>
                        <p className="text-white text-sm font-medium">{exp.companyRole}</p>
                        <p className="text-gray-400 text-sm mt-2 font-mono">{exp.period}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                            {exp.jobType}
                          </span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <ul className="space-y-3 text-gray-300">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm flex items-start gap-3">
                              <span className="text-white mt-1.5 text-xs">▸</span>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle Separator (except for last item) */}
                  {index < experiences.length - 1 && (
                    <div className="ml-16 md:ml-24 mt-8 flex items-center gap-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"></div>
                      <div className="text-gray-600 text-xs font-mono">• • •</div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;