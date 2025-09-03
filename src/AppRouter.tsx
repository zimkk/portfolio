import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";
import WorkPage from "./pages/WorkPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPost from "./pages/BlogPost";

function RouteDebugger() {
  const location = useLocation();
  console.log('Current route:', location.pathname);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
      </Routes>
    </AnimatePresence>
  );
}

export function AppRouter() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RouteDebugger />
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}