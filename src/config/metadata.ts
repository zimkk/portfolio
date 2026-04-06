export const siteConfig = {
  name: "Hassan Nazir",
  title: "Hassan Nazir - AI Systems Architect & Engineering Lead | Official Website",
  description: "Hassan Nazir is an AI Systems Architect & Engineering Lead with 3+ years of experience designing and scaling enterprise AI automation platforms. Architected LLM-powered systems serving 10K+ users, 10K+ daily transactions, 99.9% uptime. Proven impact: 40% cost reduction, 60% efficiency gains. Expertise in LangChain, Hugging Face, n8n, OpenAI APIs, and modern DevOps. Based in Pakistan. Contact for AI consulting and automation.",
  url: "https://hassannazir.dev",
  ogImage: "https://hassannazir.dev/images/profile.png",
  location: "Pakistan",
  phone: "+92 331 5892488",
  email: "hassannazir955@gmail.com",
  links: {
    twitter: "https://twitter.com/hassannazir",
    github: "https://github.com/zimkk",
    linkedin: "https://linkedin.com/in/hassannazirrr",
  },
  /** ISO date when site content was last updated — helps crawlers and AI agents get fresh data */
  lastUpdated: "2025-02-21",
};

export const defaultMetadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Hassan Nazir",
    "Hassan Nazir AI Engineer",
    "Hassan Nazir CTO",
    "Hassan Nazir Pakistan",
    "Hassan Nazir Senior AI Engineer",
    "Hassan Nazir Schmoozzer",
    "Hassan Nazir NDT Legacy Group",
    "Hassan Nazir Portfolio",
    "Hassan Nazir Resume",
    "Hassan Nazir CV",
    "Hassan Nazir Contact",
    "Hassan Nazir LinkedIn",
    "Hassan Nazir GitHub",
    "Hassan Nazir Freelancer",
    "Hassan Nazir AI Automation",
    "Hassan Nazir LLM",
    "Hassan Nazir Machine Learning",
    "Hassan Nazir DevOps",
    "Hassan Nazir QA Engineer",
    "Hassan Nazir Python Developer",
    "Hassan Nazir Certified Ethical Hacker",
    "Senior AI Engineer",
    "CTO Pakistan",
    "AI Engineer Pakistan",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@hassannazir",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export const pageMetadata = {
  home: {
    title: "Hassan Nazir - Official Website | AI Systems Architect & Engineering Lead",
    description: "Hassan Nazir is an AI Systems Architect & Engineering Lead with 3+ years of experience. Architected enterprise AI automation platforms (10K+ users, 99.9% uptime). Currently Sr. AI Engineer at NDT Legacy Group, Full Stack Engineer at Gridcore. Contact for AI consulting and automation.",
    keywords: ["Hassan Nazir", "Hassan Nazir AI Engineer", "Hassan Nazir Pakistan", "Hassan Nazir Portfolio", "Hassan Nazir Contact", "AI Systems Architect", "NDT Legacy Group", "Gridcore"],
  },
  work: {
    title: "Hassan Nazir Work & Case Studies | AI, DevOps, QA Projects",
    description: "Selected work and case studies: Enterprise AI Automation (NDT Legacy), Cloud Security Monitoring (Gridcore), Automated QA Framework (Brilliant Gaming). Real-world impact: 60% manual task reduction, 99.2% uptime, 70% testing time reduction.",
    keywords: ["Hassan Nazir Work", "Hassan Nazir Case Studies", "NDT Legacy Group", "Gridcore", "Brilliant Gaming", "AI Automation", "QA Automation", "DevOps"],
  },
  blogs: {
    title: "Hassan Nazir Blog | AI, Deep Learning, Computer Vision & Agentic AI",
    description: "Expert articles from Hassan Nazir: prompt engineering, Zero Trust architecture, AI threat detection, transformers, agentic AI (LangChain), computer vision (SAM, DINOv2), and AI trends 2025. Practical code and tutorials.",
    keywords: ["Hassan Nazir Blog", "AI Tutorials", "Deep Learning", "Computer Vision", "Agentic AI", "LangChain", "SAM", "DINOv2", "Prompt Engineering", "Zero Trust", "AI Trends 2025"],
  },
  contact: {
    title: "Contact Hassan Nazir | AI Consulting & Automation",
    description: "Contact Hassan Nazir for AI consulting, automation projects, and opportunities. Email: hassannazir955@gmail.com, Phone: +92 331 5892488. Available for freelance and full-time. Schedule a call or send a message.",
    keywords: ["Contact Hassan Nazir", "Hassan Nazir Email", "Hassan Nazir Phone", "Hassan Nazir Hire", "Hassan Nazir Consulting"],
  },
  about: {
    title: "About Hassan Nazir | AI Systems Architect & Engineering Lead",
    description: "Hassan Nazir: AI Systems Architect & Engineering Lead. 3+ years designing enterprise AI automation. 50+ projects, 10+ technologies. Foundation in computer science and cybersecurity. Innovation-driven engineer.",
    keywords: ["About Hassan Nazir", "Hassan Nazir Background", "AI Systems Architect", "Engineering Lead"],
  },
  experience: {
    title: "Work Experience | Hassan Nazir",
    description: "Professional experience: Sr. AI Engineer (NDT Legacy Group), Full Stack Engineer (Gridcore), Senior AI Engineer (Schmoozzer), QA Automation Engineer (Brilliant Gaming), Independent Consultant (Fiverr/Upwork).",
    keywords: ["Experience", "NDT Legacy", "Gridcore", "Schmoozzer", "Brilliant Gaming", "Career"],
  },
  education: {
    title: "Education | Hassan Nazir",
    description: "Associate Degree in Computer Science, Air University Islamabad (2020–2025). Coursework: Data Science, Cloud Computing, Machine Learning, AI, Algorithms, Database Systems.",
    keywords: ["Education", "Air University", "Computer Science", "Hassan Nazir"],
  },
  certifications: {
    title: "Certifications | Hassan Nazir",
    description: "CEH-P (NUST-NCAI/NAVTTC), Practical Ethical Hacking (TCM Security), ISO/IEC 27001 Information Security Associate (SkillFront).",
    keywords: ["Certifications", "CEH-P", "PEH", "ISO 27001", "Hassan Nazir"],
  },
  skills: {
    title: "Technical Skills | Hassan Nazir",
    description: "Languages: Python, JavaScript, TypeScript, SQL. Frameworks: React, Next.js, LangChain, Hugging Face, FastAPI. Tools: n8n, Zapier, Make, Docker, AWS, Git, Linux. AI/ML and full-stack development.",
    keywords: ["Skills", "Python", "LangChain", "n8n", "React", "Docker", "Hassan Nazir"],
  },
  projects: {
    title: "Projects & Research | Hassan Nazir",
    description: "AI Document Processor, DevOps Automation Pipeline, Intelligent Workflow Automation (n8n), QA Test Automation, Custom LLM Fine-tuning, Cloud Resource Optimizer. LangChain, Hugging Face, Docker, AWS.",
    keywords: ["Projects", "Portfolio", "AI", "n8n", "LLM", "DevOps", "Hassan Nazir"],
  },
};

