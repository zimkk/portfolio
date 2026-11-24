import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/ui/SEOHead';
import { PageShell, Reveal } from '../components/hn/chrome';
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
        <section className="hn-page-hero hn-frame hn-project-hero" aria-labelledby="hn-project-title">
          <div>
            <Link to="/work" className="hn-crumb hn-mono"><ArrowLeft size={14} /> Work</Link>
            <p className="hn-meta hn-mono"><span>{DISCIPLINE_LABEL[project.discipline]}</span><span>{project.kind === 'product' ? 'Live product' : 'Public source'}</span><span>{project.date}</span></p>
            <h1 id="hn-project-title" className="hn-title">{project.name}</h1>
            <p className="hn-lede">{project.summary}</p>
            <div className="hn-hero-actions">
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="hn-btn hn-btn-primary">Visit {host(project.live)} <ArrowUpRight size={16} /></a>}
              {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className={project.live ? 'hn-link' : 'hn-btn hn-btn-primary'}>Read the source <ArrowUpRight size={16} /></a>}
            </div>
          </div>
          <div aria-hidden="true">
            {project.image ? (
              <div className="hn-shot"><img src={project.image} width="720" height="450" alt="" /></div>
            ) : (
              <div className="hn-project-glyph">{project.glyph ? <RepoGlyph repo={project.glyph} /> : <Ico size={120} />}</div>
            )}
          </div>
        </section>

        <section className="hn-section hn-frame" aria-labelledby="hn-what-title">
          <div className="hn-fit">
            <Reveal>
              <h2 id="hn-what-title" className="hn-sr">What it is</h2>
              <p className="hn-project-desc">{project.description}</p>
            </Reveal>
            <div>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="hn-tech">{project.stack.map((item) => <span key={item} className="hn-chip">{item}</span>)}</div>
            </div>
          </div>
        </section>

        {project.services.length > 0 && (
          <section className="hn-section hn-frame" aria-labelledby="hn-fits-title">
            <div className="hn-head"><h2 id="hn-fits-title" className="hn-title-sm">The kind of engagement this came from.</h2></div>
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
            <div className="hn-head"><h2 id="hn-related-title" className="hn-title-sm">Related work</h2></div>
            <div className="hn-repos">
              {related.map((item) => <RepoCard key={item.slug} project={item} />)}
            </div>
          </section>
        )}

        <RelatedPosts keywords={project.keywords} />

        <nav className="hn-frame hn-pager" aria-label="More projects">
          <Link to={projectPath(prev.slug)}><span className="hn-mono"><ArrowLeft size={13} /> Previous</span><b>{prev.name}</b></Link>
          <Link to={projectPath(next.slug)} className="is-next"><span className="hn-mono">Next <ArrowRight size={13} /></span><b>{next.name}</b></Link>
        </nav>

        <CtaBand heading="Need something like this built?" line="Thirty minutes is usually enough to tell whether I am the right person for it." />
      </PageShell>
    </>
  );
}
