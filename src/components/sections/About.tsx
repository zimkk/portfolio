import React, { useEffect, useState } from 'react';
import { BrainIcon, CodeIcon, ServerIcon, ZapIcon, RocketIcon, LayersIcon, GitBranchIcon, DatabaseIcon } from 'lucide-react';
import { GlowingEffect } from '../ui/GlowingEffect';

const About = ({ }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const highlights = [
    { icon: <BrainIcon className="w-6 h-6" />, text: "AI Systems Architecture" },
    { icon: <ZapIcon className="w-6 h-6" />, text: "Event-Driven Automation" },
    { icon: <LayersIcon className="w-6 h-6" />, text: "Microservices & APIs" },
    { icon: <ServerIcon className="w-6 h-6" />, text: "Cloud & DevOps" }
  ];

  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "100+", label: "Solutions Delivered" },
    { number: "10K+", label: "Daily Transactions" },
    { number: "99.9%", label: "Platform Uptime" }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Main Content */}
                          <div className="space-y-6 lg:space-y-8">
              {/* Introduction Card */}
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-gray-600/50 transition-all duration-300 relative">
                <GlowingEffect 
                  variant="white" 
                  proximity={100} 
                  spread={30} 
                  movementDuration={1.5}
                />
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <RocketIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Innovation-Driven Engineer</h3>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I am <span className="text-white font-semibold">Hassan Nazir</span>, a full-stack engineer and AI systems architect with 3+ years of experience building scalable distributed systems, microservices, and high-availability backend platforms. I design REST and event-driven architectures that handle 10K+ daily transactions with 99.9% uptime.
                  </p>
                  <p>
                    My proven impact includes 40% operational cost reduction and 60% workflow efficiency improvement through intelligent backend automation. I focus on security, observability, and compliance-sensitive systems, while actively expanding Java and Spring Boot expertise alongside deep Python and API engineering work.
                  </p>
                </div>
              </div>

              {/* Philosophy Card */}
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-gray-600/50 transition-all duration-300 relative">
                <GlowingEffect 
                  variant="white" 
                  proximity={100} 
                  spread={30} 
                  movementDuration={1.5}
                />
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <GitBranchIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">My Approach</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  I build reliable systems end-to-end: architecture, APIs, infrastructure, monitoring, and delivery. I prioritize clean service boundaries, production readiness, and measurable outcomes so teams can ship faster with confidence.
                </p>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="space-y-8">
              {/* Expertise Highlights */}
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <CodeIcon className="w-6 h-6 text-white" />
                  </div>
                  Core Expertise
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {highlights.map((highlight, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="text-white opacity-80">
                        {highlight.icon}
                      </div>
                      <span className="text-gray-300 font-medium">{highlight.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <DatabaseIcon className="w-6 h-6 text-white" />
                  </div>
                  By the Numbers
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-16 text-center">
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 max-w-4xl mx-auto">
              <blockquote className="text-lg text-gray-300 italic leading-relaxed">
                "I believe in the power of automation and AI to transform how we work and live. 
                Every line of code I write is a step towards a more efficient and intelligent future."
              </blockquote>
              <div className="mt-4 text-white font-semibold">— Hassan Nazir</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;