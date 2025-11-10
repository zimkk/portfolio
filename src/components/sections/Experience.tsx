import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const experiences = [{
  id: 1,
  role: 'Senior AI Engineer',
  company: 'Schmoozzer',
  companyRole: 'Senior AI Engineer',
  period: 'Oct 2025 - Present',
  jobType: 'Full-time',
  location: 'Remote',
  description: 'Leading AI engineering initiatives and developing sophisticated automation solutions using both code and low-code platforms like n8n.',
  achievements: [
    'Develop and architect AI-powered automation solutions using advanced coding techniques',
    'Design and implement low-code automation workflows using n8n platform',
    'Lead AI engineering projects from conception to deployment',
    'Optimize and scale automation systems for enterprise-level performance'
  ]
}, {
  id: 2,
  role: 'AI Automation Engineer',
  company: 'NDT Legacy Group',
  companyRole: 'AI Automation Engineer',
  period: 'Jun 2025 - Present',
  jobType: 'Contract',
  location: 'Hybrid',
  description: 'Design and implement end-to-end automation solutions using n8n and AI integrations. Streamline workflows across social media, DevOps, and business processes to help clients achieve their goals efficiently.',
  achievements: [
    'Design and implement end-to-end automation solutions using n8n and AI integrations',
    'Streamline workflows across social media, DevOps, and business processes',
    'Help clients achieve their goals efficiently through intelligent automation'
  ]
}, {
  id: 3,
  role: 'QA & Automation Engineer',
  company: 'Brilliant Gaming',
  companyRole: 'QA & Automation Engineer',
  period: 'Feb 2025 - Oct 2025',
  jobType: 'Contract',
  location: 'Remote',
  description: 'Leading quality assurance processes and implementing test automation frameworks for gaming applications.',
  achievements: [
    'Developed and maintained automated test suites for web applications and backend services',
    'Integrated testing workflows into CI/CD pipelines to ensure rapid and reliable deployments',
    'Conducted performance and regression testing to ensure system stability across updates'
  ]
}, {
  id: 4,
  role: 'CTO',
  company: 'Gridcore',
  companyRole: 'CTO',
  period: 'Dec 2024 - Present',
  jobType: 'Part-time',
  location: 'Remote',
  description: 'Managing cloud infrastructure and CI/CD pipelines for seamless deployments.',
  achievements: [
    'Automation testing of applications',
    'Deployed web applications in Docker containers across multiple VPS environments',
    'Utilized shell scripting for smooth deployments and configuration management',
    'Ensured system reliability and adhered to best DevOps practices'
  ]
}, {
  id: 5,
  role: 'Technical Support L2',
  company: 'IDITECH (Mexico)',
  companyRole: 'Technical Support L2',
  period: 'Jul 2023 - Apr 2024',
  jobType: 'Full-time',
  location: 'Remote',
  description: 'Provided advanced technical support and managed cloud infrastructure for Mexican operations.',
  achievements: [
    'Maintained and managed the company\'s AWS cloud platform',
    'Deployed and administered web applications',
    'Implemented monitoring tool (Grafana) for performance optimization',
    'Supported CI/CD processes and automated tasks via shell scripting',
    'Provided technical support for business-critical services',
    'Contributed to improving system reliability and uptime'
  ]
}, {
  id: 6,
  role: 'Quality Assurance Executive',
  company: 'Touchstone Communications',
  companyRole: 'Quality Assurance Executive',
  period: 'Dec 2023 - Nov 2024',
  jobType: 'Full-time',
  location: 'Hybrid',
  description: 'Quality control and assurance for automotive transcription campaigns.',
  achievements: [
    'QC on Non-Voice (Transcription) Automotive campaign',
    'Reviewed and verified agent-submitted data',
    'Generated compliance and performance reports',
    'Conducted weekly software testing for quality and functionality',
    'Provided feedback to improve productivity and performance'
  ]
}, {
  id: 7,
  role: 'Freelancer',
  company: 'Fiverr/Upwork',
  companyRole: 'Freelance Developer',
  period: '2019 - Present',
  jobType: 'Freelance',
  location: 'Remote',
  description: 'Providing various technical services as an independent contractor.',
  achievements: [
    'DevOps services (CI/CD pipelines, containerization, Deployment testing, AWS, Jenkins, Docker, etc)',
    'Automation using different platforms and also custom automation scripting',
    'Application Deployment and Testing',
    'Python Bot development and script writing for Automation',
    'Developing, Training, modeling, and integrating ML/AI tools'
  ]
}];

const Experience = ({ darkMode }) => {
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

  const toggleExpand = id => {
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