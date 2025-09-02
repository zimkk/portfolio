import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { App } from "./App";
import WorkPage from "./pages/WorkPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPost from "./pages/BlogPost";

function RouteDebugger() {
  const location = useLocation();
  console.log('Current route:', location.pathname);
  return null;
}

export function AppRouter() {
  return <BrowserRouter>
          <RouteDebugger />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
          </Routes>
      </BrowserRouter>;
}