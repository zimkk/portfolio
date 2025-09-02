import React, { useState } from 'react';
import { LampDemo } from './components/ui/lamp';
import FloatingNav from './components/ui/FloatingNav';
import SectionNav from './components/ui/SectionNav';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Certifications from './components/sections/Certifications';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
export function App() {
  const [darkMode, setDarkMode] = useState(true);

  return <div className="min-h-screen bg-black text-white">
      {/* Floating Navigation */}
      <FloatingNav />
      {/* Section Navigation Chain */}
      <SectionNav />
      <div className="flex">
        {/* Main Content */}
        <main className="w-full pt-4 md:pl-20 lg:pl-24 lg:pr-20">
          <div id="home">
            <LampDemo />
          </div>
          <About darkMode={darkMode} />
          <Experience darkMode={darkMode} />
          <Skills darkMode={darkMode} />
          <Certifications darkMode={darkMode} />
          <Education darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </main>
      </div>
    </div>;
}