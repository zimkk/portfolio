import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Github, Menu, Search, X } from 'lucide-react';

const SearchModal = lazy(() => import('../blog/SearchModal').then((m) => ({ default: m.SearchModal })));

type EditorialNavProps = {
  onStartProject?: () => void;
  onPrefetchProject?: () => void;
};

const EditorialNav = ({ onStartProject, onPrefetchProject }: EditorialNavProps) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navClass = ({ isActive }: { isActive: boolean }) => isActive ? 'is-active' : undefined;
  const contactHref = location.pathname === '/' ? '#contact' : '/#contact';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close the mobile menu whenever the route or hash changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', menuOpen);
    return () => document.body.classList.remove('nav-menu-open');
  }, [menuOpen]);

  // Close the mobile menu if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const handleChange = (e: MediaQueryListEvent) => { if (e.matches) setMenuOpen(false); };
    desktop.addEventListener('change', handleChange);
    return () => desktop.removeEventListener('change', handleChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const bookingContent = (
    <>
      <span className="hero-cta-pulse">
        <span className="pulse-ring" />
        <span className="pulse-core" />
      </span>
      <span>Book a call</span>
      <ArrowUpRight size={13} />
    </>
  );

  const bookingCta = (className: string) => (onStartProject ? (
    <button
      type="button"
      className={className}
      onClick={() => { closeMenu(); onStartProject(); }}
      onPointerEnter={onPrefetchProject}
      onFocus={onPrefetchProject}
    >
      {bookingContent}
    </button>
  ) : (
    <a className={className} href="/#contact" onClick={closeMenu}>
      {bookingContent}
    </a>
  ));

  return (
    <>
      <header className="route-nav">
        <Link to="/" className="route-brand">HASSAN / NAZIR</Link>
        <nav aria-label="Primary navigation">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/services" className={navClass}>Services</NavLink>
          <NavLink to="/blogs" className={navClass}>Blogs</NavLink>
          <a href={contactHref}>Contact</a>
        </nav>
        <div className="route-actions">
          <button
            type="button"
            onClick={() => { closeMenu(); setSearchOpen(true); }}
            className="route-github flex items-center justify-center text-neutral-400 hover:text-white"
            aria-label="Search articles and services (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <Search size={15} />
          </button>
          <a className="route-github route-desktop-only" href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" aria-label="Hassan Nazir on GitHub">
            <Github size={16} />
          </a>
          {bookingCta('nav-booking-pill route-desktop-only')}
          <button
            type="button"
            className="route-github route-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>
      <div
        id="mobile-nav-menu"
        className={`route-mobile-menu${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <NavLink to="/" end className={navClass} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/services" className={navClass} onClick={closeMenu}>Services</NavLink>
          <NavLink to="/blogs" className={navClass} onClick={closeMenu}>Blogs</NavLink>
          <a href={contactHref} onClick={closeMenu}>Contact</a>
        </nav>
        <div className="route-mobile-menu-actions">
          {bookingCta('nav-booking-pill route-mobile-cta')}
          <a className="route-mobile-github" href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            <Github size={15} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
      {searchOpen && (
      <Suspense fallback={null}>
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </Suspense>
    )}
  </>
);
};

export default EditorialNav;
