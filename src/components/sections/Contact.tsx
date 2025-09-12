import React, { useState, useRef } from 'react';
import { MailIcon, GithubIcon, LinkedinIcon, GlobeIcon, SendIcon, CheckCircleIcon, UserIcon, MessageSquareIcon } from 'lucide-react';
import { GlowingEffect } from '../ui/GlowingEffect';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs';

const Contact = ({ darkMode }) => {
  const form = useRef();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form.current!,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      console.log('Email sent successfully:', result);
      setIsSubmitted(true);
      setIsLoading(false);
      setFormState({
        name: '',
        email: '',
        message: ''
      });
      // Reset form status after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setIsLoading(false);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Ready to bring your next project to life? Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contact Info */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-gray-600/50 transition-all duration-300 relative h-full">
              <GlowingEffect 
                variant="white" 
                proximity={100} 
                spread={30} 
                movementDuration={1.5}
              />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg">
                  <MessageSquareIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-8">
                Feel free to reach out for collaborations, opportunities, or just to say hello! 
                I'm always open to discussing new projects and innovative ideas.
              </p>

              <div className="space-y-6">
                  <a 
                    href="mailto:hassannazir955@gmail.com" 
                    target="_self"
                    className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="p-3 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <MailIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-white">Email</h4>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        hassannazir955@gmail.com
                      </p>
                    </div>
                  </a>

                  <a 
                    href="https://github.com/zimkk" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="p-3 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <GithubIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-white">GitHub</h4>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        github.com/zimkk
                      </p>
                    </div>
                  </a>

                  <a 
                    href="https://linkedin.com/in/hassannazirrr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="p-3 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <LinkedinIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-white">LinkedIn</h4>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        linkedin.com/in/hassannazirrr
                      </p>
                    </div>
                  </a>

                  <a 
                    href="https://hassannazir.dev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="p-3 rounded-full bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <GlobeIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-white">Website</h4>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        hassannazir.vercel.app
                      </p>
                    </div>
                  </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-gray-600/50 transition-all duration-300 relative h-full">
              <GlowingEffect 
                variant="white" 
                proximity={100} 
                spread={30} 
                movementDuration={1.5}
              />
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 rounded-full mb-6 bg-white/10 text-white animate-pulse">
                    <CheckCircleIcon size={48} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Send a Message</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <label htmlFor="name" className="block mb-3 text-sm font-medium text-gray-300">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formState.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-4 rounded-xl bg-black/30 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:border-gray-600/50" 
                        placeholder="Enter your full name" 
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formState.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-4 rounded-xl bg-black/30 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:border-gray-600/50" 
                        placeholder="your.email@example.com" 
                      />
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block mb-3 text-sm font-medium text-gray-300">
                        Your Message
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formState.message} 
                        onChange={handleChange} 
                        required 
                        rows={6} 
                        className="w-full px-4 py-4 rounded-xl bg-black/30 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 hover:border-gray-600/50 resize-none" 
                        placeholder="Tell me about your project or just say hello..." 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 bg-white hover:bg-gray-200 text-black hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <SendIcon size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-16 text-center">
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto relative">
              <GlowingEffect 
                variant="white" 
                proximity={100} 
                spread={30} 
                movementDuration={1.5}
              />
              <p className="text-gray-300 italic text-lg leading-relaxed">
                "Great projects start with great conversations. Let's build something amazing together."
              </p>
              <div className="mt-4 text-white font-semibold">— Hassan Nazir</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;