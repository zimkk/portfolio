import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const EditorialNav = () => (
  <header className="route-nav">
    <Link to="/" className="route-brand">HASSAN / NAZIR</Link>
    <nav aria-label="Primary navigation">
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Link to="/work">Case studies</Link>
      <Link to="/blogs">Writing</Link>
      <a href="/#contact">Contact</a>
    </nav>
    <a href="mailto:hassannazir955@gmail.com">Start a conversation <ArrowUpRight size={14} /></a>
  </header>
);

export default EditorialNav;
