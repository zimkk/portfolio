import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { EMAILJS_CONFIG } from '../../config/emailjs';
import { Reveal, useBookingCtx } from './chrome';
import { useInView } from './hooks';
import Ico from './graphics/Ico';
import { RepoGlyph } from './graphics/glyphs';
import StackExplode from './graphics/StackExplode';
import CareerTimeline from './graphics/CareerTimeline';
import CareerGraph from './graphics/CareerGraph';
import Clocks from './graphics/Clocks';
import { DISCIPLINE_LABEL, Post, Project, products, projectPath, repos, useRelatedPosts } from '../../data/work';
import answers from '../../data/answers.json';

const formatDate = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/** The quiet second action in a section: "See the work ›". */
export function MoreLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="hn-link">{children}<ChevronRight size={16} /></Link>;
}

/* ---------- Who shows up ---------- */
export function WhoSection({ teaser = false }: { teaser?: boolean }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-who-title">
      <div className="hn-who">
        <Reveal>
          <figure className="hn-portrait">
            <img src="/images/profile-hero.webp" width="768" height="768" loading="lazy" decoding="async" alt="Portrait of Hassan Nazir" />
          </figure>
        </Reveal>
        <Reveal className="hn-who-copy">
          <h2 id="hn-who-title" className="hn-title">The person you talk to builds it.</h2>
          <p className="hn-lede">I'm Hassan. I started in QA, moved into full-stack, then architecture, then AI. Which is why I test the unhappy path first, and why I don't trust a demo until it has met real data.</p>
          <dl className="hn-facts">
            <div><dt className="hn-mono">Based</dt><dd>Islamabad and Dubai</dd></div>
            <div><dt className="hn-mono">Works with</dt><dd>US, UK and EU teams, remotely</dd></div>
            <div><dt className="hn-mono">Speaks</dt><dd>English, Urdu, TypeScript, Python</dd></div>
            <div><dt className="hn-mono">Security</dt><dd>CEH-P · PEH · ISO/IEC 27001</dd></div>
            {!teaser && <div><dt className="hn-mono">Studied</dt><dd>BS Computer Science, Air University</dd></div>}
            {!teaser && <div><dt className="hn-mono">Now</dt><dd>AI Environment Engineer at Outsentia, ML Researcher at Anthology, AI Architect at Uno OS</dd></div>}
          </dl>
          {teaser && <div className="hn-section-cta"><MoreLink to="/about">More about me</MoreLink></div>}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Range, method, career ---------- */
export function RangeSection() {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-range-title">
      <Reveal className="hn-head">
        <h2 id="hn-range-title" className="hn-title">The whole stack, from interface to infrastructure.</h2>
        <p className="hn-lede">Hover a layer. Security isn't one of them. It runs through all of them.</p>
      </Reveal>
      <StackExplode />
    </section>
  );
}

const STEPS = [
  { title: 'Understand the work', body: 'Watch the workflow, read the logs, and talk to the people who run it today.' },
  { title: 'Prove the risky part', body: 'Build the smallest thing that tests the riskiest assumption, on real data.' },
  { title: 'Integrate it', body: 'Into your auth, your data and your deployment pipeline, not alongside them.' },
  { title: 'Run and hand over', body: 'Monitor it, improve it, document it, and hand it over to the team properly.' },
];

export function MethodSection() {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-method-title">
      <Reveal className="hn-head">
        <h2 id="hn-method-title" className="hn-title">How an engagement runs.</h2>
      </Reveal>
      <ol className="hn-steps">
        {STEPS.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="hn-section-cta">
        <MoreLink to="/services/forward-deployed-engineer">What forward deployed engineering means here</MoreLink>
      </div>
    </section>
  );
}

export function CareerSection() {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-career-title">
      <Reveal className="hn-head">
        <h2 id="hn-career-title" className="hn-title">Six years, every role on one timeline.</h2>
      </Reveal>
      <CareerTimeline />
    </section>
  );
}

/** Career as a git log: branches for each discipline, merging into the current role. */
export function CareerLogSection() {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-career-log-title">
      <Reveal className="hn-head">
        <h2 id="hn-career-log-title" className="hn-title">Six years across QA, full‑stack and AI.</h2>
      </Reveal>
      <CareerGraph />
      <div className="hn-section-cta">
        <MoreLink to="/about">The full timeline</MoreLink>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
export function WorkSection({ cta = true }: { cta?: boolean }) {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-work-title">
      <Reveal className="hn-head">
        <h2 id="hn-work-title" className="hn-title">Live, in production.</h2>
      </Reveal>
      <div className="hn-work">
        {products.map((project) => (
          <Link key={project.slug} to={projectPath(project.slug)} className="hn-work-item">
            {project.image && <div className="hn-shot"><img src={project.image} width="720" height="450" loading="lazy" decoding="async" alt={`${project.name} interface`} /></div>}
            <div className="hn-work-cap">
              <h3>{project.name}</h3>
              {project.live && <span className="hn-mono">{host(project.live)}</span>}
            </div>
            <p>{project.summary}</p>
          </Link>
        ))}
      </div>
      {cta && (
        <div className="hn-section-cta">
          <MoreLink to="/work">All work</MoreLink>
        </div>
      )}
    </section>
  );
}

