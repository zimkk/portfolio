import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, BookOpenIcon, MailIcon } from 'lucide-react';
import { DockNavigation } from './DockNavigation';
import useScrollSpy from '../../hooks/useScrollSpy';

const HOME_SECTION_IDS = ['home', 'about', 'experience', 'skills', 'certifications', 'education', 'projects', 'contact'];

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/services', label: 'Services', icon: BriefcaseIcon },
  { path: '/blogs', label: 'Blogs', icon: BookOpenIcon },
  { path: '/#contact', label: 'Contact', icon: MailIcon }
] as const;

const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useScrollSpy(HOME_SECTION_IDS, location.pathname === '/');

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/' && activeSection !== 'contact') return true;
    if (path === '/#contact' && location.pathname === '/' && activeSection === 'contact') return true;
    if (path !== '/' && !path.includes('#') && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string, event?: React.MouseEvent) => {
    event?.preventDefault();

    if (path === '/#contact') {
      if (location.pathname === '/') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { replace: true });
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (path === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    } else {
      navigate(path);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-[9999] hidden md:block">
        <nav
          aria-label="Main navigation"
          className="flex flex-col items-center bg-black/60 backdrop-blur-md border border-neutral-800 rounded-lg py-3 px-1.5"
        >
          {/* Brand */}
          <span className="text-xs font-mono font-semibold text-white tracking-widest pb-3 mb-1 border-b border-neutral-800 w-full text-center">
            HN
          </span>

          {/* Links */}
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(item => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={(e) => handleNavigation(item.path, e)}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                  className={`relative group p-2.5 rounded-md transition-colors duration-200 ${
                    active
                      ? 'bg-white text-black'
                      : 'text-neutral-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={17} strokeWidth={active ? 2.25 : 2} />

                  {/* Tooltip */}
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 text-xs text-white bg-neutral-900 border border-neutral-800 rounded-md whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Mobile Dock Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] md:hidden">
        <DockNavigation
          tabs={NAV_ITEMS.map(item => ({
            title: item.label,
            icon: item.icon,
            onClick: () => handleNavigation(item.path),
            isActive: isActive(item.path)
          }))}
          activeColor="text-white"
        />
      </nav>
    </>
  );
};

export default FloatingNav;
