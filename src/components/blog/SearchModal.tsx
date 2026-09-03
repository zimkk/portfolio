import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Briefcase, ArrowRight, CornerDownLeft } from 'lucide-react';
import { blogPosts } from '../../pages/BlogsPage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Search results combining blog posts & services
  const results = React.useMemo(() => {
    if (!query.trim()) {
      return blogPosts.slice(0, 5).map((post) => ({
        type: 'blog',
        title: post.title,
        subtitle: `${post.category} • ${post.readTime}`,
        url: `/blogs/${post.slug}`,
      }));
    }

    const q = query.toLowerCase();
    const matches: Array<{ type: string; title: string; subtitle: string; url: string }> = [];

    blogPosts.forEach((post) => {
      if (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q)
      ) {
        matches.push({
          type: 'blog',
          title: post.title,
          subtitle: `${post.category} • ${post.readTime}`,
          url: `/blogs/${post.slug}`,
        });
      }
    });

    const services = [
      { name: 'Forward Deployed Engineering', slug: 'forward-deployed-engineer' },
      { name: 'AI Automations & n8n Consulting', slug: 'n8n-automation-consultant' },
      { name: 'Full-Stack Software Development', slug: 'full-stack-software-development' },
      { name: 'AI Agent & RAG Development', slug: 'ai-agent-development' },
      { name: 'Applied AI Consulting', slug: 'applied-ai-consulting' },
    ];

    services.forEach((s) => {
      if (s.name.toLowerCase().includes(q)) {
        matches.push({
          type: 'service',
          title: s.name,
          subtitle: 'Commercial Engineering Service',
          url: `/services/${s.slug}`,
        });
      }
    });

    return matches;
  }, [query]);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f14] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 px-4 py-3.5 bg-[#111319]">
          <Search className="h-5 w-5 text-[#7f8794]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search writing, topics, services... (Press ESC to exit)"
            className="w-full bg-transparent pl-3 pr-8 text-sm text-[#d9dee8] placeholder-[#7f8794] focus:outline-none font-['Satoshi']"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#7f8794] hover:text-white"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#7f8794]">
              No matching results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono font-semibold tracking-wider text-[#7f8794] uppercase">
                {query.trim() ? 'Search Results' : 'Recent & Recommended'}
              </div>
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                const Icon = item.type === 'service' ? Briefcase : FileText;

                return (
                  <button
                    key={item.url}
                    onClick={() => {
                      navigate(item.url);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition ${
                      isSelected
                        ? 'bg-white/10 text-white'
                        : 'text-[#d9dee8] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`rounded-lg p-2 ${
                          isSelected
                            ? 'bg-[#ff5d3d]/20 text-[#ff5d3d]'
                            : 'bg-[#111319] text-[#7f8794]'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <strong className="block truncate text-sm font-medium font-['Satoshi']">
                          {item.title}
                        </strong>
                        <span className="block truncate text-xs text-[#7f8794] font-mono">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-3 text-[#7f8794]">
                      {isSelected && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#ff5d3d]">
                          <span>Select</span>
                          <CornerDownLeft className="h-3 w-3" />
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 opacity-70" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#08090c] px-4 py-2.5 text-[11px] font-mono text-[#7f8794]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-white/10 bg-[#111319] px-1 py-0.5 text-[10px] text-[#d9dee8]">↑</kbd>
              <kbd className="ml-1 rounded border border-white/10 bg-[#111319] px-1 py-0.5 text-[10px] text-[#d9dee8]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="rounded border border-white/10 bg-[#111319] px-1.5 py-0.5 text-[10px] text-[#d9dee8]">ESC</kbd> to close
            </span>
          </div>
          <span className="text-[#ff5d3d]">Hassan Nazir · Search Index</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
