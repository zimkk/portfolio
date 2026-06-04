import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig, defaultMetadata, pageMetadata, structuredData } from '../../config/metadata';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  page?: keyof typeof pageMetadata;
  noindex?: boolean;
  /** ISO date for articles — helps crawlers and AI agents get fresh content */
  publishedTime?: string;
  /** ISO date for articles */
  modifiedTime?: string;
  /** Page-specific structured data (e.g. BlogPosting) */
  jsonLd?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  page,
  noindex = false,
  publishedTime,
  modifiedTime,
  jsonLd,
}) => {
  // Get page-specific metadata if page is provided
  const pageMeta = page ? pageMetadata[page] : null;
  
  // Use provided values or fall back to defaults
  const finalTitle = title || pageMeta?.title || defaultMetadata.title.default;
  const finalDescription = description || pageMeta?.description || defaultMetadata.description;
  const finalKeywords = [...(pageMeta?.keywords || []), ...keywords, ...defaultMetadata.keywords];
  const finalImage = image || defaultMetadata.openGraph.images[0].url;
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const finalUrl = url || (pathname ? `${siteConfig.url}${pathname}` : siteConfig.url);

  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="author" content={defaultMetadata.creator} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      {/* Hint for crawlers and AI agents: content freshness */}
      {(siteConfig as { lastUpdated?: string }).lastUpdated && (
        <meta name="updated" content={(siteConfig as { lastUpdated: string }).lastUpdated} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={siteConfig.name} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={siteConfig.name} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:creator" content={defaultMetadata.twitter.creator} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
      
      {/* Performance Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="PK-IS" />
      <meta name="geo.country" content="PK" />
      <meta name="ICBM" content="33.6844, 73.0479" />
      <meta name="geo.position" content="33.6844;73.0479" />
      <meta name="geo.placename" content="Islamabad, Pakistan" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData.person)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(structuredData.website)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(structuredData.professionalService)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(structuredData.breadcrumb)}
      </script>
      {jsonLdList.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <link rel="apple-touch-icon" href="/images/profile.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://app.cal.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://api.github.com" />
      <link rel="dns-prefetch" href="https://linkedin.com" />

      {/* AI crawler resources */}
      <link type="text/plain" rel="author" href="/humans.txt" />
      <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt - AI-readable site summary" />
      <link rel="alternate" type="text/plain" href="/llm.txt" title="LLM.txt - AI-readable site summary" />
    </Helmet>
  );
};

export default SEOHead;
