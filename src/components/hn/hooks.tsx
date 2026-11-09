import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';

const loadBookingModal = () => import('../ui/BookingModal');
const BookingModal = lazy(loadBookingModal);

export type ThemePref = 'system' | 'light' | 'dark';

const readPref = (): ThemePref => {
  try {
    const stored = localStorage.getItem('hn-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    return 'system';
  }
};

function applyTheme(pref: ThemePref) {
  const dark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const root = document.documentElement;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.dataset.themePref = pref;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0B0B0D' : '#FFFFFF');
  window.dispatchEvent(new CustomEvent('hn-theme'));
}

/** Theme preference (system / light / dark). System follows the OS live; a choice is remembered. */
export function useThemePref() {
  const [pref, setPrefState] = useState<ThemePref>(() => (typeof window === 'undefined' ? 'system' : readPref()));
  useEffect(() => {
    applyTheme(pref);
    if (pref !== 'system') return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [pref]);
  const setPref = useCallback((next: ThemePref) => {
    try {
      if (next === 'system') localStorage.removeItem('hn-theme');
      else localStorage.setItem('hn-theme', next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
    setPrefState(next);
  }, []);
  return { pref, setPref };
}

/** The resolved theme actually on screen, for graphics that compute their own colours. */
export function useResolvedTheme() {
  const read = () => (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const [theme, setTheme] = useState<'light' | 'dark'>(read);
  useEffect(() => {
    const sync = () => setTheme(read());
    window.addEventListener('hn-theme', sync);
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    query.addEventListener('change', sync);
    sync();
    return () => {
      window.removeEventListener('hn-theme', sync);
      query.removeEventListener('change', sync);
    };
  }, []);
  return theme;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** True while the element is on screen (or once it has been, with `once`). */
export function useInView<T extends Element>(options: { once?: boolean; rootMargin?: string } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { once = false, rootMargin = '0px' } = options;
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) observer.disconnect();
    }, { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin]);
  return [ref, inView] as const;
}

/** Live clock for an IANA time zone, ticking every second. */
export function useClock(timeZone?: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(now);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { now, hours: get('hour') % 24, minutes: get('minute'), seconds: get('second') };
}

/** Lazy Calendly booking drawer shared by every page. Hovering a button warms up the widget. */
export function useBooking() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const openBooking = useCallback(() => {
    setReady(true);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const prefetch = useCallback(() => {
    void loadBookingModal().then((module) => module.preloadCalendly().catch(() => undefined));
  }, []);
  const modal = ready ? (
    <Suspense fallback={null}>
      <BookingModal isOpen={open} onClose={close} />
    </Suspense>
  ) : null;
  return { openBooking, prefetch, modal };
}
