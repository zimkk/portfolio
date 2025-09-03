import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon, CalendarIcon, TagIcon, UserIcon, BriefcaseIcon } from 'lucide-react';
import FloatingNav from '../components/ui/FloatingNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';

const workProjects = [
  {
    id: 1,
    title: 'Enterprise AI Automation Platform',
    client: 'NDT Legacy Group',
    duration: '6 months',
    year: '2025',
    category: 'AI/Automation',
    description: 'Developed a comprehensive AI-powered automation platform that streamlined business processes across multiple departments, resulting in 60% reduction in manual tasks.',
    image: '/api/placeholder/600/400',
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
    testimonial: {
      text: "Hassan's automation solution transformed our workflow efficiency beyond our expectations.",
      author: "Project Manager, NDT Legacy Group"
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
    image: '/api/placeholder/600/400',
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
    testimonial: {
      text: "The security monitoring system Hassan built has become the backbone of our infrastructure protection.",
      author: "CTO, Gridcore"
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
    image: '/api/placeholder/600/400',
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
    testimonial: {
      text: "Hassan's testing framework revolutionized our development process and significantly improved our product quality.",
      author: "Lead Developer, Brilliant Gaming"
    }
  }
];

const WorkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'AI/Automation', 'DevOps/Security', 'QA/Testing'];
  const navigate = useNavigate();

  const handleContactNavigation = () => {
    // Navigate to home page and scroll to contact
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
        {/* Floating Navigation */}
        <FloatingNav />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeftIcon size={20} />
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
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Selected Work
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto px-4">
              A showcase of recent projects where I've helped businesses automate processes, 
              enhance security, and improve operational efficiency through AI and modern technology.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="px-6 md:px-12 lg:px-20 mb-12">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 hover:text-white border border-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 pb-16 sm:pb-20">
        <div className="container mx-auto">
          <div className="space-y-12 sm:space-y-16">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Project Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-80 object-cover rounded-2xl border border-gray-800/50"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <CalendarIcon size={16} />
                        {project.year}
                      </span>
                      <span className="flex items-center gap-2">
                        <TagIcon size={16} />
                        {project.category}
                      </span>
                      <span className="flex items-center gap-2">
                        <UserIcon size={16} />
                        {project.client}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {project.title}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-gray-900/50 border border-gray-700/50 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Results */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Key Results</h3>
                    <ul className="space-y-2">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
                    <blockquote className="text-gray-300 italic mb-3">
                      "{project.testimonial.text}"
                    </blockquote>
                    <cite className="text-sm text-gray-400 not-italic">
                      — {project.testimonial.author}
                    </cite>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 pb-16 sm:pb-20">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800/50 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
              Let's discuss how I can help automate your processes, enhance your security, 
              or build the AI solution your business needs.
            </p>
            <button 
              onClick={handleContactNavigation}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              <span>Get In Touch</span>
              <ExternalLinkIcon size={20} />
            </button>
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default WorkPage;
