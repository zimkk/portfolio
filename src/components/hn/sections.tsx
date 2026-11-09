import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Github, Linkedin, Mail, Send } from 'lucide-react';
import { EMAILJS_CONFIG } from '../../config/emailjs';
import { Reveal, SectionHead, useBookingCtx } from './chrome';
import { useInView } from './hooks';
import Ico from './graphics/Ico';
import { RepoGlyph } from './graphics/glyphs';
import StackExplode from './graphics/StackExplode';
import MethodPath from './graphics/MethodPath';
import CareerTimeline from './graphics/CareerTimeline';
import CareerGraph from './graphics/CareerGraph';
import ProfileCard from './graphics/ProfileCard';
import Clocks from './graphics/Clocks';
import { DISCIPLINE_LABEL, Post, Project, products, projectPath, repos, useRelatedPosts } from '../../data/work';
import answers from '../../data/answers.json';

const formatDate = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/* ---------- Who shows up ---------- */
export function WhoSection({ index = '02', teaser = false }: { index?: string; teaser?: boolean }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-who-title">
      <SectionHead index={index} label="Who shows up" />
      <div className="hn-who">
        <ProfileCard />
        <Reveal className="hn-who-copy">
          <h2 id="hn-who-title" className="hn-title">The person you talk to is the person who <span className="hn-mark">builds it.</span></h2>
          <p className="hn-lede">I'm Hassan. I started in QA, moved into full-stack, then architecture, then AI. Which is why I test the unhappy path first, and why I don't trust a demo until it has met real data.</p>
          <dl className="hn-facts">
            <div><dt className="hn-mono">Based</dt><dd>Islamabad and Dubai</dd></div>
            <div><dt className="hn-mono">Works with</dt><dd>US, UK and EU teams, remotely</dd></div>
            <div><dt className="hn-mono">Speaks</dt><dd>English, Urdu, TypeScript, Python</dd></div>
            <div><dt className="hn-mono">Security</dt><dd>CEH-P · PEH · ISO/IEC 27001</dd></div>
            {!teaser && <div><dt className="hn-mono">Studied</dt><dd>BS Computer Science, Air University</dd></div>}
            {!teaser && <div><dt className="hn-mono">Now</dt><dd>AI Environment Engineer at Outsentia, ML Researcher at Anthology, AI Architect at Uno OS</dd></div>}
          </dl>
          {teaser && (
            <div className="hn-section-cta">
              <Link to="/about" className="hn-btn hn-btn-ghost">More about me <ArrowRight size={16} /></Link>
              <Link to="/services" className="hn-link">How I work with teams <ArrowRight size={14} /></Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Range, method, career ---------- */
export function RangeSection({ index = '03' }: { index?: string }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-range-title">
      <SectionHead index={index} label="Range" />
      <Reveal>
        <h2 id="hn-range-title" className="hn-title">The whole stack, from interface <span className="hn-mark">to infrastructure.</span></h2>
        <p className="hn-lede" style={{ marginTop: 22, marginBottom: 20 }}>Hover a layer. Security isn't one of them. It runs through all of them.</p>
      </Reveal>
      <StackExplode />
    </section>
  );
}

export function MethodSection({ index = '04' }: { index?: string }) {
  return (
    <section className="hn-band hn-alt" aria-labelledby="hn-method-title">
      <div className="hn-frame">
        <SectionHead index={index} label="Method" />
        <Reveal>
          <h2 id="hn-method-title" className="hn-title" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>How an engagement <span className="hn-mark">runs.</span></h2>
        </Reveal>
        <MethodPath />
        <div className="hn-section-cta" style={{ marginTop: 40 }}>
          <Link to="/services/forward-deployed-engineer" className="hn-link">What forward deployed engineering means here <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}

export function CareerSection({ index = '05' }: { index?: string }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-career-title">
      <SectionHead index={index} label="Career" />
      <Reveal>
        <h2 id="hn-career-title" className="hn-title" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>Six years, every role <span className="hn-mark">on one timeline.</span></h2>
      </Reveal>
      <CareerTimeline />
    </section>
  );
}

/** Career as a git log: branches for each discipline, merging into the current role. */
export function CareerLogSection({ index = '05' }: { index?: string }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-career-log-title">
      <SectionHead index={index} label="Career" />
      <Reveal>
        <h2 id="hn-career-log-title" className="hn-title" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>Six years across QA, <span className="hn-mark">full‑stack and AI.</span></h2>
      </Reveal>
      <CareerGraph />
      <div className="hn-section-cta" style={{ marginTop: 36 }}>
        <Link to="/about" className="hn-btn hn-btn-ghost">The full timeline <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function WorkShowcase() {
  const [active, setActive] = useState(0);
  const current = products[active];
  return (
    <div className="hn-work">
      <div className="hn-work-list">
        {products.map((project, index) => (
          <Link
            key={project.slug}
            to={projectPath(project.slug)}
            className={`hn-work-row${index === active ? ' is-active' : ''}`}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span className="hn-mono">0{index + 1}</span>
            <div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
            </div>
            <ArrowRight size={24} />
            {project.image && <div className="hn-work-shot"><img src={project.image} width="720" height="450" loading="lazy" decoding="async" alt={`${project.name} interface`} /></div>}
          </Link>
        ))}
      </div>
      <div className="hn-work-preview" aria-hidden="true">
        <div className="hn-browser">
          <div className="hn-browser-bar"><i /><i /><i /><span>{current.live ? host(current.live) : current.name}</span></div>
          <div className="hn-browser-view">
            {products.map((project, index) => project.image && (
              <img key={project.slug} src={project.image} width="720" height="450" loading="lazy" decoding="async" alt="" className={index === active ? 'is-active' : undefined} />
            ))}
          </div>
        </div>
        <div className="hn-work-meta hn-mono"><span>{current.stack.slice(0, 2).join(' · ')}</span><span><Ico size={13} /> Live</span></div>
      </div>
    </div>
  );
}

export function WorkSection({ index = '03', cta = true }: { index?: string; cta?: boolean }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-work-title">
      <SectionHead index={index} label="Work" aside={<span>{products.length} live products</span>} />
      <Reveal>
        <h2 id="hn-work-title" className="hn-title" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>Live, in <span className="hn-mark">production.</span></h2>
      </Reveal>
      <WorkShowcase />
      {cta && (
        <div className="hn-section-cta" style={{ marginTop: 36 }}>
          <Link to="/work" className="hn-btn hn-btn-ghost">All work <ArrowRight size={16} /></Link>
          <Link to="/services/full-stack-software-development" className="hn-link">Full-stack software development <ArrowRight size={14} /></Link>
        </div>
      )}
    </section>
  );
}

export function RepoCard({ project }: { project: Project }) {
  return (
    <Link to={projectPath(project.slug)} className="hn-repo">
      <span className="hn-repo-top hn-mono">{DISCIPLINE_LABEL[project.discipline]}</span>
      {project.glyph ? <RepoGlyph repo={project.glyph} /> : <span className="hn-repo-glyph hn-repo-placeholder"><Ico size={46} /></span>}
      <div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="hn-repo-foot">
        {project.highlights.slice(0, 2).map((item) => <span key={item} className="hn-chip">{item}</span>)}
      </div>
    </Link>
  );
}

export function BuildLogSection({ index = '04', limit, cta = true }: { index?: string; limit?: number; cta?: boolean }) {
  const featured = repos.filter((project) => project.glyph);
  const shown = limit ? featured.slice(0, limit) : featured;
  const smaller = repos.filter((project) => !project.glyph);
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-build-title">
      <SectionHead index={index} label="Build log" />
      <div className="hn-build-head">
        <Reveal>
          <h2 id="hn-build-title" className="hn-title">Public source. <span className="hn-mark">Read the code.</span></h2>
        </Reveal>
        <a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" className="hn-btn hn-btn-ghost"><Github size={17} /> github.com/zimkk</a>
      </div>
      <div className={`hn-repos${limit ? ' is-short' : ''}`}>
        {shown.map((project) => <RepoCard key={project.slug} project={project} />)}
      </div>
      {!limit && (
        <div className="hn-archive">
          {smaller.map((project) => (
            <Link key={project.slug} to={projectPath(project.slug)}>
              <span>{project.name}</span><small>{project.summary}</small>
            </Link>
          ))}
        </div>
      )}
      {cta && limit && (
        <div className="hn-section-cta" style={{ marginTop: 36 }}>
          <Link to="/work" className="hn-btn hn-btn-ghost">Every project <ArrowRight size={16} /></Link>
        </div>
      )}
    </section>
  );
}

/* ---------- Writing ---------- */
type Note = Post;
const fallbackNotes: Note[] = [
  { title: 'PHP2Shell: The Ghost in the Worker (CVE-2026-109618 & CVE-2026-109619)', date: '2026-10-23', slug: 'php2shell-cve-2026-109618-cve-2026-109619-rce-analysis', tags: ['Security'] },
  { title: "Claude Opus 5.5: The Complete Guide to Anthropic's New Agentic AI Model", date: '2026-09-23', slug: 'opus-5-5', tags: ['Applied AI'] },
  { title: 'The Anatomy of a Forward Deployed Engineer', date: '2026-09-18', slug: 'the-anatomy-of-a-forward-deployed-engineer', tags: ['Forward Deployed Engineering'] },
];

function NoteList({ notes }: { notes: Note[] }) {
  return (
    <div className="hn-notes">
      {notes.map((note) => (
        <Link key={note.slug} to={`/blogs/${note.slug}`} className="hn-note">
          <time className="hn-mono" dateTime={note.date}>{formatDate(note.date)}</time>
          <h3>{note.title}</h3>
          <span className="hn-mono">{note.tags?.[0] ?? 'Field note'}</span>
          <ArrowRight size={22} />
        </Link>
      ))}
    </div>
  );
}

export function WritingSection({ index = '05' }: { index?: string }) {
  const [ref, near] = useInView<HTMLDivElement>({ once: true, rootMargin: '600px 0px' });
  const [notes, setNotes] = useState<Note[]>(fallbackNotes);
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    fetch('/search.json')
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((items: Note[]) => {
        if (cancelled || !Array.isArray(items) || !items.length) return;
        setNotes(items.slice(0, 3));
        setTotal(items.length);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [near]);
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-writing-title">
      <SectionHead index={index} label="Writing" />
      <Reveal>
        <h2 id="hn-writing-title" className="hn-title" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>Field notes from <span className="hn-mark">production work.</span></h2>
      </Reveal>
      <div ref={ref}>
        <NoteList notes={notes} />
        <div className="hn-writing-foot">
          <p className="hn-lede">{total ? `${total} field notes` : 'Field notes'} on agents, RAG, automation, security and what it takes to run AI in production.</p>
          <Link to="/blogs" className="hn-link">Read them all <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

/** Related field notes for a page, matched on keywords. Renders nothing until there is a match. */
export function RelatedPosts({ keywords, index, title = 'Related field notes' }: { keywords: string[]; index: string; title?: string }) {
  const posts = useRelatedPosts(keywords, 3);
  if (!posts.length) return null;
  return (
    <section className="hn-section hn-frame" aria-label={title}>
      <SectionHead index={index} label={title} />
      <NoteList notes={posts} />
    </section>
  );
}

/* ---------- Contact ---------- */
export function ContactSection({ index = '06', headingLevel = 'h2', first = false }: { index?: string; headingLevel?: 'h1' | 'h2'; first?: boolean }) {
  const { openBooking, prefetch } = useBookingCtx();
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const Heading = headingLevel;

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
    <section className="hn-band hn-alt" aria-labelledby="hn-contact-title" style={first ? { marginTop: 0, marginBottom: 0, paddingTop: 'clamp(120px, 16vh, 170px)' } : { marginBottom: 0 }}>
      <div className="hn-frame">
        <SectionHead index={index} label="Contact" />
        <div className="hn-contact">
          <Reveal>
            <Heading id="hn-contact-title" className="hn-title">Tell me what <span className="hn-mark">needs to work.</span></Heading>
            <p className="hn-lede">A few lines is enough. What it is, what it should do, and what it does instead.</p>
            <Clocks />
            <div className="hn-direct">
              <button type="button" className="hn-btn hn-btn-primary" onClick={openBooking} onPointerEnter={prefetch} onFocus={prefetch}><Ico /> Book 30 minutes</button>
              <a href="mailto:hassannazir955@gmail.com" className="hn-btn hn-btn-ghost"><Mail size={16} /> Email</a>
              <a href="https://linkedin.com/in/hassannazirrr" target="_blank" rel="noopener noreferrer" className="hn-btn hn-btn-ghost"><Linkedin size={16} /> LinkedIn</a>
            </div>
            <p className="hn-contact-more">Not sure what to ask for? <Link to="/services" className="hn-link">See the five ways I work with teams</Link></p>
          </Reveal>
          <Reveal delay={120}>
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="hn-form hn-light"
              toolname="send_engineering_enquiry"
              tooldescription="Submit an engineering enquiry, software proposal, or consulting request to Forward Deployed Engineer Hassan Nazir."
            >
              <div className="hn-form-row">
                <label>
                  <span className="hn-mono">Name</span>
                  <input required name="name" autoComplete="name" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} placeholder="Your name" toolparamdescription="Full name or company name of the sender" />
                </label>
                <label>
                  <span className="hn-mono">Email</span>
                  <input required type="email" name="email" autoComplete="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} placeholder="you@company.com" toolparamdescription="Contact email address of the sender" />
                </label>
              </div>
              <label>
                <span className="hn-mono">What are you building?</span>
                <textarea required name="message" rows={6} value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} placeholder="Two or three sentences is plenty." toolparamdescription="Project description, architecture requirements, or engagement timeline" />
              </label>
              <div className="hn-form-foot">
                <p>
                  {submitState === 'sent' ? <><Check size={16} /> Sent. I'll reply soon.</> : submitState === 'error' ? 'That did not send. Email hassannazir955@gmail.com instead.' : 'Goes straight to my inbox.'}
                </p>
                <button type="submit" className="hn-btn hn-btn-primary" disabled={submitState === 'sending'}>
                  {submitState === 'sending' ? 'Sending' : 'Send it'} <Send size={16} />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Plain, citable answers to the questions people (and answer engines) ask most. */
export const QUICK_ANSWERS = answers.items;

export function QuickAnswersSection({ index }: { index: string }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-answers-title">
      <SectionHead index={index} label="Quick answers" />
      <Reveal>
        <h2 id="hn-answers-title" className="hn-title-sm" style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>The short version.</h2>
      </Reveal>
      <dl className="hn-answers">
        {QUICK_ANSWERS.map((item) => (
          <div key={item.q}>
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Compact page header used by /about, /work and /contact. */
export function PageHero({ eyebrow, title, mark, lede, children }: { eyebrow: string; title: string; mark?: string; lede: string; children?: React.ReactNode }) {
  return (
    <section className="hn-page-hero hn-alt">
      <div className="hn-frame">
        <p className="hn-hero-eyebrow hn-mono"><span><Ico size={16} /> {eyebrow}</span></p>
        <h1 className="hn-title">{title} {mark && <span className="hn-mark">{mark}</span>}</h1>
        <p className="hn-lede">{lede}</p>
        {children && <div className="hn-hero-actions">{children}</div>}
      </div>
    </section>
  );
}


/** Closing band used at the end of inner pages. */
export function CtaBand({ heading, line }: { heading: string; line: string }) {
  const { openBooking, prefetch } = useBookingCtx();
  return (
    <section className="hn-band hn-alt hn-cta" style={{ marginBottom: 0 }}>
      <div className="hn-frame">
        <p className="hn-mono" style={{ color: 'var(--fg-3)', marginBottom: 18 }}>Start with the operation</p>
        <h2>{heading}</h2>
        <p>{line}</p>
        <div className="hn-cta-actions">
          <button type="button" className="hn-btn hn-btn-primary" onClick={openBooking} onPointerEnter={prefetch} onFocus={prefetch}><Ico /> Book 30 minutes</button>
          <Link to="/contact" className="hn-btn hn-btn-ghost">Send a short brief <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
