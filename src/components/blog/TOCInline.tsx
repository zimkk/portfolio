import React from 'react';
import { ListOrdered } from 'lucide-react';

export interface TOCHeading {
  value: string;
  depth: number;
  url: string;
}

interface TOCInlineProps {
  headings: TOCHeading[];
  className?: string;
}

export const extractHeadingsFromMarkdown = (markdown: string): TOCHeading[] => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCHeading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const value = match[2].trim().replace(/[*_`]/g, '');
    const url = '#' + value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    headings.push({ value, depth, url });
  }

  return headings;
};

export const TOCInline: React.FC<TOCInlineProps> = ({ headings, className = '' }) => {
  if (!headings || headings.length === 0) return null;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const id = url.replace(/^#/, '');
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -90;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className={`my-6 rounded-xl border border-white/10 bg-[#111319]/70 p-5 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#7f8794]">
        <ListOrdered className="h-4 w-4 text-[#ff5d3d]" />
        <span>Table of Contents</span>
      </div>

      <ul className="mt-3.5 space-y-2 text-xs">
        {headings.map((heading) => (
          <li
            key={heading.url + heading.value}
            style={{ paddingLeft: `${(heading.depth - 2) * 0.75}rem` }}
          >
            <a
              href={heading.url}
              onClick={(e) => handleScrollTo(e, heading.url)}
              className="group flex items-center gap-2 text-[#aab3c2] transition hover:text-[#ff5d3d]"
            >
              <span className="h-1 w-1 rounded-full bg-[#7f8794] transition group-hover:bg-[#ff5d3d]" />
              <span className="truncate">{heading.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOCInline;
