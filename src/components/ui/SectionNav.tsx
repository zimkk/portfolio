import React from 'react';
import { HomeIcon, UserIcon, BriefcaseIcon, CodeIcon, AwardIcon, GraduationCapIcon, FolderIcon, PhoneIcon } from 'lucide-react';
import useScrollSpy from '../../hooks/useScrollSpy';

const SECTIONS = [
  { id: 'home', icon: HomeIcon, label: 'Home' },
  { id: 'about', icon: UserIcon, label: 'About' },
  { id: 'experience', icon: BriefcaseIcon, label: 'Experience' },
  { id: 'skills', icon: CodeIcon, label: 'Skills' },
  { id: 'certifications', icon: AwardIcon, label: 'Certifications' },
  { id: 'education', icon: GraduationCapIcon, label: 'Education' },
  { id: 'projects', icon: FolderIcon, label: 'Projects' },
  { id: 'contact', icon: PhoneIcon, label: 'Contact' },
] as const;

const SECTION_IDS = SECTIONS.map((section) => section.id);

const SectionNav = () => {
  const activeSection = useScrollSpy(SECTION_IDS);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <aside className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[9999] hidden lg:block">
      <nav className="relative" aria-label="Section navigation">
        {/* Vertical Chain Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent transform -translate-x-1/2"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/60 to-white/20 transform -translate-x-1/2 animate-pulse"></div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-4 relative">
          {SECTIONS.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className="relative flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-label={section.label}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative group w-12 h-12 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                    isActive
                      ? 'bg-white border-white text-black shadow-lg shadow-white/40 scale-110'
                      : 'bg-black/50 border-white/30 text-white/70 hover:border-white/60 hover:text-white backdrop-blur-sm'
                  }`}
                  style={{ pointerEvents: 'auto', zIndex: 10000 }}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-ping pointer-events-none"></div>
                  )}

                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <Icon size={18} />
                  </div>

                  <div
                    className={`absolute right-16 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-sm rounded-lg border transition-all duration-300 pointer-events-none whitespace-nowrap ${
                      isActive
                        ? 'opacity-100 border-white/40'
                        : 'opacity-0 border-white/20 group-hover:opacity-100'
                    }`}
                  >
                    {section.label}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </button>

                {index < SECTIONS.length - 1 && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
                    <div className="w-1 h-1 rounded-full bg-white/40"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white/20 animate-pulse pointer-events-none"></div>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white/20 animate-pulse pointer-events-none"></div>
      </nav>
    </aside>
  );
};

export default SectionNav;
