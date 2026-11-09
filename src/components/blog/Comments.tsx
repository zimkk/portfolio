import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Github, User, Send, CheckCircle2, Clock } from 'lucide-react';

interface CommentsProps {
  slug: string;
}

interface LocalComment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  avatarSeed: string;
}

export const Comments: React.FC<CommentsProps> = ({ slug }) => {
  const [commentMode, setCommentMode] = useState<'guest' | 'github'>('guest');
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const giscusContainerRef = useRef<HTMLDivElement>(null);

  const storageKey = `comments_blog_${slug}`;

  // Load existing guest comments for this article from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setComments(JSON.parse(stored));
      } else {
        setComments([]);
      }
    } catch {
      setComments([]);
    }
  }, [slug, storageKey]);

  // Handle Giscus script injection when GitHub mode is selected
  useEffect(() => {
    if (commentMode !== 'github' || !giscusContainerRef.current) return;

    // Clean any prior script instance
    giscusContainerRef.current.innerHTML = '';

    const repo = import.meta.env.VITE_GISCUS_REPO || 'zimkk/portfolio';
    const repoId = import.meta.env.VITE_GISCUS_REPO_ID || 'R_kgDONjA9-w';
    const category = import.meta.env.VITE_GISCUS_CATEGORY || 'General';
    const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID || 'DIC_kwDONjA9-84Cll0V';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', document.documentElement.dataset.theme === 'dark' ? 'transparent_dark' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    giscusContainerRef.current.appendChild(script);
  }, [commentMode, slug]);

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setIsSubmitting(true);

    const newComment: LocalComment = {
      id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      author: authorName.trim(),
      email: authorEmail.trim(),
      content: commentText.trim(),
      createdAt: new Date().toISOString(),
      avatarSeed: authorName.trim().charAt(0).toUpperCase(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save comment to local storage:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setCommentText('');

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  const formatCommentDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <section className="mt-16 border-t border-[var(--line)] pt-10" id="comments">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--fg-3)]">
            <MessageSquare className="h-4 w-4 text-[var(--accent-text)]" />
            <span>Discussion &amp; Community Feedback</span>
          </h3>
          <p className="mt-1 text-xs text-[var(--fg-2)]">
            Join the conversation. Choose your preferred way to comment:
          </p>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="inline-flex rounded-xl border border-[var(--line)] bg-[var(--tint)] p-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setCommentMode('guest')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
              commentMode === 'guest'
                ? 'bg-[#2F5BFF] text-white font-bold shadow-md'
                : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Direct Comment</span>
          </button>
          <button
            type="button"
            onClick={() => setCommentMode('github')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
              commentMode === 'github'
                ? 'bg-[#2F5BFF] text-white font-bold shadow-md'
                : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
            }`}
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Login</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Direct / Guest Comment Form & Stream */}
      {commentMode === 'guest' && (
        <div className="space-y-8">
          <form
            onSubmit={handleGuestSubmit}
            className="rounded-2xl border border-[var(--line)] bg-[var(--tint)] p-5 sm:p-6 backdrop-blur-sm"
          >
            <h4 className="font-['Satoshi'] text-base font-semibold text-[var(--fg)] mb-4">
              Leave a response
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="comment-name"
                  className="block font-mono text-xs font-medium text-[var(--fg-2)] mb-1.5"
                >
                  Name <span className="text-[var(--accent-text)]">*</span>
                </label>
                <input
                  id="comment-name"
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--fg-body)] placeholder-[var(--fg-3)] focus:border-[#2F5BFF] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="comment-email"
                  className="block font-mono text-xs font-medium text-[var(--fg-2)] mb-1.5"
                >
                  Email <span className="text-[var(--fg-3)] font-normal">(Optional · Private)</span>
                </label>
                <input
                  id="comment-email"
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--fg-body)] placeholder-[var(--fg-3)] focus:border-[#2F5BFF] focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="comment-text"
                className="block font-mono text-xs font-medium text-[var(--fg-2)] mb-1.5"
              >
                Your Insight or Question <span className="text-[var(--accent-text)]">*</span>
              </label>
              <textarea
                id="comment-text"
                required
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your technical experience, edge cases, or feedback on this architecture..."
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] p-3.5 text-sm text-[var(--fg-body)] placeholder-[var(--fg-3)] focus:border-[#2F5BFF] focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[var(--fg-3)] font-mono">
                Markdown supported. Comments appear immediately.
              </span>

              <div className="flex items-center gap-3">
                {isSuccess && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Comment posted!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !authorName.trim() || !commentText.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2F5BFF] px-5 py-2.5 text-xs font-mono font-bold text-white transition hover:bg-[#1E46E8] disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* List of Direct Comments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <span className="font-mono text-xs text-[var(--fg-2)] uppercase tracking-wider">
                {comments.length} {comments.length === 1 ? 'Response' : 'Responses'}
              </span>
            </div>

            {comments.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[var(--line)] p-8 text-center bg-[var(--tint)]">
                <p className="text-xs text-[var(--fg-3)] font-mono">
                  No direct comments yet. Be the first to start the discussion!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--line)]">
                {comments.map((comm) => (
                  <div key={comm.id} className="py-5 space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-[#2F5BFF]/20 border border-[#2F5BFF]/40 flex items-center justify-center font-mono text-xs font-bold text-[var(--accent-text)]">
                          {comm.avatarSeed}
                        </div>
                        <strong className="text-sm font-semibold text-[var(--fg)] font-['Satoshi']">
                          {comm.author}
                        </strong>
                      </div>

                      <time className="flex items-center gap-1 font-mono text-[11px] text-[var(--fg-3)]">
                        <Clock className="h-3 w-3" />
                        {formatCommentDate(comm.createdAt)}
                      </time>
                    </div>

                    <p className="text-sm text-[var(--fg-body)] pl-9 leading-relaxed whitespace-pre-line">
                      {comm.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: GitHub Discussions (Giscus) */}
      {commentMode === 'github' && (
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--tint)] p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-xs font-mono text-[var(--fg-2)]">
            <Github className="h-4 w-4 text-[var(--fg)]" />
            <span>Comments synced with GitHub Discussions on zimkk/portfolio</span>
          </div>
          <div ref={giscusContainerRef} className="min-h-[160px]" />
        </div>
      )}
    </section>
  );
};

export default Comments;
