export const siteConfig = {
  name: "Hassan Nazir",
  title: "Hassan Nazir - AI & Automation Engineer",
  description: "AI & Automation Engineer specializing in machine learning, process automation, and innovative technology solutions. Building the future with intelligent systems.",
  url: "https://hassannazir.dev",
  ogImage: "https://hassannazir.dev/images/profile.png",
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
    "AI Engineer",
    "Automation Engineer", 
    "Machine Learning",
    "Process Automation",
    "Artificial Intelligence",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "TypeScript",
    "Python",
    "Automation",
    "Portfolio",
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
    title: "Hassan Nazir - AI & Automation Engineer",
    description: "AI & Automation Engineer specializing in machine learning, process automation, and innovative technology solutions. Building the future with intelligent systems.",
    keywords: ["AI Engineer", "Automation Engineer", "Machine Learning", "Portfolio"],
  },
  work: {
    title: "Work Experience",
    description: "Explore my professional journey, projects, and achievements in AI, automation, and software engineering.",
    keywords: ["Work Experience", "Projects", "Career", "Professional"],
  },
  blogs: {
    title: "Blog Posts",
    description: "Insights, tutorials, and thoughts on AI, automation, and technology. Sharing knowledge and experiences.",
    keywords: ["Blog", "Articles", "AI", "Technology", "Tutorials"],
  },
  contact: {
    title: "Contact Me",
    description: "Get in touch with me for collaborations, opportunities, or just to say hello. Let's build something amazing together.",
    keywords: ["Contact", "Get in Touch", "Collaboration", "Opportunities"],
  },
  about: {
    title: "About Me",
    description: "Learn more about my background, passion for technology, and journey in AI and automation engineering.",
    keywords: ["About", "Background", "Story", "Journey"],
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
    jobTitle: "AI & Automation Engineer",
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Process Automation",
      "Software Engineering",
      "Full Stack Development",
      "React",
      "TypeScript",
      "Python",
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
};
