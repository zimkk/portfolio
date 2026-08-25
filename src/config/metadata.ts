export const siteConfig = {
  name: 'Hassan Nazir',
  legalName: 'Hassan Nazir',
  title: 'Forward Deployed Engineering, AI Automations & Full-Stack Software Development — Hassan Nazir',
  description: 'Hire a Forward Deployed Engineer for AI Automations, Full-Stack Software Development, Autonomous AI Agents, RAG Pipelines, and n8n Enterprise Workflows. Available for US & Global Teams.',
  url: 'https://hassannazir.dev',
  ogImage: 'https://hassannazir.dev/images/profile.png',
  location: 'Islamabad, Pakistan (Available for US & Global Remote Engagements)',
  email: 'hassannazir955@gmail.com',
  lastUpdated: '2026-08-26',
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
    'Forward Deployed Engineer',
    'Forward Deployed Engineer USA',
    'AI Automations',
    'AI Automation Consultant',
    'AI Automation Services',
    'Full Stack Development',
    'Full Stack Software Development',
    'Software Development Services',
    'Custom Software Development',
    'AI Agent Developer',
    'RAG Systems Engineer',
    'n8n Automation Consultant',
    'Applied AI Engineer',
    'Applied AI Consultant',
    'Full Stack AI Engineer',
    'Enterprise AI Automation',
    'Hire Forward Deployed Engineer',
    'Hire AI Automation Consultant',
    'Hire Full Stack Developer US',
    'Hassan Nazir',
  ],
  creator: siteConfig.name,
  openGraph: {
    images: [{ url: siteConfig.ogImage, width: 1024, height: 1024, alt: 'Forward Deployed Engineering, AI Automations & Full-Stack Software Development' }],
  },
  twitter: { creator: '@hassannazir' },
};

