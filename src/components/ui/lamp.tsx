import React, { useState } from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon, CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from "../../lib/utils";
import BookingModal from './BookingModal';

export function LampDemo() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <LampContainer>
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300/30 mb-4 bg-gradient-to-br from-white/20 to-gray-800 mt-2 shadow-lg shadow-white/10"
        >
                                <img 
            src="/images/profile.png" 
            alt="Hassan Nazir Profile" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-gray-800/30 shadow-lg shadow-white/20"
        >
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <span className="text-sm text-gray-200">Islamabad, Pakistan</span>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 bg-gradient-to-br from-white to-gray-300 py-4 bg-clip-text text-center text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-transparent mb-4"
        >
          Hassan Nazir
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-lg sm:text-xl md:text-2xl text-white mb-8 font-medium font-mono px-4"
        >
          {"{ \"role\": \"AI Engineer\" }"}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex gap-4 mb-8"
        >
          <a 
            href="https://github.com/zimkk" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-300 group shadow-lg hover:shadow-white/30"
          >
            <GithubIcon size={24} className="text-gray-300 group-hover:text-white transition-colors" />
          </a>
          <a 
            href="https://linkedin.com/in/hassannazirrr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-300 group shadow-lg hover:shadow-white/30"
          >
            <LinkedinIcon size={24} className="text-gray-300 group-hover:text-white transition-colors" />
          </a>
          <a 
            href="mailto:hassannazir955@gmail.com" 
            target="_self"
            className="p-3 rounded-full bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-300 group shadow-lg hover:shadow-white/30"
          >
            <MailIcon size={24} className="text-gray-300 group-hover:text-white transition-colors" />
          </a>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="max-w-3xl mb-8"
        >
          <p className="text-gray-300 leading-relaxed text-lg">
            AI & Automation Engineer skilled in building intelligent workflows with both code and no-code tools (n8n, Make, GHL). 
            I have extensive experience in fine-tuning LLMs, Python automation, and integrating frameworks like LangChain and Hugging Face. 
            My strong background in cloud (AWS, Docker, CI/CD) and QA ensures scalable, reliable, and efficient AI-driven solutions.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 text-black font-medium transition-all duration-300 transform hover:scale-105"
          >
            <CalendarIcon size={20} />
            <span>Schedule a call</span>
            <ChevronRightIcon size={20} />
          </button>

        </motion.div>
      </div>
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full z-0",
        className
      )}
    >
             <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 translate-y-32 pointer-events-none">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-white via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-white text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-white opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-white blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-white "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-black "></div>
      </div>

             <div className="relative z-50 flex -translate-y-20 flex-col items-center px-5 pt-60 pointer-events-auto">
        {children}
      </div>
    </div>
  );
};
