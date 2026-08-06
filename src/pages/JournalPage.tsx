import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import EditorialNav from '../components/ui/EditorialNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { schemaIds, siteConfig } from '../config/metadata';
import { blogPosts } from './BlogsPage';

const JournalPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All writing');
  const categories = ['All writing', ...Array.from(new Set(blogPosts.map((post) => post.category)))];
  const posts = selectedCategory === 'All writing' ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory);
  const lead = posts[0];
  const remaining = posts.slice(1);
  const articlesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Applied AI and engineering field notes by Hassan Nazir',
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
      <main className="route-shell journal-shell overflow-x-hidden w-full max-w-full">
        <EditorialNav />
        <section className="journal-hero">
          <p>Research notes and implementation guides from applied AI and security work.</p>
          <h1>Writing for the second-order detail.</h1>
        </section>
        <div className="archive-filters journal-filters" role="group" aria-label="Filter writing">
          {categories.map((category) => <button type="button" key={category} onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category}>{category}</button>)}
        </div>

        {lead && (
          <Link to={'/blogs/' + lead.slug} className="lead-article group">
            <div className="lead-image"><img src={lead.image} alt={`${lead.title} — article cover`} /></div>
            <div><p>{lead.category} · {lead.readTime}</p><h2>{lead.title}</h2><p>{lead.excerpt}</p><span>Read the article <ArrowUpRight size={16} /></span></div>
          </Link>
        )}

        <section className="journal-list">
          {remaining.map((post) => (
            <Link key={post.id} to={'/blogs/' + post.slug}>
              <div><span>{post.category}</span><span>{post.readTime}</span></div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </section>
        <footer className="route-footer"><Link to="/">Hassan Nazir</Link><p>Applied AI, security, and production engineering.</p><a href="/#contact">Discuss a system</a></footer>
      </main>
    </PageTransition>
  );
};

export default JournalPage;
