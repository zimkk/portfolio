import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon, CalendarIcon, TagIcon, UserIcon, BriefcaseIcon, TrendingUpIcon, CheckCircleIcon, ArrowRightIcon, ZapIcon } from 'lucide-react';
import FloatingNav from '../components/ui/FloatingNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { GlowingEffect } from '../components/ui/GlowingEffect';

const workProjects = [
  {
    id: 1,
    title: 'Enterprise AI Automation Platform',
    client: 'NDT Legacy Group',
    duration: '6 months',
    year: '2025',
    category: 'AI/Automation',
    description: 'Developed a comprehensive AI-powered automation platform that streamlined business processes across multiple departments, resulting in 60% reduction in manual tasks.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    technologies: ['Python', 'n8n', 'LangChain', 'OpenAI API', 'PostgreSQL', 'Docker'],
    challenges: [
      'Integration with legacy systems',
      'Real-time data processing at scale',
      'Custom AI model fine-tuning for domain-specific tasks'
    ],
    solutions: [
      'Built custom API bridges for legacy system integration',
      'Implemented event-driven architecture with Redis',
      'Created domain-specific training datasets and fine-tuned models'
    ],
    results: [
      '60% reduction in manual processing time',
      '95% accuracy in automated decision making',
      '$200K+ annual cost savings for client'
    ],
    stats: [
      { label: 'Manual Tasks Reduced', value: '60%' },
      { label: 'Accuracy Rate', value: '95%' },
      { label: 'Annual Savings', value: '$200K+' }
    ],
    testimonial: {
      text: "Hassan's automation solution transformed our workflow efficiency beyond our expectations.",
      author: "Project Manager",
      company: "NDT Legacy Group",
      avatar: "PM"
    },
    externalLink: {
      url: 'https://n8nhub.hassannazir.dev',
      text: 'View 2000+ n8n Workflows Library'
    }
  },
  {
    id: 2,
    title: 'Cloud Security Monitoring System',
    client: 'Gridcore',
    duration: '5 months',
    year: '2024-2025',
    category: 'DevOps/Security',
    description: 'Built a comprehensive security monitoring and threat detection system for cloud infrastructure with automated incident response capabilities.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    technologies: ['Python', 'AWS', 'Terraform', 'Grafana', 'ElasticSearch', 'Docker'],
    challenges: [
      'Real-time threat detection across multiple cloud environments',
      'Minimizing false positive alerts',
      'Automated response without disrupting legitimate operations'
    ],
    solutions: [
      'Implemented ML-based anomaly detection algorithms',
      'Created intelligent alert filtering system',
      'Developed graduated response protocols with manual override'
    ],
    results: [
      '99.2% uptime achievement',
      '85% reduction in security incident response time',
      'Zero successful security breaches during deployment'
    ],
    stats: [
      { label: 'System Uptime', value: '99.2%' },
      { label: 'Response Time', value: '-85%' },
      { label: 'Security Breaches', value: '0' }
    ],
    testimonial: {
      text: "The security monitoring system Hassan built has become the backbone of our infrastructure protection.",
      author: "CTO",
      company: "Gridcore",
      avatar: "CT"
    }
  },
  {
    id: 3,
    title: 'Automated QA Testing Framework',
    client: 'Brilliant Gaming',
    duration: '4 months',
    year: '2025',
    category: 'QA/Testing',
    description: 'Designed and implemented a comprehensive automated testing framework that reduced manual testing time by 70% while improving test coverage.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    technologies: ['Python', 'Selenium', 'Pytest', 'Jenkins', 'Allure Reports', 'Docker'],
    challenges: [
      'Complex gaming application testing scenarios',
      'Integration with existing CI/CD pipelines',
      'Maintaining test reliability across different environments'
    ],
    solutions: [
      'Created modular test architecture with reusable components',
      'Implemented parallel test execution with dynamic resource allocation',
      'Built environment-agnostic test configuration system'
    ],
    results: [
      '70% reduction in manual testing time',
      '95% test coverage across critical user journeys',
      '50% faster release cycles'
    ],
    stats: [
      { label: 'Testing Time', value: '-70%' },
      { label: 'Test Coverage', value: '95%' },
      { label: 'Release Speed', value: '+50%' }
    ],
    testimonial: {
      text: "Hassan's testing framework revolutionized our development process and significantly improved our product quality.",
      author: "Lead Developer",
      company: "Brilliant Gaming",
      avatar: "LD"
    }
  }
];

const WorkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const categories = ['All', 'AI/Automation', 'DevOps/Security', 'QA/Testing'];
  const navigate = useNavigate();

  const handleContactNavigation = () => {
    navigate('/');
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const filteredProjects = selectedCategory === 'All' 
    ? workProjects 
    : workProjects.filter(project => project.category === selectedCategory);

  return (
    <PageTransition>
      <SEOHead page="work" />
      <div className="min-h-screen bg-black text-white">
        <FloatingNav />
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <ArrowLeftIcon size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center gap-2">
                <BriefcaseIcon size={20} className="text-white" />
                <span className="font-semibold">Portfolio</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                  <ZapIcon size={16} className="text-white" />
                  <span className="text-sm text-gray-300">Featured Work & Case Studies</span>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
                Selected Projects
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Real-world solutions that drive measurable business impact through AI, automation, and modern engineering practices.
              </p>
              
              {/* Stats Bar */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">15+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center border-l border-r border-gray-800">
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">$2M+</div>
                  <div className="text-sm text-gray-400">Value Generated</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="px-6 md:px-12 lg:px-20 mb-16">
          <div className="container mx-auto">
            <div className="flex justify-center gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white text-black shadow-lg shadow-white/20'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 pb-20">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-24">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="relative"
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* Project Card */}
                  <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-all duration-500">
                    <GlowingEffect variant="white" proximity={150} spread={40} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                      {/* Image Section */}
                      <div className="lg:col-span-3 relative overflow-hidden group">
                        <div className="aspect-video lg:aspect-auto lg:h-full">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-transparent opacity-60"></div>
                        </div>
                        
                        {/* Overlay Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white">
                              {project.category}
                            </span>
                            <span className="text-sm text-gray-300">{project.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between">
                        {/* Header */}
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <UserIcon size={16} />
                            <span>{project.client}</span>
                            <span className="mx-2">•</span>
                            <span>{project.duration}</span>
                          </div>
                          
                          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {project.title}
                          </h2>
                          
                          <p className="text-gray-300 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {project.stats.map((stat, i) => (
                            <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                              <div className="text-xs text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Technologies */}
                        <div className="mb-8">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA Button */}
                        {project.externalLink && (
                          <a 
                            href={project.externalLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all group"
                          >
                            <span>{project.externalLink.text}</span>
                            <ExternalLinkIcon size={18} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="border-t border-white/10 bg-black/30">
                      <details className="group">
                        <summary className="px-8 py-6 cursor-pointer list-none flex items-center justify-between">
                          <span className="text-lg font-semibold text-white">View Project Details</span>
                          <ArrowRightIcon size={20} className="text-gray-400 group-open:rotate-90 transition-transform" />
                        </summary>
                        
                        <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                          {/* Challenges */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Challenges</h3>
                            <ul className="space-y-3">
                              {project.challenges.map((challenge, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Solutions */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Solutions</h3>
                            <ul className="space-y-3">
                              {project.solutions.map((solution, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                  <CheckCircleIcon size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Results */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Key Results</h3>
                            <ul className="space-y-3">
                              {project.results.map((result, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                  <TrendingUpIcon size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                  <span>{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* Testimonial */}
                    <div className="border-t border-white/10 p-8 bg-gradient-to-br from-white/5 to-transparent">
                      <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {project.testimonial.avatar}
                        </div>
                        <div className="flex-1">
                          <blockquote className="text-gray-300 italic mb-3 text-lg">
                            "{project.testimonial.text}"
                          </blockquote>
                          <div className="flex items-center gap-2 text-sm">
                            <cite className="text-white not-italic font-medium">
                              {project.testimonial.author}
                            </cite>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">{project.testimonial.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 pb-20">
          <div className="container mx-auto max-w-5xl">
            <div className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              
              <div className="relative z-10">
                <div className="inline-block mb-6">
                  <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
                    <span className="text-sm text-white">Let's Build Something Amazing</span>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Ready to Transform<br />Your Business?
                </h2>
                
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Let's discuss how AI automation and modern engineering can solve your challenges and drive growth.
                </p>
                
                <button 
                  onClick={handleContactNavigation}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all hover:scale-105 shadow-xl shadow-white/10"
                >
                  <span>Start a Conversation</span>
                  <ArrowRightIcon size={20} />
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-green-400" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-green-400" />
                    <span>Quick Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon size={16} className="text-green-400" />
                    <span>No Commitment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default WorkPage;
