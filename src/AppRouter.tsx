import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";

const JournalPage = lazy(() => import('./pages/JournalPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  return (
    <Suspense fallback={<main className="route-shell" aria-label="Loading page" />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServicesPage />} />
        <Route path="/blogs" element={<JournalPage />} />
        <Route path="/blogs/:slug" element={<ArticlePage />} />
        <Route path="/blog" element={<JournalPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/work" element={<JournalPage />} />
      </Routes>
    </Suspense>
  );
}

export function AppRouter() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}
