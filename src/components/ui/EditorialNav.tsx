import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

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
      {onStartProject ? (
        <button type="button" className="route-contact" onClick={onStartProject}>Start a project <ArrowUpRight size={14} /></button>
      ) : (
        <a className="route-contact" href="mailto:hassannazir955@gmail.com?subject=Project%20inquiry">Start a project <ArrowUpRight size={14} /></a>
      )}
    </header>
  );
};

export default EditorialNav;
