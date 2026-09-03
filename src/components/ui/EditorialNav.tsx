import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Github, Search } from 'lucide-react';
import SearchModal from '../blog/SearchModal';

type EditorialNavProps = {
  onStartProject?: () => void;
};

const EditorialNav = ({ onStartProject }: EditorialNavProps) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const navClass = ({ isActive }: { isActive: boolean }) => isActive ? 'is-active' : undefined;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="route-nav">
        <Link to="/" className="route-brand">HASSAN / NAZIR</Link>
        <nav aria-label="Primary navigation">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/services" className={navClass}>Services</NavLink>
          <NavLink to="/blogs" className={navClass}>Blogs</NavLink>
          <a href={location.pathname === '/' ? '#contact' : '/#contact'}>Contact</a>
        </nav>
        <div className="route-actions">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="route-github flex items-center justify-center text-neutral-400 hover:text-white"
            aria-label="Search articles and services (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <Search size={15} />
          </button>
          <a className="route-github" href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" aria-label="Hassan Nazir on GitHub">
            <Github size={16} />
          </a>
        {onStartProject ? (
          <button type="button" className="nav-booking-pill" onClick={onStartProject}>
            <span className="hero-cta-pulse">
              <span className="pulse-ring" />
              <span className="pulse-core" />
            </span>
            <span>Book a call</span>
            <ArrowUpRight size={13} />
          </button>
        ) : (
          <a className="nav-booking-pill" href="/#contact">
            <span className="hero-cta-pulse">
              <span className="pulse-ring" />
              <span className="pulse-core" />
            </span>
            <span>Book a call</span>
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </header>
    <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
  </>
);
};

export default EditorialNav;