export const pageMetadata = {
  home: {
    title: 'Forward Deployed Engineering, AI Automations & Full-Stack Software Development',
    description: 'Specialized engineering services: Forward Deployed Engineering, AI Automations, Full-Stack Software Development, Autonomous AI Agents, RAG architectures, and n8n workflows.',
    keywords: [
      'Forward Deployed Engineer',
      'Forward Deployed Engineer USA',
      'AI Automations',
      'AI Automation Consultant',
      'Full Stack Development',
      'Software Development Services',
      'Custom Software Development',
      'AI Agent Developer',
      'RAG Engineer',
      'n8n Automation Consultant',
    ],
  },
  services: {
    title: 'Engineering Services: Forward Deployed Engineering, AI Automations, Full-Stack Software Development',
    description: 'Commercial engineering services for US and European teams: Forward Deployed Engineering, AI Automations, Full-Stack Software Development, AI Agent & RAG Engineering, and n8n Workflow Consulting.',
    keywords: [
      'hire Forward Deployed Engineer',
      'AI Automations Services',
      'Full Stack Development Services',
      'Software Development Consultant',
      'AI Automation Consultant USA',
      'AI Agent Development Services',
      'RAG Engineering Services',
      'n8n Automation Consultant',
    ],
  },
  work: {
    title: 'Software & AI Engineering Case Studies — Hassan Nazir',
    description: 'Selected case studies in full-stack software development, AI automations, autonomous agents, cloud systems, and production software deployments.',
    keywords: [
      'AI engineering case studies',
      'software development portfolio',
      'AI automations portfolio',
      'WonderKit',
      'NY Municipal Monitor',
      'Full Stack projects',
    ],
  },
  blogs: {
    title: 'Applied AI & Software Engineering Field Notes — Hassan Nazir',
    description: 'Technical field notes on AI automations, agentic AI, LLM systems, computer vision models, Zero Trust architecture, and full-stack software engineering.',
    keywords: [
      'AI Automations articles',
      'Applied AI field notes',
      'Software engineering articles',
      'Agentic AI engineering',
      'LLM architecture',
    ],
  },
  contact: {
    title: 'Hire a Forward Deployed Engineer — AI Automations & Software Development Engagements',
    description: 'Hire Hassan Nazir for forward deployed engineering, AI automations, full-stack software development, AI agent workflows, and production systems integration.',
    keywords: [
      'hire Forward Deployed Engineer',
      'hire AI automation consultant',
      'hire full stack software developer',
      'AI engineering consultant USA',
      'contract software developer US',
    ],
  },
  about: {
    title: 'About Hassan Nazir — Forward Deployed Engineer & Full-Stack AI Architect',
    description: 'Hassan Nazir is a Forward Deployed Engineer who embeds with teams to build AI automations, full-stack software products, and scalable production systems.',
    keywords: ['Forward Deployed Engineer', 'Full Stack AI Architect', 'About Hassan Nazir', 'Applied AI Engineer'],
  },
  experience: {
    title: 'Engineering Experience — Full-Stack & AI Architecture',
    description: 'Professional engineering experience across full-stack software development, AI automations, system architecture, security auditing, and cloud delivery.',
    keywords: ['Software Engineer experience', 'AI Architect experience', 'Full Stack Engineer background'],
  },
  education: {
    title: 'Education & Credentials — Hassan Nazir',
    description: 'Bachelors in Science, Computer Science (Air University, 2020–2024) plus security credentials including CEH-P, PEH, and ISO/IEC 27001.',
    keywords: ['Hassan Nazir education', 'Air University Computer Science', 'CEH-P', 'ISO 27001', 'PEH'],
  },
  certifications: {
    title: 'Security Certifications & Credentials — Hassan Nazir',
    description: 'Certified Ethical Hacker Practical (CEH-P), Practical Ethical Hacking (PEH), and ISO/IEC 27001 Information Security Associate.',
    keywords: ['CEH-P certification', 'ISO 27001 certification', 'Practical Ethical Hacking', 'Security certifications'],
  },
  skills: {
    title: 'Full-Stack Software Development & AI Skills — Hassan Nazir',
    description: 'Core competencies in Full Stack Development (React, Next.js, TypeScript, Python, FastAPI, PostgreSQL), AI Automations (n8n, LangGraph), Vector Databases, Docker, AWS, and GCP.',
    keywords: ['Full stack development skills', 'AI Automations skills', 'Python', 'TypeScript', 'FastAPI', 'Next.js', 'React'],
  },
  projects: {
    title: 'Open-Source Software & AI Systems — Hassan Nazir',
    description: 'Original open-source software: WonderKit full-stack AI SaaS foundation, NY County Decision Monitor, Playwright Maps Lead Scraper, Mynecraft 3D engine, and n8nHub.',
    keywords: ['open-source software development', 'WonderKit', 'n8nHub', 'Playwright lead scraper', 'Full stack AI projects'],
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
    jobTitle: 'Forward Deployed Engineer & Full-Stack AI Architect',
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
    areaServed: [
      { '@type': 'Country', name: 'United States', identifier: 'US' },
      { '@type': 'Place', name: 'North America' },
      { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' },
      { '@type': 'Place', name: 'European Union' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    knowsLanguage: ['English', 'Urdu'],
    knowsAbout: [
      'Forward deployed engineering',
      'AI Automations & n8n workflows',
      'Full-stack software development',
      'Custom software engineering',
      'Applied artificial intelligence',
      'AI agents & LangGraph architectures',
      'Retrieval-augmented generation (RAG)',
      'Large language model systems',
      'Python',
      'TypeScript',
      'React',
      'Next.js',
      'FastAPI',
      'PostgreSQL & pgvector',
      'Vector databases (Qdrant, Pinecone, Chroma)',
      'Docker & Kubernetes',
      'Amazon Web Services (AWS)',
      'Google Cloud Platform (GCP)',
      'Cybersecurity',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Air University',
      sameAs: 'https://www.au.edu.pk/',
      description: 'Bachelors in Science, Computer Science (2020–2024)',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified Ethical Hacker Practical (CEH-P)',
        credentialCategory: 'Professional Certification',
        recognizedBy: { '@type': 'Organization', name: 'EC-Council' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Practical Ethical Hacking (PEH)',
        credentialCategory: 'Professional Certification',
        recognizedBy: { '@type': 'Organization', name: 'TCM Security Academy' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO/IEC 27001 Information Security Associate',
        credentialCategory: 'Professional Certification',
        recognizedBy: { '@type': 'Organization', name: 'SkillFront' },
      },
    ],
    mainEntityOfPage: { '@id': profilePageId },
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Forward Deployed Engineering & AI Automation Services',
    alternateName: 'Hassan Nazir — Forward Deployed Engineering, AI Automations & Software Development',
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
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#engineering-services`,
    name: 'Forward Deployed Engineering, AI Automations & Software Development Services',
    description: 'Embedded technical delivery, AI automations, full-stack software development, AI agent development, RAG systems, and production software engineering for US and global companies.',
    provider: { '@id': personId },
    areaServed: [
      { '@type': 'Country', name: 'United States', identifier: 'US' },
      { '@type': 'Place', name: 'North America' },
      { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' },
      { '@type': 'Place', name: 'European Union' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    serviceType: [
      'Forward Deployed Engineering',
      'AI Automations & n8n Workflows',
      'Full-Stack Software Development',
      'Custom Software Development',
      'AI Agent & LangGraph Development',
      'RAG & Vector Search Engineering',
      'Applied AI Systems & Consulting',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering & AI Services Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Forward Deployed Engineering',
            url: `${siteConfig.url}/services/forward-deployed-engineer`,
            description: 'Embedded technical execution bridging product discovery, AI prototyping, systems integration, and production delivery.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Automations & n8n Consulting',
            url: `${siteConfig.url}/services/n8n-automation-consultant`,
            description: 'Enterprise AI workflow automation, custom node integrations, self-hosted n8n infrastructure, and reliable lead operations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full-Stack Software Development',
            url: `${siteConfig.url}/services/full-stack-software-development`,
            description: 'Full-stack web and cloud software engineering using React, Next.js, TypeScript, Python, FastAPI, PostgreSQL, and Docker.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Agent & RAG Development',
            url: `${siteConfig.url}/services/ai-agent-development`,
            description: 'Production-ready multi-agent systems, LangGraph workflows, hybrid search, pgvector memory, and durable job orchestration.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Applied AI Consulting',
            url: `${siteConfig.url}/services/applied-ai-consulting`,
            description: 'Strategic and hands-on implementation of LLM architectures, document intelligence, safety guardrails, and evaluation pipelines.',
          },
        },
      ],
    },
    url: `${siteConfig.url}/services`,
  },
  projects: {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/#open-source-projects`,
    name: 'Selected original open-source systems by Hassan Nazir',
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
        name: 'What services can I hire a Forward Deployed Engineer for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can hire for: (1) Forward Deployed Engineering (embedded sprint delivery), (2) AI Automations & n8n Enterprise Workflows, (3) Full-Stack Software Development (React, Next.js, Python, FastAPI, PostgreSQL), (4) AI Agent & RAG Development (LangGraph, tool use, vector search), and (5) Applied AI Consulting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can US startups and enterprises hire for AI Automations and Full-Stack Development remotely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Services are delivered remotely with dedicated working overlap across US Eastern (EST), Central (CST), and Pacific (PST) business hours. Engagements include embedded sprints, milestone-based software delivery, and fractional AI engineering.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies are used for Full-Stack Software Development and AI Automations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The primary tech stack includes TypeScript, Python, React, Next.js, FastAPI, Node.js, PostgreSQL (pgvector), n8n, LangGraph, OpenAI, Claude, Docker, Kubernetes, AWS, and GCP.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the background and credentials of the engineer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hassan Nazir holds a Bachelors in Science, Computer Science from Air University, Islamabad (2020–2024), Certified Ethical Hacker Practical (CEH-P), Practical Ethical Hacking (PEH), and ISO/IEC 27001 Information Security Associate credentials.',
        },
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
