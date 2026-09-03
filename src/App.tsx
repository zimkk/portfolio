import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import SEOHead from './components/ui/SEOHead';
import EditorialNav from './components/ui/EditorialNav';
import { EMAILJS_CONFIG } from './config/emailjs';
import { blogPosts } from './data/blogs';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const loadBookingModal = () => import('./components/ui/BookingModal');
const BookingModal = lazy(loadBookingModal);

const projects = [
  {
    title: 'The Home Club',
    descriptor: 'Full-Stack Software Development · Sports Platform',
    summary: 'A public-facing sports platform that turns memberships, programs, and community activity into one clear journey.',
    contribution: 'Full-stack engineering · Next.js · Production delivery',
    image: '/images/projects/the-home-club.webp',
    href: 'https://thehomeclubsports.com',
  },
  {
    title: 'N8NHUB',
    descriptor: 'AI Automations · n8n Workflow Library',
    summary: 'More than 2,000 searchable n8n workflows organized for builders who need a working automation pattern, not another tutorial.',
    contribution: 'AI Automations · Information architecture · Full stack',
    image: '/images/projects/n8nhub.webp',
    href: 'https://n8nhub.hassannazir.dev',
  },
  {
    title: 'SpeedyInfluencer',
    descriptor: 'Full-Stack SaaS Development · Creator Operations',
    summary: 'Campaign management, creator collaboration, and performance data brought into a focused operating surface for brands.',
    contribution: 'SaaS engineering · Custom APIs · Full-stack systems',
    image: '/images/projects/speedyinfluencer.webp',
    href: 'https://speedyinfluencer.com',
  },
  {
    title: 'SmartFurs',
    descriptor: 'Full-Stack Commerce & Experience Design',
    summary: 'A modern storefront for puppy discovery shaped around buyer confidence, clean navigation, and a low-friction enquiry path.',
    contribution: 'Commerce engineering · React · Full-stack UI',
    image: '/images/projects/smartfurs.webp',
    href: 'https://smartfurs.vercel.app',
  },
];

const experiences = [
  { period: 'Aug 2021 — Present', role: 'Software Architect & Full-Stack Engineer', company: 'GridCore', mode: 'Hybrid', detail: 'Promoted into lead architect ownership across web, mobile, and desktop teams; client discovery, NestJS/React delivery, and applied AI where it improves operations.' },
  { period: 'May 2026 — Present', role: 'AI Architect', company: 'Uno OS', mode: 'Part-time · Remote', detail: 'Final technical decision-maker for the AI and software portfolio; architecting an AI-native business OS with a team of seven across four engagements.' },
  { period: 'Aug 2025 — Apr 2026', role: 'Senior AI Engineer', company: 'NDT Legacy Group', mode: 'Part-time · Remote', detail: 'Led client AI automation from discovery through production using n8n, Zapier, REST APIs, and LLM integrations.' },
  { period: 'Oct 2025 — Jan 2026', role: 'Senior AI Engineer', company: 'Schmoozzer', mode: 'Contract · Remote', detail: 'Built SMB automation with LLMs and n8n across 7–8 clients, including NY County auditing and reporting workflows.' },
  { period: 'Feb 2025 — Sep 2025', role: 'Lead QA Engineer', company: 'Brilliant Gaming', mode: 'Contract · Remote', detail: 'Led an eight-person QA team validating EPWIN payment-critical casino flows with UI, API, and regression coverage.' },
  { period: 'Dec 2022 — Nov 2023', role: 'QA Executive', company: 'Touchstone Communications', mode: 'Part-time · Hybrid', detail: 'Quality, compliance, and internal systems QA across 14+ teams; earlier stint Jul 2020 — May 2021.' },
];

