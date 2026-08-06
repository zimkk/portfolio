import React from 'react';
import { Helmet } from 'react-helmet-async';
import { breadcrumbSchema, defaultMetadata, pageMetadata, schemaIds, siteConfig, structuredData } from '../../config/metadata';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: readonly string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  page?: keyof typeof pageMetadata;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: object | object[];
}

const absoluteUrl = (value: string) => value.startsWith('http') ? value : `${siteConfig.url}${value.startsWith('/') ? value : `/${value}`}`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type,
  page,
  noindex = false,
  publishedTime,
  modifiedTime,
  jsonLd,
}) => {
  const pageMeta = page ? pageMetadata[page] : undefined;
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const finalTitle = title || pageMeta?.title || defaultMetadata.title.default;
  const finalDescription = description || pageMeta?.description || defaultMetadata.description;
  const finalKeywords = Array.from(new Set([...(pageMeta?.keywords || []), ...keywords, ...defaultMetadata.keywords]));
  const finalImage = absoluteUrl(image || defaultMetadata.openGraph.images[0].url);
  const finalUrl = url || `${siteConfig.url}${pathname === '/' ? '' : pathname.replace(/\/$/, '')}`;
  const finalType = type || (page === 'home' ? 'profile' : 'website');

  const pageSchemas: object[] = [structuredData.person, structuredData.website];
  if (page === 'home') pageSchemas.push(structuredData.profilePage, structuredData.service, structuredData.projects, structuredData.faq);
  if (page === 'work') {
    pageSchemas.push(breadcrumbSchema([
      { name: 'Home', url: siteConfig.url },
      { name: 'Work', url: `${siteConfig.url}/work` },
    ]));
  }
  if (page === 'blogs') {
    pageSchemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}/blogs#collection`,
      name: pageMetadata.blogs.title,
      description: pageMetadata.blogs.description,
      url: `${siteConfig.url}/blogs`,
      inLanguage: 'en',
      isPartOf: { '@id': schemaIds.websiteId },
      author: { '@id': schemaIds.personId },
    }, breadcrumbSchema([
      { name: 'Home', url: siteConfig.url },
      { name: 'Field notes', url: `${siteConfig.url}/blogs` },
    ]));
  }
  if (jsonLd) pageSchemas.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));

  return (
    <Helmet>
      <html lang="en" />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="author" content={siteConfig.name} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
      <meta name="date" content={modifiedTime || publishedTime || siteConfig.lastUpdated} />

      <link rel="canonical" href={finalUrl} />
      <link rel="alternate" type="text/plain" href="/llms.txt" title="AI-readable site index" />
      <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Detailed AI-readable portfolio" />
      <link rel="alternate" type="application/ld+json" href="/portfolio.json" title="Structured portfolio data" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Hassan Nazir engineering field notes" />

      <meta property="og:type" content={finalType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:alt" content="Hassan Nazir — Forward Deployed Engineer and Applied AI" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {finalType === 'article' && <meta property="article:author" content={siteConfig.name} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content="Hassan Nazir — Forward Deployed Engineer and Applied AI" />
      <meta name="twitter:creator" content={defaultMetadata.twitter.creator} />

      <meta name="theme-color" content="#08090c" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="geo.region" content="PK-IS" />
      <meta name="geo.placename" content="Islamabad, Pakistan" />
      <meta name="geo.position" content="33.6844;73.0479" />
      <meta name="ICBM" content="33.6844, 73.0479" />

      <link rel="icon" type="image/png" href="/images/profile.png" />
      <link rel="apple-touch-icon" href="/images/profile.png" />
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {pageSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
