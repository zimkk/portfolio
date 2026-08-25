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
          <button type="button" className="route-contact" onClick={onStartProject}>Start a project <ArrowUpRight size={14} /></button>
        ) : (
          <a className="route-contact" href="/#contact">Start a project <ArrowUpRight size={14} /></a>
        )}
      </div>
    </header>
  );
};

export default EditorialNav;