export const structuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: ["Hassan Nazir AI Engineer", "Hassan Nazir AI Systems Architect", "Hassan Nazir Pakistan"],
    jobTitle: "AI Systems Architect & Engineering Lead",
    description: siteConfig.description,
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    ...(siteConfig.lastUpdated && { dateModified: siteConfig.lastUpdated }),
    image: {
      "@type": "ImageObject",
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      caption: "Hassan Nazir - AI Systems Architect & Engineering Lead"
    },
    email: siteConfig.email,
    telephone: siteConfig.phone,
    nationality: "Pakistani",
    birthPlace: "Pakistan",
    homeLocation: {
      "@type": "Place",
      name: "Pakistan",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PK",
        addressRegion: "Punjab",
        addressLocality: "Lahore"
      }
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: "Punjab",
      addressLocality: "Lahore"
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
      "https://www.fiverr.com/hassannazir",
      "https://www.upwork.com/freelancers/hassannazir"
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "NDT Legacy Group",
        jobTitle: "Sr. AI Engineer",
        startDate: "2025-08"
      },
      {
        "@type": "Organization",
        name: "Gridcore",
        jobTitle: "Full Stack Engineer",
        startDate: "2023-12"
      },
      {
        "@type": "Organization",
        name: "Schmoozzer",
        jobTitle: "Senior AI Engineer",
        startDate: "2025-10",
        endDate: "2026-01"
      }
    ],
    knowsAbout: [
      "LLM Fine-tuning",
      "LangChain",
      "Hugging Face",
      "n8n Automation",
      "RAG Systems",
      "Vector Databases",
      "AI Agents",
      "MLOps",
      "DevOps",
      "QA Automation",
      "Python",
      "JavaScript",
      "Docker",
      "Kubernetes",
      "AWS",
      "Machine Learning",
      "Artificial Intelligence",
      "Process Automation"
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Certified Ethical Hacker - Practical (CEH-P)",
        credentialCategory: "Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "NUST-NCAI / NAVTTC"
        },
        dateCreated: "2024"
      },
      {
        "@type": "EducationalOccupationalCredential", 
        name: "Practical Ethical Hacking (PEH)",
        credentialCategory: "Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "TCM Security Academy"
        },
        dateCreated: "2023"
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "ISO/IEC 27001 Information Security Associate", 
        credentialCategory: "Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "SkillFront"
        },
        dateCreated: "2023"
      }
    ],
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    ...(siteConfig.lastUpdated && { dateModified: siteConfig.lastUpdated }),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/blogs?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    description: siteConfig.description,
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url
      }
    ]
  },
  professionalService: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Hassan Nazir - AI & Automation Services",
    description: "AI Systems Architect & Engineering Lead. Services: enterprise AI automation, LLM fine-tuning, custom AI agents, workflow automation (n8n, Make), full-stack development, DevOps, QA automation.",
    provider: {
      "@type": "Person",
      name: siteConfig.name
    },
    areaServed: "Worldwide",
    serviceType: [
      "AI Engineering",
      "AI Systems Architecture",
      "Automation Development",
      "LLM Fine-tuning",
      "Full Stack Development",
      "DevOps Services",
      "QA Automation"
    ]
  }
};
