import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { CALENDLY_URL, CALENDLY_WIDGET_SRC } from '../../config/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Kept for older call sites; the drawer now follows the site theme on its own. */
  tone?: 'ink' | 'paper';
}

type CalendlyApi = { initInlineWidget: (options: { url: string; parentElement: HTMLElement; resize?: boolean }) => void };
declare global {
  interface Window { Calendly?: CalendlyApi }
}

let widgetPromise: Promise<CalendlyApi> | null = null;

/** Loads Calendly's widget script once. Safe to call early (on hover) to warm it up. */
export function preloadCalendly(): Promise<CalendlyApi> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (!widgetPromise) {
    widgetPromise = new Promise<CalendlyApi>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = CALENDLY_WIDGET_SRC;
      script.async = true;
      script.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error('Calendly missing')));
      script.onerror = () => { widgetPromise = null; reject(new Error('Calendly failed to load')); };
      document.head.appendChild(script);
    });
  }
  return widgetPromise;
}

const isDark = () => document.documentElement.dataset.theme === 'dark';

/** Calendly URL with colours matched to the current theme. */
function themedUrl() {
  const dark = isDark();
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    hide_landing_page_details: '0',
    background_color: dark ? '141417' : 'ffffff',
    text_color: dark ? 'f2f2f4' : '111113',
    primary_color: '2f5bff',
  });
  return `${CALENDLY_URL}${CALENDLY_URL.includes('?') ? '&' : '?'}${params.toString()}`;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const mount = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'booked'>('loading');

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setStatus('loading');

    preloadCalendly()
      .then((calendly) => {
        if (cancelled || !mount.current) return;
        mount.current.innerHTML = '';
        calendly.initInlineWidget({ url: themedUrl(), parentElement: mount.current, resize: false });
      })
      .catch(() => !cancelled && setStatus('error'));

    // Calendly reports progress through postMessage.
    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin !== 'string' || !event.origin.includes('calendly.com')) return;
      const name = (event.data as { event?: string })?.event;
      if (name === 'calendly.event_type_viewed' || name === 'calendly.date_and_time_selected') setStatus((value) => (value === 'booked' ? value : 'ready'));
      if (name === 'calendly.event_scheduled') setStatus('booked');
    };
    // If the frame is slow to report, stop showing the loader anyway.
    const fallback = window.setTimeout(() => setStatus((value) => (value === 'loading' ? 'ready' : value)), 6000);

    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('message', onMessage);
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.removeEventListener('message', onMessage);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Book a 30 minute call with Hassan Nazir"
            className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col border-l border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] sm:w-[85%] lg:w-[48%]"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--line)] px-6 py-4">
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-neutral-900">
                  <img src="/images/profile-hero.webp" alt="" className="h-full w-full object-cover" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#2F5BFF] ring-2 ring-[var(--surface)]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold tracking-tight">Hassan Nazir</h2>
                    <span className="inline-block rounded border border-[#2F5BFF] bg-[#2F5BFF] px-1.5 font-mono text-[10px] uppercase tracking-wider text-white">30 min</span>
                  </div>
                  <p className="truncate text-xs text-[var(--fg-2)]">{status === 'booked' ? 'Booked. The invite is on its way to your inbox.' : 'Pick a time that suits you'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1 rounded-md px-2.5 py-2 text-xs text-[var(--fg-2)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)] sm:inline-flex"
                >
                  Open in Calendly <ArrowUpRight size={13} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-md p-2 text-[var(--fg-2)] transition-colors duration-200 hover:bg-[var(--hover)] hover:text-[var(--fg)]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden">
              {status === 'booked' && (
                <div className="absolute left-1/2 top-4 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#2F5BFF] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  <Check size={16} /> Booked. See you then.
                </div>
              )}
              {status === 'loading' && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-[var(--fg-3)]">
                  <span className="inline-flex items-center gap-3"><span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--line-strong)] border-t-[#2F5BFF]" /> Loading calendar</span>
                </div>
              )}
              {status === 'error' ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                  <p className="text-base font-semibold">The calendar didn't load.</p>
                  <p className="max-w-sm text-sm text-[var(--fg-2)]">It may be blocked by an extension. You can book directly on Calendly, or just email me.</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-5 py-2.5 text-sm font-bold text-[var(--btn-fg)]">Book on Calendly <ArrowUpRight size={14} /></a>
                    <a href="mailto:hassannazir955@gmail.com?subject=Booking%20a%20call" className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-5 py-2.5 text-sm font-bold">Email instead</a>
                  </div>
                </div>
              ) : (
                <div ref={mount} className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full" style={{ minWidth: 320 }} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default BookingModal;
