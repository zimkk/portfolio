import React from 'react';
import EditorialNav from '../components/ui/EditorialNav';
import PageTransition from '../components/ui/PageTransition';
import SEOHead from '../components/ui/SEOHead';
import { blogPosts as allPosts, BlogPost } from '../data/blogs';

export type { BlogPost };
export const blogPosts = allPosts;

const BlogsPage: React.FC = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Applied AI & Software Engineering Blogs | Hassan Nazir"
        description="Technical field notes, system architectures, and deep dives on AI automations, agentic systems, security, and full-stack software development by Forward Deployed Engineer Hassan Nazir."
      />
      <main className="min-h-screen bg-[#08090c] text-[#d9dee8]">
        <EditorialNav />
      </main>
    </PageTransition>
  );
};

export default BlogsPage;
