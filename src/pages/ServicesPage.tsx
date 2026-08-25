import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Github } from 'lucide-react';
import EditorialNav from '../components/ui/EditorialNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { breadcrumbSchema, schemaIds, siteConfig } from '../config/metadata';

const PROJECT_CONTACT_HREF = 'mailto:hassannazir955@gmail.com?subject=Project%20inquiry';

type ServicePage = {
  slug: string;
  name: string;
  searchTitle: string;
  description: string;
  hero: string;
  directAnswer: string;
  image: string;
  imageAlt: string;
  fit: string[];
  outcomes: Array<{ title: string; body: string }>;
  process: Array<{ title: string; body: string }>;
  proof: { title: string; body: string; href: string; label: string };
  technologies: string[];
  faq: Array<{ question: string; answer: string }>;
  keywords: string[];
};

const servicePages: ServicePage[] = [
  {
    slug: 'forward-deployed-engineer',
    name: 'Forward Deployed Engineering',
    searchTitle: 'Forward Deployed Engineer for Applied AI and Software Delivery | Hassan Nazir',
    description: 'Hire a Forward Deployed Engineer who embeds with your team, turns unclear operational requirements into working software, integrates it, and owns the path to production.',
    hero: 'Put an engineer where the ambiguity lives.',
    directAnswer: 'A Forward Deployed Engineer works inside the operating context, not from a detached specification. I join the team, learn the workflow, build against real constraints, integrate with existing systems, and remain accountable through deployment.',
    image: '/images/forward-deployed-services.webp',
    imageAlt: 'Engineer working with an operations team inside a production control environment',
    fit: [
      'The requirement is still changing because the operation is not fully understood.',
      'An AI prototype exists, but integration and production ownership are missing.',
      'Your product team needs senior implementation capacity without another handoff.',
      'The system touches multiple APIs, data sources, teams, or operational controls.',
    ],
    outcomes: [
      { title: 'Operational discovery', body: 'Map the real workflow, exceptions, decision points, users, data, and constraints before architecture hardens around assumptions.' },
      { title: 'Working proof', body: 'Build the smallest production-shaped slice that tests the risky integration, model behavior, or operating assumption.' },
      { title: 'Systems integration', body: 'Connect models, data stores, APIs, authentication, queues, interfaces, and existing services into one accountable delivery path.' },
      { title: 'Production ownership', body: 'Instrument, test, deploy, observe, and improve the system with the team that will operate it.' },
    ],
    process: [
      { title: 'Enter the workflow', body: 'Stakeholder sessions, system access, process observation, failure review, and a written map of what actually happens.' },
      { title: 'Prove the difficult part', body: 'A focused implementation tests the riskiest assumption with real data and clear acceptance conditions.' },
      { title: 'Build inside the environment', body: 'The solution is integrated with your codebase, infrastructure, controls, and delivery process.' },
      { title: 'Operate and transfer', body: 'Monitoring, documentation, handover, and iteration are part of delivery rather than deferred work.' },
    ],
    proof: {
      title: 'A monitor built around an operation, not a scrape.',
      body: 'The NY Municipal Monitor tracks decision-makers across 60 county sites, imports an existing baseline, detects personnel and contact changes, preserves history, sends webhooks, and gives operators a working dashboard.',
      href: 'https://github.com/zimkk/erdman-ny-county',
      label: 'Inspect the public source',
    },
    technologies: ['Python', 'TypeScript', 'FastAPI', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Playwright'],
    faq: [
      { question: 'When should a company hire a Forward Deployed Engineer?', answer: 'Use this model when the problem crosses business workflow, software, data, and deployment boundaries. It is especially useful when a normal requirements handoff would lose important operational context.' },
      { question: 'Is this staff augmentation?', answer: 'No. The engagement is organized around an outcome and a system boundary. I work closely with your team, but I own discovery, implementation decisions, integration, and a defined production result.' },
      { question: 'Can this work remotely with US and European teams?', answer: 'Yes. Delivery can combine scheduled overlap, focused working sessions, asynchronous engineering, written decisions, and documented handoffs. On-site work can be discussed when the engagement requires it.' },
      { question: 'How does an engagement begin?', answer: 'It starts with a working session around the operation, existing systems, constraints, and the result the team needs. The first output is a focused technical path, not a generic strategy deck.' },
    ],
    keywords: ['forward deployed engineer', 'hire forward deployed engineer', 'forward deployed engineering services', 'embedded AI engineer', 'AI implementation engineer'],
  },
  {
    slug: 'applied-ai-consulting',
    name: 'Applied AI Consulting',
    searchTitle: 'Applied AI Consulting for Production Systems | Hassan Nazir',
    description: 'Applied AI consulting for US and European teams that need working LLM applications, document intelligence, automation, evaluation, and production infrastructure.',
    hero: 'Move the AI work from promising to operational.',
    directAnswer: 'Applied AI consulting should end in a system that people can use and the business can operate. I help teams choose viable use cases, test model behavior, build the surrounding software, and establish the controls needed for production.',
    image: '/images/ai-automation.jpg',
    imageAlt: 'Applied AI automation system shown as a production engineering environment',
    fit: [
      'Leadership has AI use cases, but no reliable path from pilot to production.',
      'A document, support, research, or operations workflow contains expensive manual decisions.',
      'The current prototype lacks evaluation, observability, security, or cost controls.',
      'Your team needs model capability without becoming locked to one provider.',
    ],
    outcomes: [
      { title: 'Use-case validation', body: 'Define where model behavior creates real value, where deterministic software is better, and how success will be measured.' },
      { title: 'Production architecture', body: 'Design the application, model gateway, retrieval, data, background jobs, identity, evaluation, and observability as one system.' },
      { title: 'Model integration', body: 'Implement OpenAI, Claude, open-source, or local models behind boundaries that support testing, cost control, and provider change.' },
      { title: 'Operational safeguards', body: 'Add structured outputs, validation, audit trails, human review, fallbacks, and monitoring around probabilistic behavior.' },
    ],
    process: [
      { title: 'Select the decision', body: 'Identify a bounded workflow where AI can improve throughput, quality, access, or response time.' },
      { title: 'Establish evidence', body: 'Create a representative evaluation set and baseline before committing to a model or architecture.' },
      { title: 'Engineer the product', body: 'Build interfaces, APIs, retrieval, jobs, data models, controls, and model integrations together.' },
      { title: 'Measure in operation', body: 'Track quality, latency, cost, failure modes, and user behavior after deployment.' },
    ],
    proof: {
      title: 'Legal AI with generation and verification in the same loop.',
      body: 'The Legal Document Summarizer covers dataset preparation, Llama 3 fine-tuning, local Ollama deployment, PDF and DOCX processing, structured output, batch execution, and Gemma-based verification.',
      href: 'https://github.com/zimkk/legal-Document-Summerizer',
      label: 'Review the implementation',
    },
    technologies: ['OpenAI', 'Claude', 'Ollama', 'Hugging Face', 'PyTorch', 'LangChain', 'FastAPI', 'PostgreSQL', 'pgvector'],
    faq: [
      { question: 'What does an applied AI consultant deliver?', answer: 'Deliverables can include a validated use case, evaluation set, prototype, production architecture, integrated application, model gateway, automation, monitoring, and operating documentation.' },
      { question: 'Can you work with regulated or sensitive data?', answer: 'The architecture can be designed around access control, auditability, retention, provider policy, data residency, and human review requirements. Legal and regulatory interpretation remains with your qualified advisers.' },
      { question: 'Do you only use hosted models?', answer: 'No. The system can use hosted providers, open-source models, or local inference depending on quality, privacy, latency, infrastructure, and cost constraints.' },
      { question: 'Can you improve an existing AI prototype?', answer: 'Yes. A common engagement is evaluating an existing prototype, identifying production gaps, stabilizing the architecture, and building the missing controls and integrations.' },
    ],
    keywords: ['applied AI consulting', 'AI consulting services', 'production AI consultant', 'enterprise AI implementation', 'LLM consulting'],
  },
  {
    slug: 'ai-agent-development',
    name: 'AI Agent and RAG Development',
    searchTitle: 'AI Agent Development and RAG Engineering Services | Hassan Nazir',
    description: 'Production AI agent and RAG development using LangGraph, model tools, vector search, evaluation, durable jobs, observability, and full-stack product engineering.',
    hero: 'Agents need an operating system, not another demo.',
    directAnswer: 'Production agents require more than a model and a prompt. I build the tool contracts, retrieval, memory, permissions, durable execution, evaluation, cost accounting, fallbacks, and product surface that make agent behavior usable.',
    image: '/images/cloud.webp',
    imageAlt: 'Cloud infrastructure supporting production AI agent systems',
    fit: [
      'A team wants an agent that can act across real tools and business systems.',
      'A RAG application produces inconsistent retrieval or unsupported answers.',
      'Long-running agent work needs retries, state, approvals, and auditability.',
      'The product requires provider flexibility, usage controls, and evaluation.',
    ],
    outcomes: [
      { title: 'Agent architecture', body: 'Define responsibilities, tools, state, permissions, stopping conditions, human approvals, and failure handling.' },
      { title: 'Retrieval and memory', body: 'Build ingestion, chunking, metadata, ranking, access-aware retrieval, vector storage, and memory policies around actual information needs.' },
      { title: 'Durable execution', body: 'Move long-running work into jobs with persisted steps, retries, idempotency, status, cancellation, and operator visibility.' },
      { title: 'Evaluation and control', body: 'Measure task completion, retrieval quality, groundedness, tool behavior, latency, and cost with repeatable test suites.' },
    ],
    process: [
      { title: 'Bound the agent', body: 'Define the decisions it can make, tools it can call, data it can access, and conditions that require a person.' },
      { title: 'Build the context layer', body: 'Connect documents, databases, APIs, user state, and permissions through explicit retrieval and tool contracts.' },
      { title: 'Make execution durable', body: 'Persist runs and steps so work can be observed, retried, evaluated, and audited.' },
      { title: 'Test behavior', body: 'Use scenario suites, traces, model comparisons, adversarial cases, and production feedback to improve reliability.' },
    ],
    proof: {
      title: 'An agent-native SaaS foundation built for extension.',
      body: 'WonderKit includes four persisted agents, provider abstraction across Anthropic, OpenAI, OpenRouter, and Ollama, pgvector memory, an evaluation harness, durable jobs, multi-tenant permissions, usage accounting, and deployment paths.',
      href: 'https://github.com/zimkk/wonderkit',
      label: 'Inspect WonderKit',
    },
    technologies: ['LangGraph', 'LangChain', 'OpenAI', 'Claude', 'Ollama', 'pgvector', 'Pinecone', 'PostgreSQL', 'Inngest'],
    faq: [
      { question: 'What AI agents can you build?', answer: 'Common systems include research agents, document-processing agents, operational assistants, support workflows, internal knowledge tools, data collection agents, and multi-step automations that use APIs and business systems.' },
      { question: 'When should a team use RAG?', answer: 'RAG is useful when answers must draw from changing or private information that should not be placed into model weights. It still requires careful retrieval design, permissions, evaluation, and citation behavior.' },
      { question: 'How do you prevent unreliable agent behavior?', answer: 'The design uses bounded tools, typed inputs and outputs, explicit permissions, deterministic checks, human approval points, run limits, fallbacks, traces, and scenario-based evaluation.' },
      { question: 'Can the system avoid provider lock-in?', answer: 'Yes. Provider boundaries can isolate model-specific SDKs and normalize messages, streaming, cost, and error behavior so the application can compare or change models.' },
    ],
    keywords: ['AI agent development services', 'RAG development services', 'LangGraph consultant', 'AI agent engineer', 'production RAG consultant'],
  },
  {
    slug: 'n8n-automation-consultant',
    name: 'n8n Automation Consulting',
    searchTitle: 'n8n Automation Consultant for AI Workflows and Integrations | Hassan Nazir',
    description: 'n8n automation consulting for reliable AI workflows, API integrations, data pipelines, lead operations, document processing, and self-hosted production delivery.',
    hero: 'Automate the operation, not just the happy path.',
    directAnswer: 'Reliable n8n work requires workflow design, API engineering, data contracts, retries, credentials, queues, observability, and a plan for exceptions. I build automations that can be understood and operated after launch.',
    image: '/images/projects/n8nhub.webp',
    imageAlt: 'n8nHub workflow discovery and automation platform interface',
    fit: [
      'Manual work moves data repeatedly between CRM, email, documents, and internal systems.',
      'Existing workflows fail silently, duplicate work, or depend on one person to repair them.',
      'The automation needs AI classification, extraction, drafting, or decision support.',
      'Your team needs self-hosted n8n with controlled credentials, data, and deployment.',
    ],
    outcomes: [
      { title: 'Workflow architecture', body: 'Map triggers, data contracts, branches, exception paths, ownership, and recovery before nodes multiply.' },
      { title: 'API integration', body: 'Connect SaaS tools, internal services, databases, webhooks, files, and custom endpoints with explicit validation.' },
      { title: 'AI workflow design', body: 'Use models for bounded extraction, classification, research, or drafting with structured outputs and review controls.' },
      { title: 'Production reliability', body: 'Add retries, idempotency, rate handling, logs, alerts, test fixtures, credential management, and deployment documentation.' },
    ],
    process: [
      { title: 'Map the manual path', body: 'Identify volume, decisions, systems, exceptions, owners, and the cost of failure.' },
      { title: 'Design the contract', body: 'Define the event, payload, validation, expected result, and recovery behavior for every integration boundary.' },
      { title: 'Build and exercise', body: 'Implement with representative data, forced failures, duplicate events, expired credentials, and rate limits.' },
      { title: 'Deploy and observe', body: 'Document ownership, alerts, credential rotation, workflow versions, and operating procedures.' },
    ],
    proof: {
      title: 'More than 2,000 workflows made searchable.',
      body: 'n8nHub organizes a large workflow corpus through search, categories, detail views, diagrams, analytics, MongoDB indexing, JSON export, and community discussion.',
      href: 'https://github.com/zimkk/n8nhub',
      label: 'Review n8nHub',
    },
    technologies: ['n8n', 'Webhooks', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'OpenAI', 'Playwright'],
    faq: [
      { question: 'What can be automated with n8n?', answer: 'Typical workflows connect CRM, email, support, documents, spreadsheets, databases, payments, internal APIs, lead systems, reporting, and AI services.' },
      { question: 'Can you repair existing n8n workflows?', answer: 'Yes. I can audit workflow structure, error handling, credentials, data mapping, duplication, performance, observability, and deployment, then stabilize the highest-risk paths.' },
      { question: 'Do you support self-hosted n8n?', answer: 'Yes. Delivery can include Docker deployment, database configuration, reverse proxy integration, secrets, backups, execution modes, worker scaling, monitoring, and upgrade planning.' },
      { question: 'How are AI steps made reliable?', answer: 'AI nodes are bounded with clear instructions, structured outputs, validation, thresholds, fallbacks, human review where required, and stored examples for regression testing.' },
    ],
    keywords: ['n8n automation consultant', 'AI Automations', 'AI automation consultant', 'AI automation services', 'n8n workflow developer', 'enterprise AI automation'],
  },
  {
    slug: 'full-stack-software-development',
    name: 'Full-Stack Software Development',
    searchTitle: 'Full-Stack Software Development & Custom AI Systems | Hassan Nazir',
    description: 'Full-stack software development and custom AI application engineering with TypeScript, React, Next.js, Python, FastAPI, PostgreSQL, and cloud infrastructure.',
    hero: 'Engineered for production from database to interface.',
    directAnswer: 'Full-stack software engineering that connects robust backends, performant APIs, responsive modern frontends, and database architecture into a cohesive, production-grade product.',
    image: '/images/projects/wonderkit.webp',
    imageAlt: 'Full-stack software architecture and SaaS dashboard interface',
    fit: [
      'You need a high-velocity engineer to build and ship an end-to-end product or MVP.',
      'Your system requires custom API design, database modeling, and performant UI.',
      'You want clean TypeScript and Python codebases with production-grade reliability.',
      'Your product needs deep integration with AI models, queues, and third-party services.',
    ],
    outcomes: [
      { title: 'Architecture & data modeling', body: 'Design relational, vector, and cache data layers in PostgreSQL, pgvector, Redis, and MongoDB with clean schemas and migrations.' },
      { title: 'API & microservice engineering', body: 'Build high-performance REST and streaming APIs with FastAPI, Node.js, Next.js, authentication, rate limiting, and type safety.' },
      { title: 'Performant modern frontends', body: 'Craft interactive, accessible, and fast user experiences using React, Next.js, TypeScript, and modern responsive design.' },
      { title: 'DevOps & production delivery', body: 'Containerize with Docker, configure CI/CD pipelines, orchestrate background jobs, and deploy with zero downtime.' },
    ],
    process: [
      { title: 'System specification & design', body: 'Define API contracts, data schemas, user journeys, and infrastructure boundaries.' },
      { title: 'Iterative full-stack execution', body: 'Implement database models, backend logic, and frontend components in sync with continuous integration.' },
      { title: 'Hardening & QA automation', body: 'Add unit tests, end-to-end Playwright tests, error handling, and performance tuning.' },
      { title: 'Deployment & monitoring', body: 'Deploy to cloud infrastructure (AWS/GCP/Vercel) with telemetry, logging, and documentation.' },
    ],
    proof: {
      title: 'An agent-native full-stack SaaS platform.',
      body: 'WonderKit demonstrates end-to-end full-stack engineering: Next.js frontend, PostgreSQL & pgvector data layer, Prisma ORM, Inngest background jobs, Stripe billing, and multi-provider AI agents.',
      href: 'https://github.com/zimkk/wonderkit',
      label: 'Explore WonderKit on GitHub',
    },
    technologies: ['TypeScript', 'Python', 'React', 'Next.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'pgvector', 'Docker', 'AWS', 'TailwindCSS'],
    faq: [
      { question: 'What full-stack technologies do you specialize in?', answer: 'The core stack is TypeScript, Python, React, Next.js, FastAPI, Node.js, PostgreSQL (including pgvector for AI), Redis, Docker, and AWS/GCP cloud services.' },
      { question: 'Can you build a project from scratch or contribute to an existing codebase?', answer: 'Both. I can architect and build new MVPs and SaaS platforms from the ground up, or integrate seamlessly into established repositories and engineering teams.' },
      { question: 'How do you ensure code quality and maintainability?', answer: 'By using strict type safety (TypeScript/Pydantic), comprehensive test coverage (Playwright/Pytest/Jest), modular architectural boundaries, and documented decisions.' },
      { question: 'Do you work remotely with US timezones?', answer: 'Yes. I regularly work with US teams across EST, CST, and PST with scheduled overlap for syncs and fast asynchronous delivery.' },
    ],
    keywords: ['full stack development', 'full stack software development', 'software development services', 'custom software development', 'full stack AI engineer', 'hire full stack developer US', 'React Next.js Python FastAPI developer'],
  },
];

const ServicesPage = () => {
  const { slug } = useParams();
  const service = slug ? servicePages.find((item) => item.slug === slug) : undefined;

  if (slug && !service) {
    return <><SEOHead title="Service not found | Hassan Nazir" description="This service page does not exist." noindex /><main className="route-shell article-missing"><EditorialNav /><h1>That service does not exist.</h1><Link to="/services">View engineering services</Link></main></>;
  }

  if (!service) {
    const hubTitle = 'Forward Deployed Engineering and Applied AI Services | Hassan Nazir';
    const hubDescription = 'Engineering services for US and European teams that need applied AI, agents, RAG, n8n automation, and production software delivered through real operational constraints.';
    const itemList = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Engineering services by Hassan Nazir',
      itemListElement: servicePages.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Service', name: item.name, url: `${siteConfig.url}/services/${item.slug}`, provider: { '@id': schemaIds.personId } } })),
    };
    return (
      <PageTransition>
        <SEOHead title={hubTitle} description={hubDescription} keywords={['applied AI services', 'forward deployed engineering', 'AI agent development', 'n8n consulting']} url={`${siteConfig.url}/services`} jsonLd={[itemList, breadcrumbSchema([{ name: 'Home', url: siteConfig.url }, { name: 'Services', url: `${siteConfig.url}/services` }])]} />
        <main className="route-shell services-shell">
          <EditorialNav />
          <section className="services-hero">
            <div className="services-hero-copy">
              <p>Engineering services for operational AI</p>
              <h1>Technical delivery where strategy usually breaks.</h1>
              <p>I work with US and European teams that need one engineer to connect discovery, models, software, integration, and production ownership.</p>
              <div><a href={PROJECT_CONTACT_HREF}>Discuss the system <ArrowUpRight size={16} /></a><Link to="/work">Review case studies <ArrowRight size={16} /></Link></div>
            </div>
            <figure><img src="/images/forward-deployed-services.webp" width="1440" height="810" fetchPriority="high" decoding="async" alt="Engineer embedded with an operations team in a production environment" /></figure>
          </section>

          <section className="services-index" aria-labelledby="services-index-title">
            <header><h2 id="services-index-title">Choose the constraint, not the buzzword.</h2><p>Each engagement has a different center of gravity. The delivery model stays accountable from discovery through operation.</p></header>
            <div>
              {servicePages.map((item, index) => (
                <Link to={`/services/${item.slug}`} key={item.slug} className={index % 2 ? 'is-offset' : undefined}>
                  <span>{item.name}</span><h3>{item.hero}</h3><p>{item.directAnswer}</p><strong>Open service detail <ArrowUpRight size={16} /></strong>
                </Link>
              ))}
            </div>
          </section>

          <section className="services-region">
            <div><h2>Built for distributed US and European teams.</h2><p>No invented local office. Delivery is remote-first, documented, and structured around agreed working overlap, security boundaries, and the operating environment you already have.</p></div>
            <dl>
              <div><dt>Working overlap</dt><dd>Scheduled sessions for discovery, architecture, reviews, and releases, with focused asynchronous implementation between them.</dd></div>
              <div><dt>Decision record</dt><dd>Architecture, interfaces, assumptions, test evidence, and operating procedures are written down so knowledge survives the engagement.</dd></div>
              <div><dt>Governance-aware delivery</dt><dd>Systems can be designed around access, audit, provider, retention, and data-residency requirements without making unsupported compliance claims.</dd></div>
            </dl>
          </section>

          <section className="route-cta"><p>Start with the operation</p><h2>Bring the workflow that is expensive, unclear, or stuck.</h2><a href={PROJECT_CONTACT_HREF}>Send a concise brief <ArrowRight size={18} /></a></section>
          <footer className="route-footer"><Link to="/">Hassan Nazir</Link><p>Forward Deployed Engineer and Applied AI.</p><a href="mailto:hassannazir955@gmail.com">hassannazir955@gmail.com</a></footer>
        </main>
      </PageTransition>
    );
  }

  const serviceUrl = `${siteConfig.url}/services/${service.slug}`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: service.name,
    description: service.description,
    url: serviceUrl,
    provider: { '@id': schemaIds.personId },
    areaServed: [{ '@type': 'Country', name: 'United States' }, { '@type': 'Place', name: 'European Union' }, { '@type': 'Country', name: 'United Kingdom' }, { '@type': 'Place', name: 'Worldwide' }],
    serviceType: service.name,
  };
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: service.faq.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
  const breadcrumbs = breadcrumbSchema([{ name: 'Home', url: siteConfig.url }, { name: 'Services', url: `${siteConfig.url}/services` }, { name: service.name, url: serviceUrl }]);

  return (
    <PageTransition>
      <SEOHead title={service.searchTitle} description={service.description} keywords={service.keywords} url={serviceUrl} jsonLd={[serviceSchema, faqSchema, breadcrumbs]} />
      <main className="route-shell service-detail-shell">
        <EditorialNav />
        <section className="service-detail-hero">
          <div>
            <Link to="/services">All engineering services</Link>
            <h1>{service.hero}</h1>
            <p>{service.directAnswer}</p>
            <div><a href={PROJECT_CONTACT_HREF}>Discuss your system <ArrowUpRight size={16} /></a><a href={service.proof.href} target="_blank" rel="noopener noreferrer"><Github size={16} /> Review public proof</a></div>
          </div>
          <figure><img src={service.image} width="1440" height="810" fetchPriority="high" decoding="async" alt={service.imageAlt} /></figure>
        </section>

        <section className="service-fit">
          <div><h2>This engagement fits when the handoffs are the problem.</h2></div>
          <ul>{service.fit.map((item) => <li key={item}><Check size={18} />{item}</li>)}</ul>
        </section>

        <section className="service-outcomes">
          <header><h2>What gets built.</h2><p>The scope is shaped around the operating result. These are the engineering layers commonly required to reach it.</p></header>
          <div>{service.outcomes.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className="service-proof">
          <figure><img src={service.image} width="1440" height="810" loading="lazy" decoding="async" alt={service.imageAlt} /></figure>
          <div><h2>{service.proof.title}</h2><p>{service.proof.body}</p><a href={service.proof.href} target="_blank" rel="noopener noreferrer">{service.proof.label} <ArrowUpRight size={16} /></a></div>
        </section>

        <section className="service-process">
          <header><h2>How the work moves.</h2></header>
          <div>{service.process.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
          <div className="service-technology"><p>Working technology</p><div>{service.technologies.map((item) => <span key={item}>{item}</span>)}</div></div>
        </section>

        <section className="service-faq">
          <header><h2>Questions technical buyers ask.</h2></header>
          <div>{service.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
        </section>

        <section className="service-related">
          <h2>Related engineering services</h2>
          <div>{servicePages.filter((item) => item.slug !== service.slug).map((item) => <Link to={`/services/${item.slug}`} key={item.slug}><span>{item.name}</span><ArrowUpRight size={17} /></Link>)}</div>
        </section>

        <section className="route-cta"><p>Start with the difficult part</p><h2>Describe the system, the constraint, and what needs to change.</h2><a href={PROJECT_CONTACT_HREF}>Send a concise brief <ArrowRight size={18} /></a></section>
        <footer className="route-footer"><Link to="/">Hassan Nazir</Link><p>{service.name}</p><a href="mailto:hassannazir955@gmail.com">Start a conversation</a></footer>
      </main>
    </PageTransition>
  );
};

export default ServicesPage;
