import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Github, Search } from 'lucide-react';

const SearchModal = lazy(() => import('../blog/SearchModal').then((m) => ({ default: m.SearchModal })));

type EditorialNavProps = {
  onStartProject?: () => void;
  onPrefetchProject?: () => void;
};

const EditorialNav = ({ onStartProject, onPrefetchProject }: EditorialNavProps) => {
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
          <button
            type="button"
            className="nav-booking-pill"
            onClick={onStartProject}
            onPointerEnter={onPrefetchProject}
            onFocus={onPrefetchProject}
          >
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
      {searchOpen && (
      <Suspense fallback={null}>
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </Suspense>
    )}
  </>
);
};

export default EditorialNav;
