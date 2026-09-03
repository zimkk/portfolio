import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Github,
  Twitter,
  Linkedin,
  Share2,
  Tag as TagIcon,
  BookOpen
} from 'lucide-react';
import EditorialNav from '../components/ui/EditorialNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { breadcrumbSchema, schemaIds, siteConfig } from '../config/metadata';
import { blogPosts } from './BlogsPage';
import CodeBlock from '../components/blog/CodeBlock';
import AlertBox, { AlertType } from '../components/blog/AlertBox';
import TOCInline, { extractHeadingsFromMarkdown } from '../components/blog/TOCInline';
import Comments from '../components/blog/Comments';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copiedLink, setCopiedLink] = useState(false);

  const currentIndex = blogPosts.findIndex((candidate) => candidate.slug === slug);
  const post = blogPosts[currentIndex];

  if (!post) {
    return (
      <PageTransition>
        <SEOHead title="Article not found — Hassan Nazir" description="This article does not exist." noindex />
        <main className="min-h-screen bg-[#08090c] text-[#d9dee8]">
          <EditorialNav />
          <div className="mx-auto max-w-4xl px-4 pt-40 pb-20 text-center">
            <h1 className="text-3xl font-semibold text-white sm:text-5xl font-['Satoshi']">Article not found</h1>
            <p className="mt-4 text-[#7f8794]">The requested blog post could not be located.</p>
            <Link
              to="/blogs"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111319] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all blogs
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const related = blogPosts.filter((c) => c.id !== post.id && c.category === post.category).slice(0, 2);

  // Extract Table of Contents
  const tocHeadings = useMemo(() => extractHeadingsFromMarkdown(post.content), [post.content]);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', postDateTemplate);
  const articleUrl = `${siteConfig.url}/blogs/${post.slug}`;
  const publishedTime = `${post.publishedAt}T00:00:00Z`;
  const articleImage = post.image.startsWith('http') ? post.image : `${siteConfig.url}${post.image}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

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
    author: {
      '@type': 'Person',
      name: 'Hassan Nazir',
      url: `${siteConfig.url}`,
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter],
    },
    publisher: { '@id': schemaIds.personId },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.trim().split(/\s+/).length,
    about: post.tags.map((name) => ({ '@type': 'Thing', name })),
    isPartOf: { '@id': `${siteConfig.url}/blogs#collection` },
  };

  const articleBreadcrumbs = breadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blogs', url: `${siteConfig.url}/blogs` },
    { name: post.title, url: articleUrl },
  ]);

  return (
    <PageTransition>
      <SEOHead
        title={`${post.title} | Hassan Nazir`}
        description={post.excerpt}
        keywords={post.seoKeywords || post.tags}
        image={post.image}
        url={articleUrl}
        type="article"
        publishedTime={publishedTime}
        modifiedTime={publishedTime}
        jsonLd={[articleSchema, articleBreadcrumbs]}
      />

      <main className="min-h-screen bg-[#08090c] text-[#d9dee8] selection:bg-[#ff5d3d] selection:text-[#08090c]">
        <EditorialNav />

        <div className="mx-auto max-w-5xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#ff5d3d] uppercase transition hover:text-[#ff785d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all blogs
            </Link>
          </div>

          <article>
            {/* Header / Post Meta */}
            <header className="border-b border-white/10 pb-10 text-center">
              <div className="space-y-4">
                <dl className="flex items-center justify-center gap-3 text-xs font-mono text-[#7f8794]">
                  <dt className="sr-only">Published on</dt>
                  <dd className="flex items-center gap-1.5 text-[#aab3c2]">
                    <Calendar className="h-3.5 w-3.5 text-[#7f8794]" />
                    <time dateTime={post.publishedAt}>{formattedDate}</time>
                  </dd>
                  <span>•</span>
                  <dd className="flex items-center gap-1.5 text-[#aab3c2]">
                    <Clock className="h-3.5 w-3.5 text-[#7f8794]" />
                    <span>{post.readTime}</span>
                  </dd>
                </dl>

                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight max-w-4xl mx-auto font-['Satoshi']">
                  {post.title}
                </h1>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="rounded-full border border-[#ff5d3d]/30 bg-[#ff5d3d]/10 px-3.5 py-1 text-xs font-mono font-semibold text-[#ff5d3d] uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>
            </header>

            {/* Grid Layout: Sidebar + Main Content */}
            <div className="mt-10 grid grid-cols-1 gap-12 xl:grid-cols-4">
              {/* Left Sidebar (Desktop) */}
              <aside className="xl:col-span-1 xl:border-r xl:border-white/10 xl:pr-8">
                <div className="sticky top-28 space-y-8">
                  {/* Author Box */}
                  <div>
                    <h2 className="text-xs font-mono font-semibold tracking-wider text-[#7f8794] uppercase">
                      Written By
                    </h2>
                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src="/images/profile-hero.webp"
                        alt="Hassan Nazir"
                        className="h-11 w-11 rounded-full border border-white/10 object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div>
                        <strong className="block text-sm font-semibold text-white">Hassan Nazir</strong>
                        <span className="block text-xs text-[#7f8794]">Forward Deployed Engineer</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-xs text-[#aab3c2] font-mono">
                      <a
                        href="https://github.com/zimkk"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="flex items-center gap-1.5 transition hover:text-[#ff5d3d]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                      <span>•</span>
                      <a
                        href="https://linkedin.com/in/hassannazirrr"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="flex items-center gap-1.5 transition hover:text-[#ff5d3d]"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>

                  {/* Interactive Table of Contents */}
                  {tocHeadings.length > 0 && (
                    <div className="hidden xl:block border-t border-white/10 pt-6">
                      <TOCInline headings={tocHeadings} className="my-0 bg-transparent border-0 p-0" />
                    </div>
                  )}

                  {/* Topics without hashtags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="border-t border-white/10 pt-6">
                      <h2 className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#7f8794] uppercase">
                        <TagIcon className="h-3.5 w-3.5 text-[#ff5d3d]" />
                        Topics
                      </h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            to={`/blogs?tag=${slugify(tag)}`}
                            className="rounded-lg bg-[#111319] border border-white/10 px-2.5 py-1 text-xs font-mono text-[#aab3c2] transition hover:border-[#ff5d3d]/40 hover:text-[#ff5d3d]"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Previous / Next Article in Sidebar (Desktop XL) */}
                  {(prevPost || nextPost) && (
                    <div className="hidden border-t border-white/10 pt-6 xl:block space-y-6">
                      {prevPost && (
                        <div>
                          <span className="text-[11px] font-mono font-semibold text-[#7f8794] uppercase tracking-wider">
                            ← Previous Article
                          </span>
                          <Link
                            to={`/blogs/${prevPost.slug}`}
                            className="mt-1.5 block text-xs font-medium text-[#d9dee8] hover:text-[#ff5d3d] transition line-clamp-2 leading-relaxed"
                          >
                            {prevPost.title}
                          </Link>
                        </div>
                      )}
                      {nextPost && (
                        <div>
                          <span className="text-[11px] font-mono font-semibold text-[#7f8794] uppercase tracking-wider">
                            Next Article →
                          </span>
                          <Link
                            to={`/blogs/${nextPost.slug}`}
                            className="mt-1.5 block text-xs font-medium text-[#d9dee8] hover:text-[#ff5d3d] transition line-clamp-2 leading-relaxed"
                          >
                            {nextPost.title}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Share & Actions */}
                  <div className="border-t border-white/10 pt-6">
                    <button
                      onClick={handleShare}
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#aab3c2] transition hover:text-white"
                    >
                      <Share2 className="h-3.5 w-3.5 text-[#ff5d3d]" />
                      <span>{copiedLink ? 'Link copied!' : 'Share this article'}</span>
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Content Body */}
              <div className="xl:col-span-3 min-w-0">
                {/* Cover Image */}
                {post.image && (
                  <div className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-[#111319] shadow-2xl">
                    <img
                      src={post.image}
                      alt={`${post.title} cover`}
                      className="h-auto w-full object-cover max-h-[460px]"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Mobile TOC */}
                {tocHeadings.length > 0 && (
                  <div className="block xl:hidden mb-8">
                    <TOCInline headings={tocHeadings} />
                  </div>
                )}

                {/* Markdown Content */}
                <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-headings:font-['Satoshi'] prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3 prose-h2:mt-10 prose-h3:text-xl prose-p:text-[#d9dee8] prose-p:leading-relaxed prose-p:text-base prose-a:text-[#ff5d3d] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-[#ff785d] prose-code:bg-[#111319] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-ul:my-4 prose-li:text-[#d9dee8] prose-table:border prose-table:border-white/10 prose-th:border prose-th:border-white/10 prose-th:bg-[#111319] prose-th:p-3 prose-td:border prose-td:border-white/10 prose-td:p-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      // Custom Heading Anchors with IDs
                      h2({ children, ...props }) {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        return (
                          <h2 id={id} className="group scroll-mt-24 font-['Satoshi']" {...props}>
                            <a href={`#${id}`} className="no-underline text-white hover:text-[#ff5d3d]">
                              {children}
                            </a>
                          </h2>
                        );
                      },
                      h3({ children, ...props }) {
                        const text = String(children);
                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        return (
                          <h3 id={id} className="group scroll-mt-24 font-['Satoshi']" {...props}>
                            <a href={`#${id}`} className="no-underline text-white hover:text-[#ff5d3d]">
                              {children}
                            </a>
                          </h3>
                        );
                      },

                      // Custom Blockquote / GitHub Alert Parser
                      blockquote({ children, ...props }) {
                        const rawText = React.Children.toArray(children)
                          .map((child: any) => (child?.props?.children ? String(child.props.children) : ''))
                          .join(' ');

                        const alertMatch = rawText.match(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
                        if (alertMatch) {
                          const type = alertMatch[1].toLowerCase() as AlertType;
                          return (
                            <AlertBox type={type}>
                              {React.Children.map(children, (child: any) => {
                                if (typeof child?.props?.children === 'string') {
                                  return child.props.children.replace(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/gi, '').trim();
                                }
                                return child;
                              })}
                            </AlertBox>
                          );
                        }

                        return (
                          <blockquote
                            className="my-6 border-l-2 border-[#ff5d3d] bg-[#111319]/80 py-2.5 px-4 rounded-r-lg italic text-[#d9dee8]"
                            {...props}
                          >
                            {children}
                          </blockquote>
                        );
                      },

                      // Custom Code & Codeblock Handler
                      code({ inline, className, children, ...props }: any) {
                        const codeString = String(children).replace(/\n$/, '');
                        if (!inline && (className || codeString.includes('\n'))) {
                          return <CodeBlock className={className}>{codeString}</CodeBlock>;
                        }
                        return (
                          <code className="rounded bg-[#111319] border border-white/10 px-1.5 py-0.5 font-mono text-xs text-[#ff785d]" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Post Footer Links (Discuss & GitHub) */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-mono text-[#7f8794]">
                  <div className="flex items-center gap-4">
                    <a
                      href={`https://twitter.com/search?q=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-[#ff5d3d] transition"
                    >
                      <Twitter className="h-3.5 w-3.5" />
                      <span>Discuss on Twitter / X</span>
                    </a>
                    <span>•</span>
                    <a
                      href="https://github.com/zimkk/portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-[#ff5d3d] transition"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>View on GitHub</span>
                    </a>
                  </div>

                  <Link to="/blogs" className="text-[#ff5d3d] hover:underline">
                    &larr; Back to all blogs
                  </Link>
                </div>

                {/* Mobile / Tablet Prev-Next Post navigation */}
                {(prevPost || nextPost) && (
                  <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 border-t border-white/10 pt-8 xl:hidden">
                    {prevPost && (
                      <div className="flex-1 rounded-xl border border-white/10 bg-[#111319]/70 p-4">
                        <span className="text-[11px] font-mono font-semibold text-[#7f8794] uppercase tracking-wider">
                          ← Previous Article
                        </span>
                        <Link
                          to={`/blogs/${prevPost.slug}`}
                          className="mt-1.5 block text-sm font-semibold text-white hover:text-[#ff5d3d] transition leading-snug"
                        >
                          {prevPost.title}
                        </Link>
                      </div>
                    )}
                    {nextPost && (
                      <div className="flex-1 rounded-xl border border-white/10 bg-[#111319]/70 p-4 sm:text-right">
                        <span className="text-[11px] font-mono font-semibold text-[#7f8794] uppercase tracking-wider">
                          Next Article →
                        </span>
                        <Link
                          to={`/blogs/${nextPost.slug}`}
                          className="mt-1.5 block text-sm font-semibold text-white hover:text-[#ff5d3d] transition leading-snug"
                        >
                          {nextPost.title}
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Related Articles */}
                {related.length > 0 && (
                  <div className="mt-16 border-t border-white/10 pt-10">
                    <h3 className="font-mono text-xs font-semibold tracking-wider text-[#7f8794] uppercase flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#ff5d3d]" />
                      Related Reading
                    </h3>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {related.map((item) => (
                        <Link
                          key={item.id}
                          to={`/blogs/${item.slug}`}
                          className="group rounded-xl border border-white/10 bg-[#111319]/50 p-5 transition hover:border-[#ff5d3d]/40 hover:bg-[#111319]/90 flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[11px] font-mono text-[#ff5d3d] uppercase tracking-wider">
                              {item.category} • {item.readTime}
                            </span>
                            <h4 className="mt-2 text-base font-semibold text-white transition group-hover:text-[#ff5d3d] font-['Satoshi']">
                              {item.title}
                            </h4>
                            <p className="mt-2 text-xs text-[#7f8794] line-clamp-2 leading-relaxed">
                              {item.excerpt}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#ff5d3d]">
                            <span>Read article</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments (Giscus) */}
                <Comments slug={post.slug} />
              </div>
            </div>
          </article>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 bg-[#08090c] py-12 text-center text-xs text-[#7f8794]">
          <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-white">Hassan Nazir</strong>
              <p className="mt-0.5 text-[#7f8794]">Forward Deployed Engineer · Applied AI</p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-[#ff5d3d] transition">Home</Link>
              <Link to="/services" className="hover:text-[#ff5d3d] transition">Services</Link>
              <Link to="/blogs" className="text-[#ff5d3d] font-medium">Blogs</Link>
              <a href="/#contact" className="hover:text-[#ff5d3d] transition">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </PageTransition>
  );
};

export default ArticlePage;
