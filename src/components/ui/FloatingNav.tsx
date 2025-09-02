import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, BookOpenIcon, PhoneIcon } from 'lucide-react';
import { DockNavigation } from './DockNavigation';

const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  // Track which section is currently visible
  useEffect(() => {
    // Only run intersection observer on home page
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

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

    // Observe home page sections
    const sections = ['home', 'about', 'experience', 'skills', 'certifications', 'education', 'projects', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/' && activeSection !== 'contact') return true;
    if (path === '/#contact' && location.pathname === '/' && activeSection === 'contact') return true;
    if (path !== '/' && !path.includes('#') && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string, event?: React.MouseEvent) => {
    event?.preventDefault();
    console.log('Navigation clicked! Going to:', path);
    console.log('Current location:', location.pathname);
    
    if (path === '/#contact') {
      // If we're already on the home page, just scroll to contact
      if (location.pathname === '/') {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page with contact hash
        navigate('/', { replace: true });
        setTimeout(() => {
          const contactElement = document.getElementById('contact');
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (path === '/') {
      // Handle home navigation
      if (location.pathname === '/') {
        // If already on home page, scroll to top (hero section)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home page and scroll to top
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Navigate to other pages and scroll to top
      navigate(path);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <aside className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[9999] hidden md:block" style={{ pointerEvents: 'auto' }}>
        <nav className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-6 shadow-2xl" style={{ pointerEvents: 'auto' }}>
          <div className="flex flex-col items-center gap-6">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center gap-2 pb-4 border-b border-white/20">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
            <span className="text-sm font-bold text-white">HN</span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={(e) => handleNavigation('/', e)}
              className={`relative group p-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:scale-110 cursor-pointer ${
                isActive('/') ? 'bg-white/10 scale-110' : ''
              }`}
              style={{ pointerEvents: 'auto', zIndex: 10000 }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`relative flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive('/') ? 'text-white' : 'text-gray-300 group-hover:text-white'
              }`}>
                <HomeIcon size={20} />
                <span className="text-xs">Home</span>
              </div>
            </button>
            
            <button 
              onClick={(e) => handleNavigation('/work', e)}
              className={`relative group p-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:scale-110 cursor-pointer ${
                isActive('/work') ? 'bg-white/10 scale-110' : ''
              }`}
              style={{ pointerEvents: 'auto', zIndex: 10000 }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`relative flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive('/work') ? 'text-white' : 'text-gray-300 group-hover:text-white'
              }`}>
                <BriefcaseIcon size={20} />
                <span className="text-xs">Work</span>
              </div>
            </button>
            
            <button 
              onClick={(e) => handleNavigation('/blogs', e)}
              className={`relative group p-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:scale-110 cursor-pointer ${
                isActive('/blogs') ? 'bg-white/10 scale-110' : ''
              }`}
              style={{ pointerEvents: 'auto', zIndex: 10000 }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`relative flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive('/blogs') ? 'text-white' : 'text-gray-300 group-hover:text-white'
              }`}>
                <BookOpenIcon size={20} />
                <span className="text-xs">Blog</span>
              </div>
            </button>
            
            <button 
              onClick={(e) => handleNavigation('/#contact', e)}
              className={`relative group p-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:scale-110 cursor-pointer ${
                isActive('/#contact') ? 'bg-white/10 scale-110' : ''
              }`}
              style={{ pointerEvents: 'auto', zIndex: 10000 }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`relative flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive('/#contact') ? 'text-white' : 'text-gray-300 group-hover:text-white'
              }`}>
                <PhoneIcon size={20} />
                <span className="text-xs">Contact</span>
              </div>
            </button>
          </div>
          
          {/* Location Indicator */}
          <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-xs text-gray-300 writing-mode-vertical text-center">PK</span>
          </div>
        </div>
        
          {/* Vertical tubelight glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-transparent via-white/10 to-transparent blur-sm"></div>
        </nav>
      </aside>

      {/* Mobile Dock Navigation */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] md:hidden" style={{ pointerEvents: 'auto' }}>
        <DockNavigation
          tabs={[
            {
              title: 'Home',
              icon: HomeIcon,
              onClick: () => handleNavigation('/'),
              isActive: isActive('/')
            },
            {
              title: 'Work',
              icon: BriefcaseIcon,
              onClick: () => handleNavigation('/work'),
              isActive: isActive('/work')
            },
            {
              title: 'Blog',
              icon: BookOpenIcon,
              onClick: () => handleNavigation('/blogs'),
              isActive: isActive('/blogs')
            },
            {
              title: 'Contact',
              icon: PhoneIcon,
              onClick: () => handleNavigation('/#contact'),
              isActive: isActive('/#contact')
            }
          ]}
          className="shadow-2xl"
          activeColor="text-white"
        />
      </nav>
    </>
  );
};

export default FloatingNav;
