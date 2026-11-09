import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, ArrowRight, Tag as TagIcon, Clock, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { SiteFooter, StandaloneNav } from '../components/hn/chrome';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { schemaIds, siteConfig } from '../config/metadata';
import { blogPosts } from '../data/blogs';

const POSTS_PER_PAGE = 5;

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const JournalPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag') || 'ALL';
  const [searchQuery, setSearchQuery] = useState('');
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Compute tag counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, []);

  const sortedTags = useMemo(() => {
    return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
  }, [tagCounts]);

  const filteredTags = useMemo(() => {
    if (!tagSearchQuery.trim()) return sortedTags;
    return sortedTags.filter((t) => t.toLowerCase().includes(tagSearchQuery.toLowerCase()));
  }, [sortedTags, tagSearchQuery]);

  // Filter posts based on activeTag and searchQuery
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesTag =
        activeTag === 'ALL' ||
        post.tags.some((t) => slugify(t) === slugify(activeTag)) ||
        slugify(post.category) === slugify(activeTag);

      if (!matchesTag) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const tagMatch = post.tags.some((t) => t.toLowerCase().includes(query));
      const categoryMatch = post.category.toLowerCase().includes(query);

      return titleMatch || excerptMatch || tagMatch || categoryMatch;
    });
  }, [activeTag, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const currentDisplayPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleTagSelect = (tag: string) => {
    if (tag === 'ALL') {
      searchParams.delete('tag');
    } else {
      searchParams.set('tag', slugify(tag));
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const articlesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Applied AI and engineering blogs by Hassan Nazir',
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${siteConfig.url}/blogs/${post.slug}`,
        datePublished: `${post.publishedAt}T00:00:00Z`,
        author: { '@id': schemaIds.personId },
      },
    })),
  };

  return (
    <PageTransition>
      <SEOHead page="blogs" image="/images/og/blogs.jpg" jsonLd={articlesSchema} />
      <main className="min-h-screen bg-[var(--bg)] text-[var(--fg-body)] selection:bg-[#2F5BFF] selection:text-white">
        <StandaloneNav />

        {/* Hero Section */}
        <div className="mx-auto max-w-6xl px-4 pt-32 pb-8 sm:px-6 lg:px-8">
          <div className="border-b border-[var(--line)] pb-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-text)] uppercase">
                Engineering Field Notes &amp; Production Architectures
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-[var(--fg)] sm:text-5xl md:text-6xl font-['Satoshi']">
                Blogs
              </h1>
              <p className="mt-2 max-w-3xl text-base text-[var(--fg-3)] sm:text-lg leading-relaxed">
                Technical field notes and implementation guides on enterprise AI automations, autonomous multi-agent systems, full-stack software development, and cloud security.
              </p>
            </div>

            {/* Top Search Input */}
            <div className="relative mt-8 max-w-xl">
              <label htmlFor="search-articles" className="sr-only">
                Search articles
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-[var(--fg-3)]" />
              </div>
              <input
                id="search-articles"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search articles by title, topic, or keyword..."
                className="block w-full rounded-xl border border-[var(--line)] bg-[var(--tint)] py-3 pr-10 pl-10 text-sm text-[var(--fg-body)] placeholder-[var(--fg-3)] transition-all focus:border-[#2F5BFF] focus:bg-[var(--tint)] focus:ring-1 focus:ring-[#2F5BFF] focus:outline-none font-['Satoshi']"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search query"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--fg-3)] hover:text-[var(--fg-body)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Main 2-Column Layout: Compact Scrollable Sidebar + Articles */}
          <div className="mt-10 flex flex-col lg:flex-row lg:gap-12">
            {/* Compact Static Sidebar Container with Internal Scrollable List */}
            <aside className="mb-8 w-full shrink-0 lg:mb-0 lg:w-72">
              <div className="sticky top-28 rounded-2xl border border-[var(--line)] bg-[var(--tint)] p-5 backdrop-blur-md shadow-xl">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <h2 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[var(--fg-3)] uppercase">
                    <TagIcon className="h-3.5 w-3.5 text-[var(--accent-text)]" />
                    Filter by Topic
                  </h2>
                  {activeTag !== 'ALL' && (
                    <button
                      onClick={() => handleTagSelect('ALL')}
                      className="font-mono text-xs text-[var(--accent-text)] hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Quick Filter Search inside Sidebar */}
                {sortedTags.length > 8 && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={tagSearchQuery}
                      onChange={(e) => setTagSearchQuery(e.target.value)}
                      placeholder="Quick filter topics..."
                      className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5 text-xs text-[var(--fg-body)] placeholder-[var(--fg-3)] focus:border-[#2F5BFF] focus:outline-none font-mono"
                    />
                  </div>
                )}

                {/* All Writing Button */}
                <button
                  onClick={() => handleTagSelect('ALL')}
                  className={`mb-2 flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium transition-colors w-full text-left font-mono ${
                    activeTag === 'ALL'
                      ? 'bg-[#2F5BFF] text-white font-bold shadow-md'
                      : 'text-[var(--fg-2)] hover:bg-[var(--hover)] hover:text-[var(--fg)] border border-transparent'
                  }`}
                >
                  <span>All Writing</span>
                  <span className={`text-[11px] font-mono ${activeTag === 'ALL' ? 'text-white' : 'text-[var(--fg-3)]'}`}>
                    ({blogPosts.length})
                  </span>
                </button>

                {/* Fixed Max-Height Scrollable Tag List */}
                <div className="max-h-[320px] overflow-y-auto pr-1.5 space-y-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                  {filteredTags.length === 0 ? (
                    <div className="py-4 text-center text-xs text-[var(--fg-3)] font-mono">
                      No matching topics
                    </div>
                  ) : (
                    filteredTags.map((tag) => {
                      const isSelected = slugify(activeTag) === slugify(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => handleTagSelect(tag)}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium transition-colors w-full text-left font-mono ${
                            isSelected
                              ? 'bg-[#2F5BFF] text-white font-bold shadow-md'
                              : 'text-[var(--fg-2)] hover:bg-[var(--hover)] hover:text-[var(--fg)] border border-transparent'
                          }`}
                        >
                          <span className="truncate">{tag}</span>
                          <span className={`ml-2 text-[11px] font-mono shrink-0 ${isSelected ? 'text-white' : 'text-[var(--fg-3)]'}`}>
                            ({tagCounts[tag]})
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Active Filter Footer inside sidebar */}
                {activeTag !== 'ALL' && (
                  <div className="mt-3 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--fg-3)]">
                    <span>Active: <strong className="text-[var(--accent-text)]">{activeTag}</strong></span>
                    <button onClick={() => handleTagSelect('ALL')} className="hover:text-[var(--fg)] underline">
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* Articles List */}
            <div className="flex-1 min-w-0">
              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--line)] p-16 text-center bg-[var(--tint)]">
                  <p className="text-base text-[var(--fg-3)]">
                    No articles found matching &ldquo;{searchQuery}&rdquo; {activeTag !== 'ALL' && `under ${activeTag}`}.
                  </p>
                  <button
                    onClick={() => {
                      clearSearch();
                      handleTagSelect('ALL');
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--tint)] px-4 py-2 text-xs font-medium text-[var(--fg)] transition hover:bg-[var(--hover)]"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[var(--line)]">
                  {currentDisplayPosts.map((post) => (
                    <article key={post.id} className="py-8 first:pt-0 group">
                      <div className="space-y-3.5">
                        {/* Meta: Date & Read Time */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-3)] font-mono">
                          <time dateTime={post.publishedAt} className="flex items-center gap-1.5 text-[var(--fg-2)]">
                            <Calendar className="h-3.5 w-3.5 text-[var(--fg-3)]" />
                            {formatDate(post.publishedAt)}
                          </time>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 text-[var(--fg-2)]">
                            <Clock className="h-3.5 w-3.5 text-[var(--fg-3)]" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span className="rounded-md bg-[#2F5BFF]/10 border border-[#2F5BFF]/20 px-2.5 py-0.5 text-[11px] text-[var(--accent-text)] font-mono uppercase tracking-wider font-semibold">
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--accent-text)] sm:text-3xl font-['Satoshi'] leading-snug">
                          <Link to={`/blogs/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {/* Topic Pills */}
                        <div className="flex flex-wrap gap-2 pt-0.5">
                          {post.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagSelect(tag)}
                              className="rounded-lg bg-[var(--tint)] border border-[var(--line)] px-2.5 py-1 text-xs font-mono text-[var(--fg-2)] transition hover:border-[#2F5BFF]/40 hover:text-[var(--accent-text)]"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>

                        {/* Excerpt */}
                        <p className="text-sm leading-relaxed text-[var(--fg-3)] line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="pt-2">
                          <Link
                            to={`/blogs/${post.slug}`}
                            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--accent-text)] transition group-hover:translate-x-1"
                          >
                            <span>Read the article</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between border-t border-[var(--line)] pt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--tint)] px-4 py-2 text-xs font-mono font-medium text-[var(--fg-body)] transition hover:bg-[var(--hover)] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <span className="font-mono text-xs text-[var(--fg-3)]">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--tint)] px-4 py-2 text-xs font-mono font-medium text-[var(--fg-body)] transition hover:bg-[var(--hover)] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-[var(--line)] bg-[var(--bg)] py-12 text-center text-xs text-[var(--fg-3)]">
          <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-[var(--fg)]">Hassan Nazir</strong>
              <p className="mt-0.5 text-[var(--fg-3)]">Forward Deployed Engineer · Applied AI</p>
            </div>
            <div className="flex items-center gap-6 font-mono">
              <Link to="/" className="hover:text-[var(--accent-text)] transition">Home</Link>
              <Link to="/services" className="hover:text-[var(--accent-text)] transition">Services</Link>
              <Link to="/blogs" className="text-[var(--accent-text)] font-medium">Blogs</Link>
              <a href="/#contact" className="hover:text-[var(--accent-text)] transition">Contact</a>
            </div>
          </div>
        </footer>
        <SiteFooter />
      </main>
    </PageTransition>
  );
};

export default JournalPage;
