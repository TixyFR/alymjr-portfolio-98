import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import React from "react";
import Index from "./pages/Index";
import Miniatures from "./pages/Miniatures";
import Affiches from "./pages/Affiches";
import Autres from "./pages/Autres";
import Entrainement from "./pages/Entrainement";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const App = () => {
  // Preconnect to external domains for better performance
  React.useEffect(() => {
    const preconnectDomains = [
      'https://i.imgur.com',
      'https://rejotfqiomtyjjdbkchj.supabase.co'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      if (!document.querySelector(`link[href="${domain}"]`)) {
        document.head.appendChild(link);
      }
    });
  }, []);

  return (
  <ErrorBoundary>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter 
            future={{ 
              v7_relativeSplatPath: true,
              v7_startTransition: true 
            }}
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/miniatures" element={<Miniatures />} />
              <Route path="/affiches" element={<Affiches />} />
              <Route path="/autres" element={<Autres />} />
              <Route path="/entrainement" element={<Entrainement />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
  );
};

export default App;
