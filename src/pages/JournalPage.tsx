import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, ArrowRight, Tag as TagIcon, Clock, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import EditorialNav from '../components/ui/EditorialNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { schemaIds, siteConfig } from '../config/metadata';
import { blogPosts } from './BlogsPage';

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
      <SEOHead page="blogs" jsonLd={articlesSchema} />
      <main className="min-h-screen bg-[#08090c] text-[#d9dee8] selection:bg-[#ff5d3d] selection:text-[#08090c]">
        <EditorialNav />

        {/* Hero Section */}
        <div className="mx-auto max-w-6xl px-4 pt-32 pb-8 sm:px-6 lg:px-8">
          <div className="border-b border-white/10 pb-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#ff5d3d] uppercase">
                Engineering Field Notes &amp; Production Architectures
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl font-['Satoshi']">
                Blogs
              </h1>
              <p className="mt-2 max-w-3xl text-base text-[#7f8794] sm:text-lg leading-relaxed">
                Technical field notes and implementation guides on enterprise AI automations, autonomous multi-agent systems, full-stack software development, and cloud security.
              </p>
            </div>

            {/* Top Search Input */}
            <div className="relative mt-8 max-w-xl">
              <label htmlFor="search-articles" className="sr-only">
                Search articles
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-[#7f8794]" />
              </div>
              <input
                id="search-articles"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search articles by title, topic, or keyword..."
                className="block w-full rounded-xl border border-white/10 bg-[#111319] py-3 pr-10 pl-10 text-sm text-[#d9dee8] placeholder-[#7f8794] transition-all focus:border-[#ff5d3d] focus:bg-[#111319] focus:ring-1 focus:ring-[#ff5d3d] focus:outline-none font-['Satoshi']"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search query"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#7f8794] hover:text-[#d9dee8]"
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
              <div className="sticky top-28 rounded-2xl border border-white/10 bg-[#111319]/80 p-5 backdrop-blur-md shadow-xl">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#7f8794] uppercase">
                    <TagIcon className="h-3.5 w-3.5 text-[#ff5d3d]" />
                    Filter by Topic
                  </h2>
                  {activeTag !== 'ALL' && (
                    <button
                      onClick={() => handleTagSelect('ALL')}
                      className="font-mono text-xs text-[#ff5d3d] hover:underline"
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
                      className="w-full rounded-lg border border-white/10 bg-[#08090c] px-3 py-1.5 text-xs text-[#d9dee8] placeholder-[#7f8794] focus:border-[#ff5d3d] focus:outline-none font-mono"
                    />
                  </div>
                )}

                {/* All Writing Button */}
                <button
                  onClick={() => handleTagSelect('ALL')}
                  className={`mb-2 flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium transition-colors w-full text-left font-mono ${
                    activeTag === 'ALL'
                      ? 'bg-[#ff5d3d] text-[#08090c] font-bold shadow-md'
                      : 'text-[#aab3c2] hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <span>All Writing</span>
                  <span className={`text-[11px] font-mono ${activeTag === 'ALL' ? 'text-[#08090c]' : 'text-[#7f8794]'}`}>
                    ({blogPosts.length})
                  </span>
                </button>

                {/* Fixed Max-Height Scrollable Tag List */}
                <div className="max-h-[320px] overflow-y-auto pr-1.5 space-y-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                  {filteredTags.length === 0 ? (
                    <div className="py-4 text-center text-xs text-[#7f8794] font-mono">
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
                              ? 'bg-[#ff5d3d] text-[#08090c] font-bold shadow-md'
                              : 'text-[#aab3c2] hover:bg-white/5 hover:text-white border border-transparent'
                          }`}
                        >
                          <span className="truncate">{tag}</span>
                          <span className={`ml-2 text-[11px] font-mono shrink-0 ${isSelected ? 'text-[#08090c]' : 'text-[#7f8794]'}`}>
                            ({tagCounts[tag]})
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Active Filter Footer inside sidebar */}
                {activeTag !== 'ALL' && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#7f8794]">
                    <span>Active: <strong className="text-[#ff5d3d]">{activeTag}</strong></span>
                    <button onClick={() => handleTagSelect('ALL')} className="hover:text-white underline">
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* Articles List */}
            <div className="flex-1 min-w-0">
              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center bg-[#111319]/40">
                  <p className="text-base text-[#7f8794]">
                    No articles found matching &ldquo;{searchQuery}&rdquo; {activeTag !== 'ALL' && `under ${activeTag}`}.
                  </p>
                  <button
                    onClick={() => {
                      clearSearch();
                      handleTagSelect('ALL');
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111319] px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {currentDisplayPosts.map((post) => (
                    <article key={post.id} className="py-8 first:pt-0 group">
                      <div className="space-y-3.5">
                        {/* Meta: Date & Read Time */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#7f8794] font-mono">
                          <time dateTime={post.publishedAt} className="flex items-center gap-1.5 text-[#aab3c2]">
                            <Calendar className="h-3.5 w-3.5 text-[#7f8794]" />
                            {formatDate(post.publishedAt)}
                          </time>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 text-[#aab3c2]">
                            <Clock className="h-3.5 w-3.5 text-[#7f8794]" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span className="rounded-md bg-[#ff5d3d]/10 border border-[#ff5d3d]/20 px-2.5 py-0.5 text-[11px] text-[#ff5d3d] font-mono uppercase tracking-wider font-semibold">
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#ff5d3d] sm:text-3xl font-['Satoshi'] leading-snug">
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
                              className="rounded-lg bg-[#111319] border border-white/10 px-2.5 py-1 text-xs font-mono text-[#aab3c2] transition hover:border-[#ff5d3d]/40 hover:text-[#ff5d3d]"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>

                        {/* Excerpt */}
                        <p className="text-sm leading-relaxed text-[#7f8794] line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="pt-2">
                          <Link
                            to={`/blogs/${post.slug}`}
                            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#ff5d3d] transition group-hover:translate-x-1"
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
                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111319] px-4 py-2 text-xs font-mono font-medium text-[#d9dee8] transition hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <span className="font-mono text-xs text-[#7f8794]">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 150, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111319] px-4 py-2 text-xs font-mono font-medium text-[#d9dee8] transition hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
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
        <footer className="mt-20 border-t border-white/10 bg-[#08090c] py-12 text-center text-xs text-[#7f8794]">
          <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-white">Hassan Nazir</strong>
              <p className="mt-0.5 text-[#7f8794]">Forward Deployed Engineer · Applied AI</p>
            </div>
            <div className="flex items-center gap-6 font-mono">
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

export default JournalPage;
