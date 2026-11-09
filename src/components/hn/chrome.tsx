import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, Monitor, Moon, Rss, Sun, X } from 'lucide-react';
import { ThemePref, useBooking, useClock, useInView, useThemePref } from './hooks';
import Ico from './graphics/Ico';
import { projectPath, projects, SERVICE_NAMES } from '../../data/work';
import './hn.css';

/** The HN monogram: square frame, two strokes, a small accent square. */
function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 11v18M10 20h8M18 11v18M23 29V11l8 18V11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
      <rect className="hn-brand-dot" x="31" y="3" width="6" height="6" fill="var(--hn-accent)" />
    </svg>
  );
}

const pad = (value: number) => String(value).padStart(2, '0');

function NavClock() {
  const { hours, minutes, seconds } = useClock('Asia/Karachi');
  return (
    <span className="hn-nav-clock hn-mono" title="Local time in Islamabad">
      ISB <b>{pad(hours)}<span style={{ opacity: seconds % 2 ? 0.25 : 1 }}>:</span>{pad(minutes)}</b>
    </span>
  );
}

/* ---------- Booking, shared by every page ---------- */
const BookingCtx = createContext<{ openBooking: () => void; prefetch: () => void }>({ openBooking: () => undefined, prefetch: () => undefined });
export const useBookingCtx = () => useContext(BookingCtx);

/** Nav, footer and the booking drawer around a page's content. */
export function PageShell({ children }: { children: ReactNode }) {
  const { openBooking, prefetch, modal } = useBooking();
  return (
    <BookingCtx.Provider value={{ openBooking, prefetch }}>
      <div className="hn">
        <SiteNav onBook={openBooking} onPrefetch={prefetch} />
        <main>{children}</main>
        <SiteFooter />
      </div>
      {modal}
    </BookingCtx.Provider>
  );
}

const NAV_LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/blogs', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
];

type NavProps = { onBook: () => void; onPrefetch?: () => void };