const capabilities = [
  {
    title: 'AI Automations & Multi-Agent Systems',
    body: 'Enterprise AI automations, LangGraph multi-agent orchestration, RAG pipelines, tool use, and evaluation.',
    tools: ['LangGraph', 'n8n', 'Claude', 'OpenAI', 'Vector DBs'],
  },
  {
    title: 'Full-Stack Software Development',
    body: 'Scalable web applications, FastAPI backends, Next.js/React frontends, PostgreSQL databases, and APIs.',
    tools: ['TypeScript', 'React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Forward Deployed Engineering & Cloud Delivery',
    body: 'Embedded technical delivery, AWS/GCP cloud infrastructure, Docker, CI/CD, and Zero Trust security architecture.',
    tools: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Playwright', 'CI/CD'],
  },
];

const notes = blogPosts.slice(0, 3).map((post) => ({
  slug: post.slug,
  topic: post.category,
  time: post.readTime,
  title: post.title,
}));

const feedback = [
  { quote: 'The automation solution transformed our workflow efficiency beyond expectations.', author: 'Project Manager', company: 'NDT Legacy Group' },
  { quote: 'The security monitoring system became the backbone of our infrastructure protection.', author: 'CTO', company: 'GridCore' },
  { quote: 'The testing framework changed our development process and materially improved product quality.', author: 'Lead Developer', company: 'Brilliant Gaming' },
];

const marquee = ['FORWARD DEPLOYED ENGINEER', 'AI AUTOMATIONS', 'FULL-STACK DEVELOPMENT', 'CUSTOM SOFTWARE ENGINEERING', 'AI AGENTS & RAG', 'ENTERPRISE N8N WORKFLOWS'];

const githubProjects = [
  {
    name: 'WonderKit',
    repo: 'wonderkit',
    signal: 'Agent-native infrastructure',
    description: 'A multi-tenant AI SaaS foundation with provider-swappable LLMs, durable agent runs, pgvector memory, metered billing, evaluation, and deployment paths.',
    proof: ['4-agent runtime', '8 GitHub stars', 'Next.js + pgvector'],
    language: 'TypeScript',
    href: 'https://github.com/zimkk/wonderkit',
  },
  {
    name: 'Vigil',
    repo: 'vigil',
    signal: 'Security research tooling',
    description: 'A cybersecurity research tool built to help teams ship more complete products by making security work part of the engineering record.',
    proof: ['Cybersecurity research', 'Python', 'Product assurance'],
    language: 'Python',
    href: 'https://github.com/zimkk/vigil',
  },
  {
    name: 'NY Municipal Monitor',
    repo: 'erdman-ny-county',
    signal: 'Operational intelligence',
    description: 'A decision-maker monitoring system spanning 60 New York county sites: scheduled collection, contact-history diffs, webhook alerts, and an operator-facing dashboard.',
    proof: ['60 county sources', 'Change detection', 'FastAPI + Next.js'],
    language: 'Python',
    href: 'https://github.com/zimkk/erdman-ny-county',
  },
  {
    name: 'Maps Lead Engine',
    repo: 'Lead-Scraper-Google-Maps',
    signal: 'Resilient field automation',
    description: 'An async, resumable Playwright system that searches by city, area, or geographic grid and turns Maps listings into qualified outreach datasets.',
    proof: ['258 tests passing', 'Crash-safe resume', 'CSV + Excel'],
    language: 'Python',
    href: 'https://github.com/zimkk/Lead-Scraper-Google-Maps',
  },
  {
    name: 'Mynecraft',
    repo: 'mynecraft',
    signal: 'Systems engineering in-browser',
    description: 'A hand-built voxel engine with procedural worlds, worker-streamed chunks, custom lighting, AABB physics, mob AI, multiple dimensions, and versioned saves.',
    proof: ['Three.js + WebGL', 'Procedural engine', '2 runtime dependencies'],
    language: 'TypeScript',
    href: 'https://github.com/zimkk/mynecraft',
  },
  {
    name: 'Legal Intelligence',
    repo: 'legal-Document-Summerizer',
    signal: 'Domain-specific applied AI',
    description: 'A local legal-document pipeline covering dataset preparation, Llama 3 fine-tuning, PDF and DOCX processing, structured summaries, and Gemma-based verification.',
    proof: ['LoRA fine-tuning', 'Local Ollama models', 'Summary verification'],
    language: 'Python',
    href: 'https://github.com/zimkk/legal-Document-Summerizer',
  },
  {
    name: 'N8N Hub',
    repo: 'n8nhub',
    signal: 'Automation knowledge system',
    description: 'A searchable workflow platform that organizes more than 2,000 n8n automations with categorization, visual documentation, analytics, and community discussion.',
    proof: ['2,000+ workflows', '365+ integrations', 'Next.js + MongoDB'],
    language: 'TypeScript',
    href: 'https://github.com/zimkk/n8nhub',
  },
];

const githubArchive = [
  ['Anomaly-Detection-System', 'ML ensembles · streaming analysis'],
  ['Transcription-and-Sentiment-Analyzer', 'Speech · OCR · NLP · scraping'],
  ['GPT-2-Content-Generator', 'Local generation · keyword extraction'],
  ['Flutter-installation-Script-for-Windows-Linux', 'Cross-platform developer tooling'],
  ['Nextjs-Docker-Deployment-Script-Python', 'Container deployment automation'],
  ['genAi', 'TypeScript generative AI experiments'],
  ['Portfolio-old', 'Earlier TypeScript portfolio system'],
];

const githubStack = [
  { title: 'Applied AI', tools: ['Agents', 'RAG', 'LangGraph', 'Hugging Face', 'PyTorch', 'Ollama', 'OpenAI', 'Claude'] },
  { title: 'Product systems', tools: ['TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'FastAPI', 'Django', 'REST'] },
  { title: 'Data + memory', tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'pgvector', 'Pinecone', 'Chroma', 'SQLite'] },
  { title: 'Automation', tools: ['n8n', 'Make', 'Zapier', 'Playwright', 'Selenium', 'Apify', 'Event pipelines'] },
  { title: 'Delivery', tools: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'DigitalOcean', 'CI/CD', 'Jenkins', 'Observability'] },
];

const revealWords = (text: string) => text.split(' ').map((word, index) => (
  <span className="statement-word" key={`${word}-${index}`}>{word}</span>
));

export function App() {
  const page = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingReady, setBookingReady] = useState(false);
  const [bookingFloating, setBookingFloating] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.intro-gate', { display: 'none' });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .from('.masthead-word', { yPercent: 110, duration: 0.8, stagger: 0.08 })
      .from('.hero-foreground-word', { xPercent: -10, opacity: 0, duration: 0.72 }, '-=.55')
      .from('.hero-actions, .hero-role-note', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=.4')
      .to('.fde-forward', { scaleX: 1.02, transformOrigin: 'left center', duration: 0.75, ease: 'expo.inOut' }, '-=.65');

    gsap.to('.site-progress i', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: page.current, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });

    gsap.to('.fde-title', {
      scale: 0.91,
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.fde-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.fromTo('.statement-word', { opacity: 0.11 }, {
      opacity: 1,
      stagger: 0.045,
      ease: 'none',
      scrollTrigger: { trigger: '.statement-section h2', start: 'top 78%', end: 'bottom 38%', scrub: true },
    });

    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        ScrollTrigger.create({
          trigger: '.cases-layout',
          start: 'top 12%',
          end: 'bottom 70%',
          pin: '.cases-intro',
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: '.github-overview',
          start: 'top 12%',
          end: 'bottom bottom',
          pin: '.github-index',
          pinSpacing: false,
        });
      },
    });

    gsap.utils.toArray<HTMLElement>('.case-sheet').forEach((sheet, index) => {
      gsap.fromTo(
        sheet,
        { y: 90, scale: 0.94, rotate: index % 2 ? 0.8 : -0.8 },
        {
          y: 0,
          scale: 1,
          rotate: 0,
          ease: 'none',
          scrollTrigger: { trigger: sheet, start: 'top 92%', end: 'top 45%', scrub: true },
        },
      );
      const image = sheet.querySelector('img');
      if (image) {
        gsap.fromTo(image, { scale: 0.86, opacity: 0.38 }, {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: sheet, start: 'top 95%', end: 'top 42%', scrub: true },
        });
      }
    });

    gsap.utils.toArray<HTMLElement>('.github-repo-row').forEach((row, index) => {
      const rule = row.querySelector<HTMLElement>('.github-repo-progress');
      gsap.fromTo(row, { opacity: 0.28, x: index % 2 ? 32 : 18 }, {
        opacity: 1,
        x: 0,
        ease: 'none',
        scrollTrigger: { trigger: row, start: 'top 91%', end: 'top 52%', scrub: 0.45 },
      });
      if (rule) {
        gsap.fromTo(rule, { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top 88%', end: 'bottom 50%', scrub: true },
        });
      }
    });

    gsap.utils.toArray<HTMLElement>('.chapter-reveal').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 84%' },
      });
    });

    const internalNavLinks = gsap.utils.toArray<HTMLAnchorElement>('.nav-links a[href^="#"]');
    internalNavLinks.forEach((link) => {
      const target = document.querySelector(link.hash);
      if (!target) return;
      ScrollTrigger.create({
        trigger: target,
        start: 'top 52%',
        end: 'bottom 52%',
        onToggle: ({ isActive }) => link.classList.toggle('is-active', isActive),
      });
    });

  }, { scope: page });

  useEffect(() => {
    const syncBookingPosition = () => setBookingFloating(window.scrollY > 0);
    syncBookingPosition();
    window.addEventListener('scroll', syncBookingPosition, { passive: true });
    return () => window.removeEventListener('scroll', syncBookingPosition);
  }, []);

  useEffect(() => {
    const warmBooking = () => {
      void loadBookingModal();
      setBookingReady(true);
    };
    const idleWindow = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const idleId = idleWindow.requestIdleCallback?.(warmBooking, { timeout: 1800 });
    const timeoutId = idleId === undefined ? window.setTimeout(warmBooking, 900) : undefined;

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  const openBooking = () => {
    setBookingReady(true);
    setBookingOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.current) return;

    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      window.location.href = `mailto:hassannazir955@gmail.com?subject=Project%20Enquiry%20from%20${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}`;
      setSubmitState('sent');
      return;
    }

    setSubmitState('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, form.current, EMAILJS_CONFIG.PUBLIC_KEY);
      setFormState({ name: '', email: '', message: '' });
      setSubmitState('sent');
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitState('error');
    }
  };

  return (
    <>
      <SEOHead page="home" />
      <main ref={page} className="portfolio-shell w-full max-w-full overflow-x-hidden">
        <div className="site-progress" aria-hidden="true"><i /></div>
        <EditorialNav onStartProject={openBooking} />

        <section id="top" className="hero-section fde-hero">
          <div className="hero-coordinate hero-coordinate-top">Dubai, UAE / Islamabad, PK</div>
          <div className="hero-orbit" aria-hidden="true"><span /><i /><b /></div>
          <h1 className="fde-title" aria-label="Forward Deployed Engineer">
            <span className="hero-line-wrap fde-line"><span className="masthead-word fde-forward">FORWARD</span></span>
            <span className="hero-line-wrap fde-line"><span className="masthead-word fde-deployed">DEPLOYED</span></span>
            <span className="hero-line-wrap fde-line fde-engineer-line"><span className="masthead-word hero-foreground-word">ENGINEER</span></span>
          </h1>
          <figure className="hero-portrait">
            <img src="/images/profile-hero.webp" width="768" height="768" fetchPriority="high" decoding="async" alt="Hassan Nazir, Forward Deployed Engineer working in applied AI" />
          </figure>
          <div className="hero-actions">
            <button
              type="button"
              onClick={openBooking}
              className="hero-booking-cta"
              aria-label="Book a working session"
            >
              <span className="hero-cta-pulse">
                <span className="pulse-ring" />
                <span className="pulse-core" />
              </span>
              <span>Book a Working Session</span>
              <span className="hero-cta-badge">30M</span>
              <ArrowUpRight size={13} />
            </button>
            <a href="#work" className="hero-index-link">
              <span>Explore Work</span>
              <ArrowDown size={13} />
            </a>
          </div>
          <div className="hero-role-note"><strong>FORWARD DEPLOYED · AI AUTOMATIONS · FULL-STACK DEVELOPMENT</strong><p>I embed with teams to deliver enterprise AI automations, full-stack software development, autonomous agents, and production systems that survive real constraints.</p></div>
          <p className="hero-side-note">Custom software engineering and AI automations delivered from discovery through production.</p>
        </section>

        <div className="discipline-marquee" aria-label="Areas of practice">
          <div className="discipline-track">
            {[0, 1].map((group) => (
              <div className="discipline-group" key={group} aria-hidden={group === 1 ? 'true' : undefined}>
                {marquee.map((item) => <span key={`${group}-${item}`}>{item}<i /></span>)}
              </div>
            ))}
          </div>
        </div>

        <section className="statement-section chapter-reveal">
          <p className="statement-context">Forward deployed engineering for modern software and AI delivery.</p>
          <h2>
            {revealWords('I embed with teams,')}
            <span className="inline-image inline-image-code" aria-hidden="true" />
            {revealWords('engineer AI automations and full-stack software that')}
            <span className="inline-image inline-image-cloud" aria-hidden="true" />
            {revealWords('survives contact with reality.')}
          </h2>
          <div className="statement-foot">
            <p>Forward deployed engineering removes handoff friction: discovery, AI automations, full-stack software development, integration, and production ownership stay connected.</p>
            <a href="#work">See the deployments <ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section className="capability-section chapter-reveal">
          <div className="section-heading">
            <p>Three connected disciplines. One accountable engineering practice.</p>
            <h2>Built from the system outward.</h2>
          </div>
          <div className="capability-grid grid-flow-dense">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className={'capability-panel capability-panel-' + (index + 1)}>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                </div>
                <ul>{capability.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
                {index === 0 && <div className="system-diagram" aria-hidden="true"><span /><span /><span /><span /><span /></div>}
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work-section">
          <div className="cases-layout">
            <div className="cases-intro">
              <p>Selected products, shown as products—not thumbnails.</p>
              <h2>Work that had to function beyond the pitch.</h2>
              <p>Public platforms and product surfaces where information architecture, implementation, and delivery had to agree.</p>
              <a href="/blogs">Explore technical blogs <ArrowUpRight size={17} /></a>
            </div>
            <div className="case-stack">
              {projects.map((project) => (
                <article className="case-sheet" key={project.title}>
                  <div className="case-browser">
                    <div className="browser-bar"><i /><i /><i /><span>{new URL(project.href).hostname}</span></div>
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="case-image-link group" aria-label={'Open ' + project.title}>
                      <img src={project.image} loading="lazy" decoding="async" alt={project.title + ' website interface'} />
                    </a>
                  </div>
                  <div className="case-copy">
                    <p>{project.descriptor}</p>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div><span>{project.contribution}</span><a href={project.href} target="_blank" rel="noopener noreferrer">Visit live product <ArrowUpRight size={16} /></a></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="feedback-section chapter-reveal" aria-label="Project feedback">
          <div className="feedback-heading"><p>Project feedback, continuously in motion.</p><span>Hover to hold</span></div>
          <div className="feedback-viewport">
            <div className="feedback-rail">
              {[0, 1].map((group) => (
                <div className="feedback-group" key={group} aria-hidden={group === 1 ? 'true' : undefined}>
                  {feedback.map((item) => (
                    <article className="feedback-item" key={`${group}-${item.company}`}>
                      <blockquote>“{item.quote}”</blockquote>
                      <div className="feedback-person"><strong>{item.author}</strong><span>{item.company}</span></div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="section-heading chapter-reveal">
            <p>Architecture, delivery, quality, and consulting across the same career.</p>
            <h2>Experience without the résumé wall.</h2>
          </div>
          <div className="experience-list">
            {experiences.map((experience) => (
              <article key={experience.company} className="experience-row">
                <p>{experience.period}</p>
                <div><h3>{experience.role}</h3><p>{experience.company}</p></div>
                <p>{experience.detail}</p>
                <span>{experience.mode}</span>
              </article>
            ))}
          </div>
          <div className="credential-band chapter-reveal">
            <div><p>Academic grounding</p><h3>Bachelors in Science, Computer Science</h3><span>Air University, Islamabad · 2020—2024</span></div>
            <div><p>Security credentials</p><h3>CEH-P · PEH · ISO/IEC 27001</h3><span>Practical offensive security and information-security management.</span></div>
          </div>
        </section>

        <section className="writing-section chapter-reveal">
          <div className="section-heading">
            <p>Long-form notes from the systems I work with.</p>
            <h2>Writing for engineers who need the second-order detail.</h2>
          </div>
          <div className="notes-list">
            {notes.map((note) => (
              <a key={note.slug} href={'/blogs/' + note.slug}>
                <span>{note.topic} · {note.time}</span>
                <h3>{note.title}</h3>
                <ArrowUpRight size={24} />
              </a>
            ))}
          </div>
          <a className="writing-archive" href="/blogs">Browse every article <ArrowRight size={17} /></a>
        </section>

        <section className="github-section" aria-labelledby="github-title">
          <div className="github-section-rule" aria-hidden="true"><span>PUBLIC BUILD LOG</span><i /></div>
          <div className="github-overview">
            <aside className="github-index">
              <a className="github-identity" href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                <span><strong>zimkk</strong><small>github.com/zimkk</small></span>
                <ArrowUpRight size={17} />
              </a>
              <p className="github-eyebrow">Original public repositories / audited from source</p>
              <h2 id="github-title">The code has to explain the engineer.</h2>
              <p className="github-deck">Not a contribution mural. A working record across applied AI, operational data systems, browser engines, automation, and the infrastructure that keeps them useful.</p>
              <div className="github-audit">
                <div><strong>24</strong><span>Public repositories inspected</span></div>
                <div><strong>13</strong><span>Original build repositories</span></div>
                <div><strong>02</strong><span>Dominant languages</span></div>
              </div>
              <span className="github-audit-note">Forks reviewed, excluded from authorship claims.</span>
            </aside>

            <div className="github-ledger">
              {githubProjects.map((project) => (
                <a className="github-repo-row" href={project.href} target="_blank" rel="noopener noreferrer" key={project.repo}>
                  <span className="github-repo-progress" aria-hidden="true" />
                  <div className="github-repo-meta">
                    <span>{project.language} / Public source</span>
                    <span>{project.signal}</span>
                  </div>
                  <div className="github-repo-title"><h3>{project.name}</h3><ArrowUpRight size={25} /></div>
                  <p>{project.description}</p>
                  <div className="github-repo-proof">
                    {project.proof.map((item) => <span key={item}>{item}</span>)}
                    <code>zimkk/{project.repo}</code>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="github-archive chapter-reveal">
            <div className="github-archive-heading">
              <p>The rest of the original public work</p>
              <span>Utilities, experiments, and earlier systems remain part of the record.</span>
            </div>
            <div className="github-archive-list">
              {githubArchive.map(([repo, descriptor]) => (
                <a href={`https://github.com/zimkk/${repo}`} target="_blank" rel="noopener noreferrer" key={repo}>
                  <span>{repo}</span><small>{descriptor}</small><ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="github-toolkit chapter-reveal">
            <div className="github-toolkit-heading">
              <p>Technical range / profile README</p>
              <h3>A stack shaped around deployment, not collection.</h3>
              <span>Tools are grouped by what they make possible in the field.</span>
            </div>
            <div className="github-toolkit-matrix">
              {githubStack.map((group) => (
                <div key={group.title}>
                  <h4>{group.title}</h4>
                  <p>{group.tools.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="github-reference chapter-reveal" id="direct-answers">
            <div className="github-reference-heading">
              <p>Direct answers / citation index</p>
              <h3>The short version, without the positioning fog.</h3>
              <a href="/portfolio.json">Open structured portfolio data <ArrowUpRight size={15} /></a>
            </div>
            <dl>
              <div><dt>Who is Hassan Nazir?</dt><dd>Hassan Nazir is a Forward Deployed Engineer and Full-Stack AI Architect. He builds AI automations, full-stack software applications, autonomous multi-agent pipelines, and cloud systems for US and global teams.</dd></div>
              <div><dt>What engineering services can I hire for?</dt><dd>Commercial engineering across Forward Deployed Engineering, AI Automations & n8n workflow systems, Full-Stack Software Development (React, Next.js, Python, FastAPI, PostgreSQL), and AI Agent & RAG Development.</dd></div>
              <div><dt>What does forward deployed engineering mean here?</dt><dd>Embedding with a team, learning the real workflow, prototyping against actual constraints, integrating the system, deploying it, and remaining accountable for the outcome.</dd></div>
              <div><dt>What kinds of AI systems and automations?</dt><dd>Enterprise AI automations, multi-agent systems, RAG, document intelligence, LLM applications, vector search, model integration, evaluation, and backend cloud infrastructure.</dd></div>
              <div><dt>Where can the work be verified?</dt><dd>Original source is available on <a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer">GitHub</a>, commercial services at <a href="/services">services</a>, and technical writing at <a href="/blogs">blogs</a>.</dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-heading chapter-reveal">
            <p>Bring the difficult part.</p>
            <h2>Tell me what needs to work.</h2>
            <p>Architecture review, full-stack software development, AI automations, agent integration, or a system that has outgrown its first version.</p>
            <button type="button" onClick={openBooking} className="contact-cal-trigger">
              <span className="hero-cta-pulse">
                <span className="pulse-ring" />
                <span className="pulse-core" />
              </span>
              <span>Prefer an instant call? Open calendar</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
          <form ref={form} onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label><span>Your name</span><input required name="name" autoComplete="name" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} placeholder="Name" /></label>
              <label><span>Email address</span><input required type="email" name="email" autoComplete="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} placeholder="you@company.com" /></label>
            </div>
            <label><span>What are you building or fixing?</span><textarea required name="message" rows={6} value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} placeholder="A concise brief is enough to begin." /></label>
            <div className="form-action">
              <p>{submitState === 'sent' ? <><Check size={16} /> Message sent. I’ll reply shortly.</> : submitState === 'error' ? 'The form could not send. Email me directly at hassannazir955@gmail.com.' : 'Your message goes directly to my inbox.'}</p>
              <button type="submit" disabled={submitState === 'sending'}>{submitState === 'sending' ? 'Sending…' : 'Send enquiry'} <Send size={16} /></button>
            </div>

            {/* Secondary Option: Direct Calendar Booking */}
            <div className="contact-secondary-option">
              <div className="contact-or-divider"><span>OR SCHEDULE DIRECTLY</span></div>
              <button
                type="button"
                onClick={openBooking}
                className="contact-booking-btn"
                aria-label="Book a 30-minute technical session"
              >
                <div className="contact-booking-left">
                  <div className="hero-cta-pulse">
                    <span className="pulse-ring" />
                    <span className="pulse-core" />
                  </div>
                  <div>
                    <strong>Book an Instant Working Session</strong>
                    <span>Direct calendar invite · 30 min technical review (EST / Global)</span>
                  </div>
                </div>
                <div className="contact-booking-right">
                  <span className="contact-booking-tag">OPEN CALENDAR</span>
                  <ArrowUpRight size={16} />
                </div>
              </button>
            </div>
          </form>
        </section>

        <footer className="site-footer">
          <div><strong>Hassan Nazir</strong><span>Forward Deployed Engineer · Applied AI</span></div>
          <nav aria-label="Footer navigation"><a href="/services">Services</a><a href="/blogs">Blogs</a><a href="#contact">Contact</a><a href="#top">Back to top</a></nav>
          <div className="footer-socials"><a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://linkedin.com/in/hassannazirrr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:hassannazir955@gmail.com" aria-label="Email"><Mail size={18} /></a></div>
          <p>© {new Date().getFullYear()} · Dubai, UAE / Islamabad, PK</p>
        </footer>
      </main>
      {bookingFloating && (
        <button
          type="button"
          onClick={openBooking}
          className="global-booking-float"
          aria-label="Book a working session"
        >
          <span className="hero-cta-pulse">
            <span className="pulse-ring" />
            <span className="pulse-core" />
          </span>
          <span>Book a Session</span>
          <ArrowUpRight size={14} />
        </button>
      )}
      {bookingReady && <Suspense fallback={null}><BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} /></Suspense>}
    </>
  );
}