export function RepoCard({ project }: { project: Project }) {
  return (
    <Link to={projectPath(project.slug)} className="hn-repo">
      {project.glyph ? <RepoGlyph repo={project.glyph} /> : <span className="hn-repo-glyph hn-repo-placeholder"><Ico size={52} /></span>}
      <span className="hn-repo-top hn-mono">{DISCIPLINE_LABEL[project.discipline]}</span>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
    </Link>
  );
}

export function BuildLogSection({ limit, cta = true }: { limit?: number; cta?: boolean }) {
  const featured = repos.filter((project) => project.glyph);
  const shown = limit ? featured.slice(0, limit) : featured;
  const smaller = repos.filter((project) => !project.glyph);
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-build-title">
      <Reveal className="hn-head is-split">
        <h2 id="hn-build-title" className="hn-title">Public source. Read the code.</h2>
        <a href="https://github.com/zimkk" target="_blank" rel="noopener noreferrer" className="hn-link">github.com/zimkk<ChevronRight size={16} /></a>
      </Reveal>
      <div className="hn-repos">
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
        <div className="hn-section-cta">
          <MoreLink to="/work">Every project</MoreLink>
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
        </Link>
      ))}
    </div>
  );
}

export function WritingSection() {
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
        setNotes(items.slice(0, 4));
        setTotal(items.length);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [near]);
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-writing-title">
      <Reveal className="hn-head">
        <h2 id="hn-writing-title" className="hn-title">Field notes from production work.</h2>
      </Reveal>
      <div ref={ref}>
        <NoteList notes={notes} />
        <div className="hn-section-cta">
          <MoreLink to="/blogs">{total ? `Read all ${total} field notes` : 'Read every field note'}</MoreLink>
        </div>
      </div>
    </section>
  );
}

/** Related field notes for a page, matched on keywords. Renders nothing until there is a match. */
export function RelatedPosts({ keywords, title = 'Related field notes' }: { keywords: string[]; title?: string }) {
  const posts = useRelatedPosts(keywords, 3);
  if (!posts.length) return null;
  return (
    <section className="hn-section hn-frame">
      <div className="hn-head"><h2 className="hn-title-sm">{title}</h2></div>
      <NoteList notes={posts} />
    </section>
  );
}

/* ---------- Contact ---------- */
export function ContactSection({ headingLevel = 'h2', first = false }: { headingLevel?: 'h1' | 'h2'; first?: boolean }) {
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
    <section className={first ? 'hn-frame' : 'hn-section hn-frame'} aria-labelledby="hn-contact-title">
      <div className={`hn-contact${first ? ' is-page' : ''}`}>
          <Reveal>
            <Heading id="hn-contact-title" className="hn-title">Tell me what needs to work.</Heading>
            <p className="hn-lede">A few lines is enough. What it is, what it should do, and what it does instead.</p>
            <Clocks />
            <div className="hn-direct">
              <button type="button" className="hn-btn hn-btn-primary" onClick={openBooking} onPointerEnter={prefetch} onFocus={prefetch}>Book 30 minutes</button>
              <a href="mailto:hassannazir955@gmail.com" className="hn-link">Email</a>
              <a href="https://linkedin.com/in/hassannazirrr" target="_blank" rel="noopener noreferrer" className="hn-link">LinkedIn</a>
            </div>
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
                  {submitState === 'sending' ? 'Sending' : 'Send it'} <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </Reveal>
      </div>
    </section>
  );
}

/** Plain, citable answers to the questions people (and answer engines) ask most. */
export const QUICK_ANSWERS = answers.items;

export function QuickAnswersSection() {
  return (
    <section className="hn-section hn-frame" aria-labelledby="hn-answers-title">
      <Reveal className="hn-head">
        <h2 id="hn-answers-title" className="hn-title">The short version.</h2>
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

/** Page header used by /about and /work: a headline, one line, the action. */
export function PageHero({ title, lede, children }: { title: string; lede: string; children?: React.ReactNode }) {
  return (
    <section className="hn-page-hero hn-frame">
      <h1 className="hn-title">{title}</h1>
      <p className="hn-lede">{lede}</p>
      {children && <div className="hn-hero-actions">{children}</div>}
    </section>
  );
}

/** How every inner page ends: one headline, one line, one action. */
export function CtaBand({ heading, line }: { heading: string; line: string }) {
  const { openBooking, prefetch } = useBookingCtx();
  return (
    <section className="hn-cta">
      <div className="hn-frame">
        <h2>{heading}</h2>
        <p>{line}</p>
        <div className="hn-cta-actions">
          <button type="button" className="hn-btn hn-btn-primary" onClick={openBooking} onPointerEnter={prefetch} onFocus={prefetch}>Book 30 minutes</button>
          <MoreLink to="/contact">Send a short brief</MoreLink>
        </div>
      </div>
    </section>
  );
}
