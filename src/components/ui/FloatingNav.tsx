import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, BookOpenIcon } from 'lucide-react';

const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path: string, event: React.MouseEvent) => {
    event.preventDefault();
    console.log('Navigation clicked! Going to:', path);
    console.log('Current location:', location.pathname);
    navigate(path);
  };

  return (
    <aside className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[9999] hidden md:block" style={{ pointerEvents: 'auto' }}>
      <nav className="bg-gray-900/20 backdrop-blur-xl border border-gray-300/20 rounded-2xl px-4 py-6 shadow-2xl" style={{ pointerEvents: 'auto' }}>
        <div className="flex flex-col items-center gap-6">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-300/20">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
            <span className="text-sm font-bold text-gray-200">HN</span>
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
          </div>
          
          {/* Location Indicator */}
          <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-300/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-xs text-gray-400 writing-mode-vertical text-center">PK</span>
          </div>
        </div>
        
        {/* Vertical tubelight glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-transparent via-white/10 to-transparent blur-sm"></div>
      </nav>
    </aside>
  );
};

export default FloatingNav;
