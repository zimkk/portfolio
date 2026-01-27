export const siteConfig = {
  name: "Hassan Nazir",
  title: "Hassan Nazir - Senior AI Engineer & CTO | Official Website",
  description: "Hassan Nazir is a Senior AI Engineer & CTO with 3+ years of experience in LLM fine-tuning, custom model training, and intelligent workflow orchestration. Hassan Nazir has proven expertise in LangChain, Hugging Face, n8n, and Make with measurable results: 40% cost reduction, 60% efficiency improvement, and 99.9% system uptime. Contact Hassan Nazir for AI automation services.",
  url: "https://hassannazir.dev",
  ogImage: "https://hassannazir.dev/images/profile.png",
  location: "Pakistan",
  phone: "+92 331 5892488",
  email: "hassannazir955@gmail.com",
  links: {
    twitter: "https://twitter.com/hassannazir",
    github: "https://github.com/hassannazir",
    linkedin: "https://linkedin.com/in/hassannazir",
  },
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
    title: "Hassan Nazir - Official Website | Senior AI Engineer & CTO",
    description: "Hassan Nazir is a Senior AI Engineer & CTO with 3+ years of experience. Hassan Nazir specializes in LLM fine-tuning, AI automation, and machine learning. Currently working at Schmoozzer and NDT Legacy Group. Contact Hassan Nazir for AI consulting and automation services.",
    keywords: ["Hassan Nazir", "Hassan Nazir AI Engineer", "Hassan Nazir CTO", "Hassan Nazir Pakistan", "Hassan Nazir Portfolio", "Hassan Nazir Contact"],
  },
  work: {
    title: "Hassan Nazir Work Experience | Professional Journey",
    description: "Explore Hassan Nazir's professional journey, projects, and achievements in AI, automation, and software engineering. Hassan Nazir has worked with top companies like Schmoozzer, NDT Legacy Group, and Brilliant Gaming.",
    keywords: ["Hassan Nazir Work", "Hassan Nazir Experience", "Hassan Nazir Career", "Hassan Nazir Projects"],
  },
  blogs: {
    title: "Hassan Nazir Blog | AI, Deep Learning, Computer Vision & Agentic AI Tutorials",
    description: "Expert insights from Hassan Nazir on AI, deep learning, computer vision, agentic AI, and cybersecurity. Learn about LLM fine-tuning, transformers, SAM, DINOv2, LangChain agents, and enterprise AI adoption with practical code examples.",
    keywords: ["Hassan Nazir Blog", "AI Tutorials", "Deep Learning Guide", "Computer Vision", "Agentic AI", "LangChain Tutorial", "SAM Model", "DINOv2", "Transformer Architecture", "LLM Fine-tuning", "Prompt Engineering", "Zero Trust Security", "AI Trends 2025"],
  },
  contact: {
    title: "Contact Hassan Nazir | Get in Touch",
    description: "Get in touch with Hassan Nazir for AI consulting, automation projects, collaborations, or job opportunities. Hassan Nazir is available for freelance and full-time positions. Email: hassannazir955@gmail.com, Phone: +92 331 5892488",
    keywords: ["Contact Hassan Nazir", "Hassan Nazir Email", "Hassan Nazir Phone", "Hassan Nazir Hire", "Hassan Nazir Consulting"],
  },
  about: {
    title: "About Hassan Nazir | AI Engineer & CTO Background",
    description: "Learn more about Hassan Nazir's background, passion for technology, and journey in AI and automation engineering. Hassan Nazir is a certified ethical hacker and experienced AI professional.",
    keywords: ["About Hassan Nazir", "Hassan Nazir Background", "Hassan Nazir Story", "Hassan Nazir Biography"],
  },
  experience: {
    title: "Experience",
    description: "My professional experience, roles, and contributions in the field of AI and automation engineering.",
    keywords: ["Experience", "Career", "Professional", "Roles"],
  },
  education: {
    title: "Education",
    description: "My educational background, degrees, and academic achievements in technology and engineering.",
    keywords: ["Education", "Degrees", "Academic", "Background"],
  },
  certifications: {
    title: "Certifications",
    description: "Professional certifications and achievements in AI, automation, and related technologies.",
    keywords: ["Certifications", "Achievements", "Professional", "Skills"],
  },
  skills: {
    title: "Skills",
    description: "Technical skills, programming languages, frameworks, and tools I use in AI and automation projects.",
    keywords: ["Skills", "Technologies", "Programming", "Tools"],
  },
  projects: {
    title: "Projects",
    description: "Showcase of my projects in AI, automation, and software development. From concept to implementation.",
    keywords: ["Projects", "Portfolio", "Showcase", "Development"],
  },
};

export const structuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: ["Hassan Nazir AI Engineer", "Hassan Nazir CTO", "Hassan Nazir Pakistan"],
    jobTitle: "Senior AI Engineer & CTO",
    description: siteConfig.description,
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    image: {
      "@type": "ImageObject",
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      caption: "Hassan Nazir - Senior AI Engineer & CTO"
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
        name: "Schmoozzer",
        jobTitle: "Senior AI Engineer",
        startDate: "2025-10"
      },
      {
        "@type": "Organization", 
        name: "NDT Legacy Group",
        jobTitle: "AI Automation Engineer",
        startDate: "2025-08"
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
    description: "Professional AI engineering and automation services including LLM fine-tuning, custom AI agents, and workflow automation.",
    provider: {
      "@type": "Person",
      name: siteConfig.name
    },
    areaServed: "Worldwide",
    serviceType: [
      "AI Engineering",
      "Automation Development", 
      "LLM Fine-tuning",
      "DevOps Services",
      "QA Automation"
    ]
  }
};
