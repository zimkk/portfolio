import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';

interface CodeBlockProps {
  className?: string;
  children?: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const rawString = String(children || '').replace(/\n$/, '');
  const match = /language-([\w-]+)/.exec(className || '');
  
  let language = match ? match[1] : 'text';
  let title = '';

  // Extract title if formatted as language:filename (e.g., ts:src/index.ts or python:model.py)
  if (language.includes(':')) {
    const parts = language.split(':');
    language = parts[0];
    title = parts.slice(1).join(':');
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(rawString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-white/10 bg-[#0e1117] shadow-2xl">
      {/* Top Titlebar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#111319] px-4 py-2 text-xs font-mono text-[#7f8794]">
        <div className="flex items-center gap-2">
          {title ? (
            <>
              <FileCode className="h-3.5 w-3.5 text-[#ff5d3d]" />
              <span className="font-semibold text-white">{title}</span>
              <span className="text-[10px] text-[#7f8794] uppercase font-mono">({language})</span>
            </>
          ) : (
            <>
              <Terminal className="h-3.5 w-3.5 text-[#7f8794]" />
              <span className="font-semibold uppercase tracking-wider text-[#ff5d3d]">{language}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className="hidden sm:inline-flex rounded px-2 py-0.5 text-[10px] font-mono text-[#7f8794] hover:text-[#d9dee8] transition"
            title="Toggle line numbers"
          >
            {showLineNumbers ? 'Lines: On' : 'Lines: Off'}
          </button>
          
          <button
            onClick={handleCopy}
            type="button"
            aria-label="Copy code to clipboard"
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-[#d9dee8] transition hover:border-[#ff5d3d]/50 hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="overflow-x-auto text-sm">
        <SyntaxHighlighter
          language={language || 'text'}
          style={oneDark}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#4b5563',
            userSelect: 'none',
          }}
          customStyle={{
            margin: 0,
            padding: '1.25rem 1rem',
            background: 'transparent',
            fontSize: '0.85rem',
            lineHeight: '1.65',
          }}
          wrapLongLines={false}
        >
          {rawString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
