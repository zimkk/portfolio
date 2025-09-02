import React, { useState, useEffect } from 'react';
import { HomeIcon, UserIcon, BriefcaseIcon, CodeIcon, AwardIcon, GraduationCapIcon, FolderIcon, PhoneIcon } from 'lucide-react';

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'about', icon: UserIcon, label: 'About' },
    { id: 'experience', icon: BriefcaseIcon, label: 'Experience' },
    { id: 'skills', icon: CodeIcon, label: 'Skills' },
    { id: 'certifications', icon: AwardIcon, label: 'Certifications' },
    { id: 'education', icon: GraduationCapIcon, label: 'Education' },
    { id: 'projects', icon: FolderIcon, label: 'Projects' },
    { id: 'contact', icon: PhoneIcon, label: 'Contact' },
  ];

  // Track which section is currently visible
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <aside className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[9999] hidden lg:block">
      <nav className="relative">
        {/* Vertical Chain Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent transform -translate-x-1/2"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/60 to-white/20 transform -translate-x-1/2 animate-pulse"></div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-4 relative">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div key={section.id} className="relative flex items-center justify-center">
                {/* Chain Link */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`relative group w-12 h-12 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                    isActive 
                      ? 'bg-white border-white text-black shadow-lg shadow-white/30' 
                      : 'bg-black/50 border-white/30 text-white/70 hover:border-white/60 hover:text-white backdrop-blur-sm'
                  }`}
                  style={{ pointerEvents: 'auto', zIndex: 10000 }}
                >
                  {/* Glow effect for active item */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                  )}
                  
                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <Icon size={18} />
                  </div>

                  {/* Tooltip */}
                  <div className={`absolute right-16 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap ${
                    isActive ? 'opacity-100' : ''
                  }`}>
                    {section.label}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </button>

                {/* Connection dots between items */}
                {index < sections.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/40"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
        
        {/* Top decorative element */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
      </nav>
    </aside>
  );
};

export default SectionNav;

