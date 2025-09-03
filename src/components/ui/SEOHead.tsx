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
}) => {
  // Get page-specific metadata if page is provided
  const pageMeta = page ? pageMetadata[page] : null;
  
  // Use provided values or fall back to defaults
  const finalTitle = title || pageMeta?.title || defaultMetadata.title.default;
  const finalDescription = description || pageMeta?.description || defaultMetadata.description;
  const finalKeywords = [...(pageMeta?.keywords || []), ...keywords, ...defaultMetadata.keywords];
  const finalImage = image || defaultMetadata.openGraph.images[0].url;
  const finalUrl = url || `${siteConfig.url}${window.location.pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="author" content={defaultMetadata.creator} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
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
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData.person)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(structuredData.website)}
      </script>
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <link rel="apple-touch-icon" href="/images/profile.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://app.cal.com" />
    </Helmet>
  );
};

export default SEOHead;
