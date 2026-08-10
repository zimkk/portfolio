export const siteConfig = {
  name: 'Hassan Nazir',
  legalName: 'Hassan Nazir',
  title: 'Hassan Nazir — Forward Deployed Engineer & Applied AI',
  description: 'Hassan Nazir is a Forward Deployed Engineer in Islamabad who embeds with teams to turn ambiguous operational problems into deployed AI, automation, and full-stack systems.',
  url: 'https://hassannazir.dev',
  ogImage: 'https://hassannazir.dev/images/profile.png',
  location: 'Islamabad, Pakistan',
  email: 'hassannazir955@gmail.com',
  lastUpdated: '2026-08-10',
  links: {
    github: 'https://github.com/zimkk',
    linkedin: 'https://linkedin.com/in/hassannazirrr',
    twitter: 'https://twitter.com/hassannazir',
  },
} as const;

export const defaultMetadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Hassan Nazir',
    'Forward Deployed Engineer',
    'Applied AI Engineer',
    'AI systems engineer Pakistan',
    'LLM agent engineering',
    'AI automation consultant',
    'production AI systems',
    'full-stack AI engineer',
  ],
  creator: siteConfig.name,
  openGraph: {
    images: [{ url: siteConfig.ogImage, width: 1024, height: 1024, alt: 'Hassan Nazir, Forward Deployed Engineer and Applied AI engineer' }],
  },
  twitter: { creator: '@hassannazir' },
};

export const pageMetadata = {
  home: {
    title: 'Hassan Nazir — Forward Deployed Engineer & Applied AI',
    description: 'Forward Deployed Engineer building production AI systems, operational automation, and full-stack products. Explore Hassan Nazir’s deployments, open-source projects, writing, and experience.',
    keywords: ['Hassan Nazir portfolio', 'Forward Deployed Engineer', 'Applied AI', 'production AI systems'],
  },
  work: {
    title: 'Engineering Work & Case Studies — Hassan Nazir',
    description: 'Selected product, automation, AI, cloud, and quality-engineering work by Forward Deployed Engineer Hassan Nazir, with scope, architecture, and measurable outcomes.',
    keywords: ['Hassan Nazir projects', 'AI engineering case studies', 'automation portfolio', 'product engineering'],
  },
  blogs: {
    title: 'Applied AI & Engineering Field Notes — Hassan Nazir',
    description: 'Technical field notes by Hassan Nazir about agentic AI, LLM systems, computer vision, security architecture, deep learning, and production engineering.',
    keywords: ['applied AI articles', 'agentic AI engineering', 'LLM systems', 'engineering field notes'],
  },
  contact: {
    title: 'Contact Hassan Nazir — AI Engineering & Automation',
    description: 'Contact Hassan Nazir about forward deployed engineering, applied AI systems, automation, architecture, and product delivery.',
    keywords: ['hire Forward Deployed Engineer', 'AI engineering consultant', 'contact Hassan Nazir'],
  },
  about: {
    title: 'About Hassan Nazir — Forward Deployed Engineer',
    description: 'Hassan Nazir embeds with teams to discover operational problems, build applied AI systems, integrate them, and own production outcomes.',
    keywords: ['About Hassan Nazir', 'Forward Deployed Engineer', 'Applied AI Engineer'],
  },
  experience: {
    title: 'Engineering Experience — Hassan Nazir',
    description: 'Hassan Nazir’s experience across AI architecture, full-stack engineering, production automation, infrastructure, and quality engineering.',
    keywords: ['Hassan Nazir experience', 'AI Architect', 'Software Architect', 'Full-Stack Engineer'],
  },
  education: {
    title: 'Education & Credentials — Hassan Nazir',
    description: 'Associates in Science, Computer Science at Air University, plus security credentials including CEH-P, PEH, and ISO/IEC 27001 training.',
    keywords: ['Hassan Nazir education', 'Air University', 'CEH-P'],
  },
  certifications: {
    title: 'Security Certifications — Hassan Nazir',
    description: 'Security credentials held by Hassan Nazir: CEH-P, Practical Ethical Hacking, and ISO/IEC 27001 Information Security Associate.',
    keywords: ['Hassan Nazir certifications', 'CEH-P', 'ISO 27001'],
  },
  skills: {
    title: 'Applied AI & Engineering Skills — Hassan Nazir',
    description: 'Applied AI, agents, RAG, TypeScript, Python, React, Next.js, FastAPI, automation, data systems, Docker, Kubernetes, and cloud delivery.',
    keywords: ['Applied AI skills', 'LLM agents', 'Python', 'TypeScript', 'automation'],
  },
  projects: {
    title: 'Open-Source Engineering Projects — Hassan Nazir',
    description: 'Original public systems by Hassan Nazir spanning agent-native SaaS, municipal intelligence, browser engines, legal AI, lead automation, and workflow infrastructure.',
    keywords: ['Hassan Nazir GitHub', 'open-source AI projects', 'WonderKit', 'n8nHub'],
  },
} as const;

