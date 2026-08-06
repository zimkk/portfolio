import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import EditorialNav from '../components/ui/EditorialNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { breadcrumbSchema, schemaIds, siteConfig } from '../config/metadata';
import { blogPosts } from './BlogsPage';

const ArticlePage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((candidate) => candidate.slug === slug);
  if (!post) return <><SEOHead title="Article not found — Hassan Nazir" description="This article does not exist." noindex /><main className="route-shell article-missing"><EditorialNav /><h1>That article does not exist.</h1><Link to="/blogs"><ArrowLeft size={17} /> Return to writing</Link></main></>;

  const related = blogPosts.filter((candidate) => candidate.id !== post.id && candidate.category === post.category).slice(0, 2);
  const articleUrl = siteConfig.url + '/blogs/' + post.slug;
  const publishedTime = post.publishedAt + 'T00:00:00Z';
  const articleImage = post.image.startsWith('http') ? post.image : siteConfig.url + post.image;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [articleImage],
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    datePublished: publishedTime,
    dateModified: publishedTime,
    inLanguage: 'en',
    author: { '@id': schemaIds.personId },
    publisher: { '@id': schemaIds.personId },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.trim().split(/\s+/).length,
    about: post.tags.map((name) => ({ '@type': 'Thing', name })),
    isPartOf: { '@id': `${siteConfig.url}/blogs#collection` },
  };
  const articleBreadcrumbs = breadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Field notes', url: `${siteConfig.url}/blogs` },
    { name: post.title, url: articleUrl },
  ]);

  return (
    <PageTransition>
      <SEOHead title={post.title + ' | Hassan Nazir'} description={post.excerpt} keywords={post.seoKeywords || post.tags} image={post.image} url={articleUrl} type="article" publishedTime={publishedTime} modifiedTime={publishedTime} jsonLd={[articleSchema, articleBreadcrumbs]} />
      <main className="route-shell article-shell overflow-x-hidden w-full max-w-full">
        <EditorialNav />
        <article>
          <header className="article-header">
            <Link to="/blogs"><ArrowLeft size={16} /> Back to all writing</Link>
            <div><span>{post.category}</span><span>{post.readTime}</span><span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
          </header>
          <div className="article-image"><img src={post.image} alt={`${post.title} — article cover`} /></div>
          <div className="article-layout">
            <aside><p>Written by</p><strong>Hassan Nazir</strong><span>Forward Deployed Engineer · Applied AI</span><div>{post.tags.map((tag) => <i key={tag}>{tag}</i>)}</div></aside>
            <div className="article-body">
              <ReactMarkdown components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">{String(children).replace(/\n$/, '')}</SyntaxHighlighter> : <code className={className} {...props}>{children}</code>;
                },
              }}>{post.content}</ReactMarkdown>
            </div>
          </div>
        </article>
        {related.length > 0 && <section className="related-reading"><p>Continue reading</p>{related.map((item) => <Link key={item.id} to={'/blogs/' + item.slug}><span>{item.category} · {item.readTime}</span><h2>{item.title}</h2><ArrowRight size={20} /></Link>)}</section>}
      </main>
    </PageTransition>
  );
};

export default ArticlePage;
