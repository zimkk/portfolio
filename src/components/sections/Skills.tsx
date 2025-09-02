import React, { useEffect, useState } from 'react';

const skillCategories = [{
  id: 'languages',
  name: 'Languages',
  skills: [{
    name: 'Python',
    level: 90
  }, {
    name: 'SQL',
    level: 85
  }, {
    name: 'C/C++',
    level: 75
  }, {
    name: 'JavaScript',
    level: 80
  }]
}, {
  id: 'frameworks',
  name: 'Frameworks & Libraries',
  skills: [{
    name: 'Numpy/Pandas',
    level: 85
  }, {
    name: 'Scikit-learn',
    level: 80
  }, {
    name: 'NLTK',
    level: 75
  }, {
    name: 'LLaMA',
    level: 85
  }, {
    name: 'LangChain',
    level: 90
  }, {
    name: 'Hugging Face',
    level: 85
  }, {
    name: 'Selenium',
    level: 80
  }]
}, {
  id: 'tools',
  name: 'Tools & Platforms',
  skills: [{
    name: 'n8n',
    level: 95
  }, {
    name: 'Zapier',
    level: 90
  }, {
    name: 'Make',
    level: 85
  }, {
    name: 'Docker',
    level: 80
  }, {
    name: 'Nginx',
    level: 75
  }, {
    name: 'Git',
    level: 85
  }, {
    name: 'Linux',
    level: 80
  }, {
    name: 'AWS',
    level: 75
  }, {
    name: 'Jenkins (CI/CD)',
    level: 70
  }, {
    name: 'Jira',
    level: 80
  }]
}];

const Skills = ({ darkMode }) => {
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
    <section id="skills" className="py-20 px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-white text-center">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
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
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.find(c => c.id === activeCategory).skills.map((skill, index) => (
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
                    Core programming languages for automation, data processing, and application development
                  </p>
                )}
                {activeCategory === 'frameworks' && (
                  <p className="text-gray-400 text-sm">
                    AI/ML frameworks and libraries for intelligent automation and data science workflows
                  </p>
                )}
                {activeCategory === 'tools' && (
                  <p className="text-gray-400 text-sm">
                    DevOps tools, automation platforms, and cloud technologies for scalable solutions
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