import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useEffect, Suspense, lazy } from "react";
import { redisService } from "@/lib/redis";

// Lazy-loaded pages for code splitting and better initial load performance
const Index = lazy(() => import("./pages/Index"));
const Problems = lazy(() => import("./pages/Problems"));
const StriverSheet = lazy(() => import("./pages/StriverSheet"));
const Templates = lazy(() => import("./pages/Templates"));
const ProblemMapper = lazy(() => import("./pages/ProblemMapper"));
const Compare = lazy(() => import("./pages/Compare"));
const CheatSheet = lazy(() => import("./pages/CheatSheet"));
const SystemDesign = lazy(() => import('./pages/SystemDesign'));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Support = lazy(() => import("./pages/Support"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Simple loading fallback
const PageLoader = () => (
  <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-md" />
      <span className="text-sm font-medium text-muted-foreground animate-pulse">Loading content...</span>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    redisService.incrementView("app_loads").then((count) => {
      if (count) {
        console.log(`[Redis] Global App loads: ${count}`);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-background overflow-x-hidden">
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/problems" element={<Problems />} />
                  <Route path="/striver" element={<ProtectedRoute><StriverSheet /></ProtectedRoute>} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/mapper" element={<ProblemMapper />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/cheatsheet" element={<CheatSheet />} />
                  <Route path="/system-design" element={<SystemDesign />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
