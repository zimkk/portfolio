import useScrollSpy from '../../hooks/useScrollSpy';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS = SECTIONS.map((section) => section.id);

const SectionNav = () => {
  const activeSection = useScrollSpy(SECTION_IDS);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] hidden lg:block">
      <nav aria-label="Section navigation">
        <ul className="flex flex-col items-end gap-3">
          {SECTIONS.map(section => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-label={section.label}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex items-center gap-3 py-1"
                >
                  <span
                    className={`text-xs font-mono transition-all duration-200 ${
                      isActive
                        ? 'text-white opacity-100'
                        : 'text-neutral-500 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {section.label}
                  </span>
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-white'
                        : 'w-4 bg-neutral-700 group-hover:w-6 group-hover:bg-neutral-500'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SectionNav;
