import React, { useEffect, useState } from 'react';
import { GlowingEffect } from '../ui/GlowingEffect';

const skillCategories = [{
  id: 'languages',
  name: 'Backend & APIs',
  skills: [{
    name: 'Python',
    level: 95
  }, {
    name: 'REST API Design & Versioning',
    level: 92
  }, {
    name: 'Microservices Architecture',
    level: 90
  }, {
    name: 'Event-Driven Systems',
    level: 88
  }, {
    name: 'FastAPI / Node.js',
    level: 90
  }, {
    name: 'Java / Spring Boot (Upskilling)',
    level: 65
  }]
}, {
  id: 'frameworks',
  name: 'Data & AI/ML',
  skills: [{
    name: 'PostgreSQL / MySQL',
    level: 88
  }, {
    name: 'MongoDB',
    level: 85
  }, {
    name: 'Redis / Queues',
    level: 90
  }, {
    name: 'LangChain / RAG',
    level: 90
  }, {
    name: 'OpenAI / Claude APIs',
    level: 88
  }, {
    name: 'PyTorch / TensorFlow',
    level: 82
  }, {
    name: 'Hugging Face Fine-tuning',
    level: 85
  }]
}, {
  id: 'tools',
  name: 'Cloud, Security & Quality',
  skills: [{
    name: 'AWS / GCP',
    level: 85
  }, {
    name: 'Docker / Kubernetes',
    level: 86
  }, {
    name: 'GitHub Actions / Jenkins',
    level: 84
  }, {
    name: 'OAuth2 / JWT Security',
    level: 85
  }, {
    name: 'Audit Logging & Monitoring',
    level: 90
  }, {
    name: 'Selenium / Playwright',
    level: 85
  }, {
    name: 'Linux Administration',
    level: 84
  }]
}];

const Skills = ({  }: { darkMode: boolean }) => {
  const [activeCategory, setActiveCategory] = useState('languages');
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
    const section = document.getElementById('skills');
    if (section) {
      observer.observe(section);
    }
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white text-center">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-center mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Proficient in modern technologies and frameworks for AI automation, cloud infrastructure, and full-stack development
          </p>

          {/* Category Selection */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skillCategories.map(category => (
              <button 
                key={category.id} 
                onClick={() => setActiveCategory(category.id)} 
                className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id 
                    ? 'bg-white text-black shadow-lg shadow-white/20' 
                    : 'bg-black border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 sm:p-8 relative">
            <GlowingEffect 
              variant="white" 
              proximity={100} 
              spread={30} 
              movementDuration={1.5}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(skillCategories.find(c => c.id === activeCategory)?.skills ?? []).map((skill, index) => (
                <div 
                  key={index} 
                  className="group"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400 text-sm font-mono">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="relative w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    
                    {/* Progress Bar */}
                    <div 
                      className="h-full bg-gradient-to-r from-white via-gray-300 to-white rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${200 + index * 100}ms`
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>

                  {/* Skill level indicator */}
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-500">Beginner</span>
                    <span className="text-gray-500">Expert</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Description */}
            <div className="mt-8 pt-6 border-t border-gray-800/50">
              <div className="text-center">
                {activeCategory === 'languages' && (
                  <p className="text-gray-400 text-sm">
                    Core backend engineering stack for distributed systems, API design, and production services
                  </p>
                )}
                {activeCategory === 'frameworks' && (
                  <p className="text-gray-400 text-sm">
                    Databases, LLM tooling, and ML frameworks for applied AI systems and intelligent automation
                  </p>
                )}
                {activeCategory === 'tools' && (
                  <p className="text-gray-400 text-sm">
                    Cloud, DevOps, security, and testing practices for reliable and compliance-aware delivery
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Floating Elements for Visual Enhancement */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/10 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;