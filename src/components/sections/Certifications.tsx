import React from 'react';
import { AwardIcon, ShieldIcon, CheckCircleIcon } from 'lucide-react';
import { GlowingEffect } from '../ui/GlowingEffect';

const certifications = [
  {
    name: "Certified Ethical Hacker - Practical (CEH-P)",
    issuer: "NUST-NCAI / NAVTTC",
    date: "2024",
    description: "Completed the NAVTTC course Of Certified Ethical Hacker assembled by the EC Council. The course contained detailed information and practicals on up-to-date Cyber Security operations and Protocols. The main points from the course are Active Directory, Network Security, and OSINT.",
    icon: <ShieldIcon size={20} />
  },
  {
    name: "Practical Ethical Hacking (PEH)",
    issuer: "TCM Security Academy",
    date: "2024",
    description: "Completed the TCM Academy's Course on Practical Ethical Hacking which contained detailed practicals on intermediate-level Cyber Security operation and protocols. The main takeaways from the certification were Networking, python scripting, and Malware Analysis.",
    icon: <CheckCircleIcon size={20} />
  },
  {
    name: "ISO/IEC 27001 Information Security Associate",
    issuer: "SkillFront",
    date: "2024",
    description: "Comprehensive certification covering Information Security Management System (ISMS) implementation, Risk Assessment, Security policies and procedures development, Risk management processes, and ISMS effectiveness review.",
    icon: <AwardIcon size={20} />
  }
];

const Certifications = ({ darkMode }) => {
  return (
    <section id="certifications" className="py-20 px-6 md:px-12 lg:px-20 bg-black">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Certifications
          </h2>
          
          <div className="grid gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-black border border-gray-700 rounded-lg p-6 hover:border-white transition-colors duration-300 relative"
              >
                <GlowingEffect 
                  variant="white" 
                  proximity={100} 
                  spread={30} 
                  movementDuration={1.5}
                />
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gray-900 text-white flex-shrink-0">
                    {cert.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {cert.name}
                        </h3>
                        <p className="text-gray-300">
                          {cert.issuer}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400 font-mono">
                        {cert.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;