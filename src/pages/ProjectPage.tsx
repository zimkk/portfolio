import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { PageShell, Reveal, SectionHead } from '../components/hn/chrome';
import { CtaBand, RelatedPosts, RepoCard } from '../components/hn/sections';
import { RepoGlyph, ServiceGlyph } from '../components/hn/graphics/glyphs';
import Ico from '../components/hn/graphics/Ico';
import { breadcrumbSchema, schemaIds, siteConfig } from '../config/metadata';
import { DISCIPLINE_LABEL, projectBySlug, projectPath, projects, relatedProjects, SERVICE_NAMES } from '../data/work';
import NotFoundPage from './NotFoundPage';

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFoundPage />;

  const index = projects.findIndex((item) => item.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = relatedProjects(project, 3);
  const url = `${siteConfig.url}${projectPath(project.slug)}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': project.repo && !project.live ? 'SoftwareSourceCode' : 'CreativeWork',
    '@id': `${url}#work`,
    name: project.name,
    description: project.description,
    url,
    author: { '@id': schemaIds.personId },
    keywords: project.stack.join(', '),
    ...(project.repo ? { codeRepository: project.repo } : {}),
    ...(project.live ? { sameAs: project.live } : {}),
    ...(project.image ? { image: `${siteConfig.url}${project.image}` } : {}),
  };

  return (
    <>
      <SEOHead
        title={`${project.name}: ${DISCIPLINE_LABEL[project.discipline]} Project | Hassan Nazir`}
        description={`${project.summary} ${project.stack.slice(0, 4).join(', ')}.`}
        url={url}
        image={`/images/og/work-${project.slug}.jpg`}
        jsonLd={[schema, breadcrumbSchema([{ name: 'Home', url: siteConfig.url }, { name: 'Work', url: `${siteConfig.url}/work` }, { name: project.name, url }])]}
      />
      <PageShell>
        <section className="hn-page-hero hn-alt" aria-labelledby="hn-project-title">
          <div className="hn-frame hn-project-hero">
            <div>
              <Link to="/work" className="hn-crumb hn-mono"><ArrowLeft size={14} /> Work / {project.name}</Link>
              <p className="hn-hero-eyebrow hn-mono"><span><Ico size={16} /> {DISCIPLINE_LABEL[project.discipline]}</span><span>{project.kind === 'product' ? 'Live product' : 'Public source'}</span><span>{project.date}</span></p>
              <h1 id="hn-project-title" className="hn-title">{project.name}</h1>
              <p className="hn-lede">{project.summary}</p>
              <div className="hn-hero-actions">
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="hn-btn hn-btn-primary"><Ico /> Visit {host(project.live)} <ArrowUpRight size={16} /></a>}
                {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className={`hn-btn ${project.live ? 'hn-btn-ghost' : 'hn-btn-primary'}`}><Github size={16} /> Read the source <ArrowUpRight size={16} /></a>}
              </div>
            </div>
            <div className="hn-project-visual" aria-hidden="true">
              {project.image ? (
                <div className="hn-browser">
                  <div className="hn-browser-bar"><i /><i /><i /><span>{project.live ? host(project.live) : project.name}</span></div>
                  <div className="hn-browser-view"><img src={project.image} width="720" height="450" alt="" className="is-active" /></div>
                </div>
              ) : (
                <div className="hn-svc-art hn-project-glyph">{project.glyph ? <RepoGlyph repo={project.glyph} /> : <Ico size={120} />}</div>
              )}
            </div>
          </div>
        </section>

        <section className="hn-section hn-frame" aria-labelledby="hn-what-title">
          <SectionHead index="01" label="What it is" />
          <div className="hn-fit">
            <Reveal>
              <h2 id="hn-what-title" className="hn-sr">What it is</h2>
              <p className="hn-project-desc">{project.description}</p>
            </Reveal>
            <div>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>
                    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" className="g-accent" /><path d="M6.5 11.5l3 3 6-7" className="hn-line" style={{ stroke: '#fff' }} /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="hn-tech">{project.stack.map((item) => <span key={item} className="hn-chip">{item}</span>)}</div>
            </div>
          </div>
        </section>

        {project.services.length > 0 && (
          <section className="hn-section hn-frame" aria-labelledby="hn-fits-title">
            <SectionHead index="02" label="Where it fits" />
            <h2 id="hn-fits-title" className="hn-title-sm" style={{ marginBottom: 'clamp(24px, 4vw, 40px)' }}>The kind of engagement this came from.</h2>
            <div className="hn-related">
              {project.services.map((service) => (
                <Link key={service} to={`/services/${service}`}>
                  <ServiceGlyph slug={service} className="" />
                  <span>{SERVICE_NAMES[service]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="hn-section hn-frame" aria-labelledby="hn-related-title">
            <SectionHead index="03" label="Related work" />
            <h2 id="hn-related-title" className="hn-sr">Related work</h2>
            <div className="hn-repos is-short is-three">
              {related.map((item) => <RepoCard key={item.slug} project={item} />)}
            </div>
          </section>
        )}

        <RelatedPosts index="04" keywords={project.keywords} />

        <nav className="hn-frame hn-pager" aria-label="More projects">
          <Link to={projectPath(prev.slug)}><span className="hn-mono"><ArrowLeft size={13} /> Previous</span><b>{prev.name}</b></Link>
          <Link to={projectPath(next.slug)} className="is-next"><span className="hn-mono">Next <ArrowRight size={13} /></span><b>{next.name}</b></Link>
        </nav>

        <CtaBand heading="Need something like this, built inside your team?" line="Thirty minutes is usually enough to tell whether I am the right person for it." />
      </PageShell>
    </>
  );
}