export function SiteNav({ onBook, onPrefetch }: NavProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [onAlt, setOnAlt] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        // Match the nav to whichever band sits under it.
        const probe = 34;
        setOnAlt(Array.from(document.querySelectorAll('.hn .hn-alt')).some((element) => {
          if (element.closest('.hn-nav, .hn-footer')) return false;
          const rect = element.getBoundingClientRect();
          return rect.top <= probe && rect.bottom >= probe;
        }));
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'is-active' : undefined);
  const theme = !open && onAlt ? 'hn-alt' : 'hn-light';

  return (
    <div className="hn-scope">
      <header className={`hn-nav ${theme}${scrolled || open ? ' is-scrolled' : ''}`}>
        <div className="hn-frame hn-nav-inner">
          <Link to="/" className="hn-brand" aria-label="Hassan Nazir, home">
            <Monogram />
            <span>Hassan Nazir</span>
          </Link>
          <nav className="hn-nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}
          </nav>
          <div className="hn-nav-right">
            <NavClock />
            <button type="button" className="hn-btn hn-btn-primary" onClick={onBook} onPointerEnter={onPrefetch} onFocus={onPrefetch}>
              <Ico /> Book a call
            </button>
            <button type="button" className="hn-menu-btn" aria-expanded={open} aria-controls="hn-mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <span ref={progress} className="hn-progress" aria-hidden="true" />
      </header>
      <div id="hn-mobile-menu" className={`hn-mobile-menu hn-light${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map((link, index) => (
            <Link key={link.to} to={link.to} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {link.label}<span>0{index + 1}</span>
            </Link>
          ))}
        </nav>
        <button type="button" className="hn-btn hn-btn-primary" tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); onBook(); }}>
          <Ico /> Book 30 minutes
        </button>
      </div>
    </div>
  );
}

/** Numbered section header: 02 label, then a hairline that draws itself in. */
export function SectionHead({ index, label, aside }: { index: string; label: string; aside?: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: '0px 0px -10% 0px' });
  return (
    <div ref={ref} className={`hn-section-head hn-mono${inView ? ' is-in' : ''}`}>
      <b>{index}</b>
      <span>{label}</span>
      <i />
      {aside}
    </div>
  );
}

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: '0px 0px -8% 0px' });
  return (
    <div ref={ref} className={`hn-reveal${inView ? ' is-in' : ''} ${className}`.trim()} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/* ---------- Theme switch ---------- */
const THEME_OPTIONS: Array<{ value: ThemePref; label: string; icon: ReactNode }> = [
  { value: 'system', label: 'System', icon: <Monitor size={15} /> },
  { value: 'light', label: 'Light', icon: <Sun size={15} /> },
  { value: 'dark', label: 'Dark', icon: <Moon size={15} /> },
];

function ThemeSwitch() {
  const { pref, setPref } = useThemePref();
  const index = THEME_OPTIONS.findIndex((option) => option.value === pref);
  return (
    <div className="hn-theme" role="radiogroup" aria-label="Colour theme">
      <span className="hn-theme-thumb" style={{ transform: `translateX(${index * 100}%)` }} aria-hidden="true" />
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={pref === option.value}
          title={option.label}
          className={pref === option.value ? 'is-on' : undefined}
          onClick={() => setPref(option.value)}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Footer ---------- */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const featured = projects.filter((project) => project.glyph || project.kind === 'product').slice(0, 6);
  return (
    <footer className="hn-footer hn-alt hn-scope">
      <div className="hn-frame hn-footer-top">
        <div className="hn-footer-brand">
          <Link to="/" className="hn-brand"><Monogram /> Hassan Nazir</Link>
          <p>Forward deployed engineer. AI, automation and full-stack software, built inside the team that uses it.</p>
          <ThemeSwitch />
        </div>
        <nav aria-label="Site">
          <h4 className="hn-mono">Site</h4>
          <Link to="/">Home</Link>
          {NAV_LINKS.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
        </nav>
        <nav aria-label="Work">
          <h4 className="hn-mono">Work</h4>
          {featured.map((project) => <Link key={project.slug} to={projectPath(project.slug)}>{project.name}</Link>)}
          <Link to="/work" className="is-more">All {projects.length} projects</Link>
        </nav>
        <nav aria-label="Services">
          <h4 className="hn-mono">Services</h4>
          {Object.entries(SERVICE_NAMES).map(([slug, name]) => <Link key={slug} to={`/services/${slug}`}>{name}</Link>)}
        </nav>
        <nav aria-label="Elsewhere">
          <h4 className="hn-mono">Elsewhere</h4>
          <a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer"><Github size={14} />GitHub</a>
          <a href="https://linkedin.com/in/hassannazirrr" target="_blank" rel="noopener noreferrer"><Linkedin size={14} />LinkedIn</a>
          <a href="mailto:hassannazir955@gmail.com"><Mail size={14} />Email</a>
          <a href="/feed.xml"><Rss size={14} />RSS</a>
        </nav>
      </div>
      <div className="hn-frame hn-footer-word" aria-hidden="true">
        <svg viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid meet">
          <text x="2" y="138" textLength="1196" lengthAdjust="spacingAndGlyphs">HASSAN NAZIR</text>
        </svg>
      </div>
      <div className="hn-frame hn-footer-base hn-mono">
        <span>© {year} Hassan Nazir</span>
        <span>Islamabad / Dubai</span>
        <a href="https://github.com/zimkk/portfolio" target="_blank" rel="noopener noreferrer">Built in the open <ArrowUpRight size={12} /></a>
      </div>
    </footer>
  );
}

/** Site nav plus its own booking drawer, for pages that keep their own layout (the blog). */
export function StandaloneNav() {
  const { openBooking, prefetch, modal } = useBooking();
  return (
    <>
      <SiteNav onBook={openBooking} onPrefetch={prefetch} />
      {modal}
    </>
  );
}
