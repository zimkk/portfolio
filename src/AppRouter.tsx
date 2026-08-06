import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";

const WorkPage = lazy(() => import('./pages/WorkPage'));
const JournalPage = lazy(() => import('./pages/JournalPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));

function AnimatedRoutes() {
  return (
    <Suspense fallback={<main className="route-shell" aria-label="Loading page" />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServicesPage />} />
        <Route path="/blogs" element={<JournalPage />} />
        <Route path="/blogs/:slug" element={<ArticlePage />} />
      </Routes>
    </Suspense>
  );
}

export function AppRouter() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}
