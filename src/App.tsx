import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import BookingModal from './components/ui/BookingModal';
import SEOHead from './components/ui/SEOHead';
import { EMAILJS_CONFIG } from './config/emailjs';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    title: 'The Home Club',
    descriptor: 'Membership and community platform',
    summary: 'A public-facing sports platform that turns memberships, programs, and community activity into one clear journey.',
    contribution: 'Product engineering · Frontend systems · Delivery',
    image: '/images/projects/the-home-club.jpg',
    href: 'https://thehomeclubsports.com',
  },
  {
    title: 'N8NHUB',
    descriptor: 'Automation workflow library',
    summary: 'More than 2,000 searchable n8n workflows organized for builders who need a working automation pattern, not another tutorial.',
    contribution: 'Information architecture · Automation · Full stack',
    image: '/images/projects/n8nhub.jpg',
    href: 'https://n8nhub.hassannazir.dev',
  },
  {
    title: 'SpeedyInfluencer',
    descriptor: 'Creator operations SaaS',
    summary: 'Campaign management, creator collaboration, and performance data brought into a focused operating surface for brands.',
    contribution: 'SaaS engineering · Product systems · APIs',
    image: '/images/projects/speedyinfluencer.png',
    href: 'https://speedyinfluencer.com',
  },
  {
    title: 'SmartFurs',
    descriptor: 'Trust-led commerce experience',
    summary: 'A modern storefront for puppy discovery shaped around buyer confidence, clean navigation, and a low-friction enquiry path.',
    contribution: 'Commerce · React · Experience design',
    image: '/images/projects/smartfurs.jpg',
    href: 'https://smartfurs.vercel.app',
  },
];

const experiences = [
  { period: 'Apr 2026 — Present', role: 'AI Architect', company: 'Uno OS', mode: 'Full-time · Hybrid', detail: 'Defining model integration patterns, agent workflows, and platform-level AI service boundaries.' },
  { period: 'Dec 2023 — Present', role: 'Full Stack Engineer', company: 'Gridcore', mode: 'Part-time · Hybrid', detail: 'Architecture standards, cloud infrastructure, CI/CD, and production systems operating at 99.9% reliability.' },
  { period: 'Aug 2025 — Apr 2026', role: 'Senior AI Engineer', company: 'NDT Legacy Group', mode: 'Full-time · Hybrid', detail: 'Led an AI automation platform processing 10K+ daily transactions while reducing operational cost by 40%.' },
  { period: 'Oct 2025 — Jan 2026', role: 'Senior AI Engineer', company: 'Schmoozzer', mode: 'Contract · Remote', detail: 'Delivered document-processing pipelines, conversational APIs, and reliable asynchronous services.' },
  { period: 'Feb 2025 — Sep 2025', role: 'QA Automation Engineer', company: 'Brilliant Gaming', mode: 'Contract · Remote', detail: 'Led an eight-person QA team and built automation that cut test time by 50% across high-value payment flows.' },
  { period: 'Dec 2022 — Nov 2023', role: 'QA Executive', company: 'Touchstone Communications', mode: 'Full-time · Hybrid', detail: 'Handled quality assurance and compliance across operational workflows, reviews, and reporting.' },
  { period: '2019 — Present', role: 'Independent Consultant', company: 'Fiverr / Upwork', mode: 'Part-time · Remote', detail: 'Delivered 100+ automation, API, cloud, and model-integration solutions for distributed clients.' },
];

const capabilities = [
  {
    title: 'AI systems that survive production',
    body: 'RAG, agent orchestration, model gateways, evaluation, auditability, and the service boundaries around them.',
    tools: ['LangChain', 'OpenAI / Claude', 'Hugging Face', 'PyTorch', 'n8n'],
  },
  {
    title: 'Backend architecture under load',
    body: 'Event-driven services, versioned APIs, queues, data models, and observability designed as one operating system.',
    tools: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Delivery with security built in',
    body: 'Cloud infrastructure, CI/CD, containers, quality automation, identity, monitoring, and incident-ready controls.',
    tools: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Playwright'],
  },
];

const notes = [
  { slug: 'agentic-ai-autonomous-systems-langchain-autogpt', topic: 'Agentic AI', time: '20 min', title: 'Building autonomous multi-agent systems with LangChain and modern frameworks' },
  { slug: 'zero-trust-architecture-implementation', topic: 'Cybersecurity', time: '12 min', title: 'Implementing Zero Trust architecture in cloud environments' },
  { slug: 'computer-vision-sam-dino-foundation-models-2025', topic: 'Computer vision', time: '22 min', title: 'SAM, DINOv2, and the foundation-model shift in visual AI' },
];

