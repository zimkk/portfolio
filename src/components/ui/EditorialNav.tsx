import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';

type EditorialNavProps = {
  onStartProject?: () => void;
};

const EditorialNav = ({ onStartProject }: EditorialNavProps) => {
  const location = useLocation();
  const navClass = ({ isActive }: { isActive: boolean }) => isActive ? 'is-active' : undefined;

  return (
    <header className="route-nav">
      <Link to="/" className="route-brand">HASSAN / NAZIR</Link>
      <nav aria-label="Primary navigation">
        <NavLink to="/" end className={navClass}>Home</NavLink>
        <NavLink to="/services" className={navClass}>Services</NavLink>
        <NavLink to="/work" className={navClass}>Case studies</NavLink>
        <NavLink to="/blogs" className={navClass}>Writing</NavLink>
        <a href={location.pathname === '/' ? '#contact' : '/#contact'}>Contact</a>
      </nav>
      <div className="route-actions">
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
  );
};

export default EditorialNav;