const personId = `${siteConfig.url}/#hassan-nazir`;
const websiteId = `${siteConfig.url}/#website`;
const profilePageId = `${siteConfig.url}/#profile`;

export const structuredData = {
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: siteConfig.name,
    alternateName: ['Hassan Nazir', 'zimkk'],
    jobTitle: 'Forward Deployed Engineer',
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    email: `mailto:${siteConfig.email}`,
    nationality: { '@type': 'Country', name: 'Pakistan' },
    homeLocation: {
      '@type': 'Place',
      name: siteConfig.location,
      address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter],
    knowsLanguage: ['English', 'Urdu'],
    knowsAbout: [
      'Forward deployed engineering', 'Applied artificial intelligence', 'AI agents', 'Retrieval-augmented generation',
      'Large language model applications', 'Workflow automation', 'Product engineering', 'Full-stack engineering',
      'Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Vector databases',
      'Docker', 'Kubernetes', 'Amazon Web Services', 'Google Cloud Platform', 'Quality automation',
    ],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Air University', sameAs: 'https://www.au.edu.pk/' },
    mainEntityOfPage: { '@id': profilePageId },
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: siteConfig.name,
    alternateName: 'Hassan Nazir Engineering Portfolio',
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en',
    dateModified: siteConfig.lastUpdated,
    publisher: { '@id': personId },
  },
  profilePage: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': profilePageId,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    dateModified: siteConfig.lastUpdated,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': personId },
  },
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/#forward-deployed-engineering`,
    name: 'Forward Deployed Engineering and Applied AI',
    description: 'Operational discovery, AI prototyping, product engineering, systems integration, automation, rollout, and production ownership.',
    provider: { '@id': personId },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    serviceType: ['Forward Deployed Engineering', 'Applied AI Systems', 'AI Agents', 'Workflow Automation', 'Full-Stack Product Engineering'],
    url: `${siteConfig.url}/#contact`,
  },
  projects: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/#open-source-projects`,
    name: 'Selected original open-source projects by Hassan Nazir',
    numberOfItems: 6,
    itemListElement: [
      ['NY Municipal Decision-Maker Monitor', 'https://github.com/zimkk/erdman-ny-county', 'Python'],
      ['WonderKit', 'https://github.com/zimkk/wonderkit', 'TypeScript'],
      ['Google Maps Lead Scraper', 'https://github.com/zimkk/Lead-Scraper-Google-Maps', 'Python'],
      ['Mynecraft', 'https://github.com/zimkk/mynecraft', 'TypeScript'],
      ['Legal Document Summarizer', 'https://github.com/zimkk/legal-Document-Summerizer', 'Python'],
      ['n8nHub', 'https://github.com/zimkk/n8nhub', 'TypeScript'],
    ].map(([name, url, programmingLanguage], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name,
        url,
        codeRepository: url,
        programmingLanguage,
        author: { '@id': personId },
      },
    })),
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}/#direct-answers`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Hassan Nazir?',
        acceptedAnswer: { '@type': 'Answer', text: 'Hassan Nazir is a Forward Deployed Engineer based in Islamabad, Pakistan. He builds applied AI systems, operational automation, and full-stack products from discovery through production.' },
      },
      {
        '@type': 'Question',
        name: 'What does forward deployed engineering mean in Hassan Nazir’s work?',
        acceptedAnswer: { '@type': 'Answer', text: 'It means embedding with a team, learning the real operational workflow, prototyping against actual constraints, integrating the system, deploying it, and remaining accountable for production outcomes.' },
      },
      {
        '@type': 'Question',
        name: 'What kinds of AI systems does Hassan Nazir build?',
        acceptedAnswer: { '@type': 'Answer', text: 'His work includes AI agents, retrieval-augmented generation, document intelligence, LLM applications, vector search, model integration, evaluation, workflow automation, and the backend and infrastructure required to operate them.' },
      },
      {
        '@type': 'Question',
        name: 'Where can Hassan Nazir’s engineering work be verified?',
        acceptedAnswer: { '@type': 'Answer', text: 'Original public source projects are available at github.com/zimkk, selected product work is documented at hassannazir.dev/work, and technical articles are published at hassannazir.dev/blogs.' },
      },
    ],
  },
};

export const schemaIds = { personId, websiteId, profilePageId } as const;

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