const feedback = [
  { quote: 'The automation solution transformed our workflow efficiency beyond expectations.', author: 'Project Manager', company: 'NDT Legacy Group' },
  { quote: 'The security monitoring system became the backbone of our infrastructure protection.', author: 'CTO', company: 'Gridcore' },
  { quote: 'The testing framework changed our development process and materially improved product quality.', author: 'Lead Developer', company: 'Brilliant Gaming' },
];

const marquee = ['FORWARD DEPLOYED', 'APPLIED AI', 'OPERATIONAL DISCOVERY', 'PRODUCT ENGINEERING', 'SYSTEMS INTEGRATION', 'PRODUCTION OWNERSHIP'];

const githubProjects = [
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
    name: 'WonderKit',
    repo: 'wonderkit',
    signal: 'Agent-native infrastructure',
    description: 'A multi-tenant AI SaaS foundation with provider-swappable LLMs, durable agent runs, pgvector memory, metered billing, evaluation, and deployment paths.',
    proof: ['4-agent runtime', '8 GitHub stars', 'Next.js + pgvector'],
    language: 'TypeScript',
    href: 'https://github.com/zimkk/wonderkit',
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
      .to('.intro-gate-panel', { yPercent: -102, duration: 1.05, stagger: 0.08, ease: 'expo.inOut' })
      .set('.intro-gate', { display: 'none' })
      .from('.masthead-word', { yPercent: 110, duration: 1.1, stagger: 0.1 }, '-=.25')
      .from('.hero-media', { clipPath: 'inset(100% 0 0 0)', scale: 1.06, duration: 1.25 }, '-=.75')
      .from('.hero-foreground-word', { xPercent: -14, opacity: 0, duration: 1.05 }, '-=.9')
      .from('.hero-actions, .hero-intro, .hero-role-note', { opacity: 0, y: 18, duration: 0.65, stagger: 0.08 }, '-=.55')
      .to('.fde-forward', { scaleX: 1.025, transformOrigin: 'left center', duration: 1.2, ease: 'expo.inOut' }, '-=1');

    gsap.to('.site-progress i', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: page.current, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });

    gsap.to('.fde-title, .hero-foreground-word', {
      scale: 0.91,
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.fde-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onLeaveBack: () => gsap.set('.hero-foreground-word', { opacity: 1 }),
      },
    });

    gsap.to('.hero-media img', {
      yPercent: 12,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: { trigger: '.fde-hero', start: 'top top', end: 'bottom top', scrub: true },
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
          end: 'bottom 76%',
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

    const hero = page.current?.querySelector<HTMLElement>('.fde-hero');
    const portrait = page.current?.querySelector<HTMLElement>('.hero-media');
    const movePortrait = (event: PointerEvent) => {
      if (!hero || !portrait || window.innerWidth < 768) return;
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
      gsap.to(portrait, { x, y, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
    };
    hero?.addEventListener('pointermove', movePortrait);
    return () => hero?.removeEventListener('pointermove', movePortrait);
  }, { scope: page });

  useEffect(() => {
    const syncBookingPosition = () => setBookingFloating(window.scrollY > 0);
    syncBookingPosition();
    window.addEventListener('scroll', syncBookingPosition, { passive: true });
    return () => window.removeEventListener('scroll', syncBookingPosition);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.current) return;
    setSubmitState('sending');
    try {
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
        <div className="intro-gate" aria-hidden="true"><i className="intro-gate-panel" /><i className="intro-gate-panel" /><i className="intro-gate-panel" /><span>HN / FIELD SYSTEMS</span></div>
        <div className="site-progress" aria-hidden="true"><i /></div>
        <header className="site-nav">
          <a href="#top" className="nav-brand" aria-label="Hassan Nazir, home">HASSAN / NAZIR</a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="/services">Services</a>
            <a href="#work">Deployments</a>
            <a href="#experience">Experience</a>
            <a href="/blogs">Field notes</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <a className="nav-github" href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" aria-label="Hassan Nazir on GitHub"><Github size={17} /></a>
            <button type="button" className="nav-resume nav-book" onClick={() => setBookingOpen(true)}>Start a project <ArrowUpRight size={14} /></button>
          </div>
        </header>

        <section id="top" className="hero-section fde-hero">
          <div className="hero-coordinate hero-coordinate-top">33.6844° N / 73.0479° E</div>
          <div className="hero-coordinate hero-coordinate-side">FIELD LOG / 2026</div>
          <div className="hero-intro">
            <span className="availability-dot" />
            Forward Deployed Engineer / Applied AI
          </div>
          <h1 className="fde-title" aria-label="Forward Deployed Engineer">
            <span className="hero-line-wrap fde-line"><span className="masthead-word fde-forward">FORWARD</span></span>
            <span className="hero-line-wrap fde-line"><span className="masthead-word fde-deployed">DEPLOYED</span></span>
          </h1>
          <div className="hero-foreground-word" aria-hidden="true">ENGINEER</div>
          <div className="hero-actions">
            <a href="#work" className="hero-index-link">Enter the field notes <ArrowDown size={17} /></a>
            <button type="button" onClick={() => setBookingOpen(true)} className={`hero-call-orbit hero-booking-origin${bookingFloating ? ' is-origin-hidden' : ''}`}><CalendarDays size={18} /><span>Book a working session</span></button>
          </div>
          <figure className="hero-media">
            <img src="/images/profile.png" alt="Hassan Nazir, Forward Deployed Engineer working in applied AI" />
            <div className="hero-media-wash" />
            <figcaption>
              <strong>Hassan Nazir</strong>
              <span>Forward Deployed Engineer · Applied AI</span>
              <span>Islamabad, Pakistan</span>
            </figcaption>
          </figure>
          <div className="hero-role-note"><strong>APPLIED / EMBEDDED / ACCOUNTABLE</strong><p>I embed with teams, turn ambiguous operational problems into working AI systems, and stay close enough to production to own the outcome.</p></div>
          <p className="hero-side-note">From the first messy workflow to production software used under real constraints.</p>
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
          <p className="statement-context">The work starts where the specification stops being useful.</p>
          <h2>
            {revealWords('I embed with teams')}
            <span className="inline-image inline-image-code" aria-hidden="true" />
            {revealWords('learn the operation, and ship applied AI that')}
            <span className="inline-image inline-image-cloud" aria-hidden="true" />
            {revealWords('survives contact with reality.')}
          </h2>
          <div className="statement-foot">
            <p>Forward deployed means fewer handoffs: discovery, prototyping, systems integration, product engineering, rollout, and feedback stay connected.</p>
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
              <a href="/work">Open the case-study archive <ArrowUpRight size={17} /></a>
            </div>
            <div className="case-stack">
              {projects.map((project) => (
                <article className="case-sheet" key={project.title}>
                  <div className="case-browser">
                    <div className="browser-bar"><i /><i /><i /><span>{new URL(project.href).hostname}</span></div>
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="case-image-link group" aria-label={'Open ' + project.title}>
                      <img src={project.image} alt={project.title + ' website interface'} />
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
            <div><p>Academic grounding</p><h3>Computer Science</h3><span>Air University, Islamabad · 2020—2025</span></div>
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
              <div><dt>Who is Hassan Nazir?</dt><dd>Hassan Nazir is a Forward Deployed Engineer based in Islamabad, Pakistan. He builds applied AI systems, operational automation, and full-stack products from discovery through production.</dd></div>
              <div><dt>What does forward deployed mean here?</dt><dd>Embedding with a team, learning the real workflow, prototyping against actual constraints, integrating the system, deploying it, and remaining accountable for the outcome.</dd></div>
              <div><dt>What kinds of AI systems?</dt><dd>Agents, RAG, document intelligence, LLM applications, vector search, model integration, evaluation, workflow automation, and the backend infrastructure needed to operate them.</dd></div>
              <div><dt>Where can the work be verified?</dt><dd>Original source is available on <a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer">GitHub</a>, product work is documented in <a href="/work">case studies</a>, and technical reasoning is published in the <a href="/blogs">field notes</a>.</dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-heading chapter-reveal">
            <p>Bring the difficult part.</p>
            <h2>Tell me what needs to work.</h2>
            <p>Architecture review, product engineering, AI integration, automation, or a system that has outgrown its first version.</p>
            <button type="button" onClick={() => setBookingOpen(true)}>Prefer a call? Open my calendar <ArrowUpRight size={16} /></button>
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
          </form>
        </section>

        <footer className="site-footer">
          <div><strong>Hassan Nazir</strong><span>Forward Deployed Engineer · Applied AI</span></div>
          <nav aria-label="Footer navigation"><a href="/services">Services</a><a href="/work">Work</a><a href="/blogs">Writing</a><a href="#contact">Contact</a><a href="#top">Back to top</a></nav>
          <div className="footer-socials"><a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://linkedin.com/in/hassannazirrr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:hassannazir955@gmail.com" aria-label="Email"><Mail size={18} /></a></div>
          <p>© {new Date().getFullYear()} · Islamabad, Pakistan</p>
        </footer>
      </main>
      {bookingFloating && (
        <button type="button" onClick={() => setBookingOpen(true)} className="hero-call-orbit global-booking-float" aria-label="Book a working session">
          <CalendarDays size={18} />
          <span>Book a working session</span>
        </button>
      )}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
