import React, { useState, useRef } from 'react';
import { MailIcon, GithubIcon, LinkedinIcon, GlobeIcon, CheckCircleIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';

const links = [
  { label: 'Email', value: 'hassannazir955@gmail.com', href: 'mailto:hassannazir955@gmail.com', icon: MailIcon, external: false },
  { label: 'GitHub', value: 'github.com/zimkk', href: 'https://github.com/zimkk', icon: GithubIcon, external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/hassannazirrr', href: 'https://linkedin.com/in/hassannazirrr', icon: LinkedinIcon, external: true },
  { label: 'Website', value: 'hassannazir.dev', href: 'https://hassannazir.dev', icon: GlobeIcon, external: true }
];

const inputClasses =
  'w-full px-4 py-3 rounded-md bg-transparent border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors duration-200';

const Contact = ({ }) => {
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form.current!,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setIsSubmitted(true);
      setIsLoading(false);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setIsLoading(false);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          index="07"
          label="Contact"
          title="Let's work together"
          description="Open to collaborations, opportunities, and new projects. Reach out directly or send a message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 md:gap-16">
          {/* Links */}
          <Reveal className="space-y-1">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-3 py-3 text-neutral-400 hover:text-white transition-colors duration-200"
              >
                <link.icon size={16} className="text-neutral-600 group-hover:text-white transition-colors duration-200 flex-shrink-0" />
                <span className="text-sm">{link.value}</span>
              </a>
            ))}
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-neutral-900 rounded-lg">
                <CheckCircleIcon size={32} className="text-white mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Message sent</h3>
                <p className="text-sm text-neutral-400">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm text-neutral-400">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-neutral-400">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm text-neutral-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm bg-white text-black hover:bg-neutral-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Hassan Nazir
          </p>
          <p className="text-xs font-mono text-neutral-700">
            Islamabad, Pakistan
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
