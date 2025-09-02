import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon, ShareIcon, BookOpenIcon } from 'lucide-react';
import { blogPosts } from './BlogsPage';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import FloatingNav from '../components/ui/FloatingNav';
import PageTransition from '../components/ui/PageTransition';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeftIcon size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 2);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        {/* Floating Navigation */}
        <FloatingNav />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/blogs" 
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeftIcon size={20} />
              <span>Back to Blog</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ShareIcon size={20} />
              </button>
              <div className="flex items-center gap-2">
                <BookOpenIcon size={20} className="text-white" />
                <span className="font-semibold">Blog</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Header */}
      <article className="pt-24 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex items-center gap-6 mb-8 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-2">
                <CalendarIcon size={16} />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon size={16} />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <TagIcon size={16} />
                <span className="px-3 py-1 bg-gray-900/50 rounded-full text-xs">
                  {post.category}
                </span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 leading-relaxed mb-12 border-l-4 border-gray-700 pl-6 italic">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-12">
              {post.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-full text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl border border-gray-800/50"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code 
                        className="bg-gray-900/50 px-2 py-1 rounded text-gray-300 font-mono text-sm border border-gray-800/50" 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-12 mb-6 text-white border-b border-gray-800/50 pb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mt-10 mb-5 text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-300 leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-600 pl-6 italic text-gray-400 my-6 bg-gray-900/30 py-4 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      className="text-white underline hover:text-gray-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-gray-300 italic">
                      {children}
                    </em>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Author Bio */}
            <div className="mt-16 pt-8 border-t border-gray-800/50">
              <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-gray-800 flex items-center justify-center text-white font-bold text-xl border-2 border-gray-700">
                    HN
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Hassan Nazir</h3>
                    <p className="text-gray-400 mb-4">AI & Automation Engineer</p>
                    <p className="text-gray-300 leading-relaxed">
                      Passionate about building intelligent automation systems and exploring the intersection 
                      of AI and cybersecurity. With extensive experience in cloud infrastructure, DevOps, and 
                      machine learning, I help organizations leverage AI to solve complex challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 text-white">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blogs/${relatedPost.slug}`}
                      className="group bg-gray-900/30 border border-gray-800/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                        <span className="px-2 py-1 bg-gray-900/50 rounded-md text-xs">
                          {relatedPost.category}
                        </span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors mb-3">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800/50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Enjoyed this article?
              </h3>
              <p className="text-gray-300 mb-6">
                Let's discuss how AI and automation can transform your business processes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/#contact"
                  className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Get In Touch
                </Link>
                <Link 
                  to="/blogs"
                  className="px-6 py-3 bg-gray-900/50 text-white font-semibold rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
