import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Index from "./pages/Index";
import Problems from "./pages/Problems";
import StriverSheet from "./pages/StriverSheet";
import Templates from "./pages/Templates";
import ProblemMapper from "./pages/ProblemMapper";
import Compare from "./pages/Compare";
import CheatSheet from "./pages/CheatSheet";import SystemDesign from './pages/SystemDesign';import PrivacyPolicy from "./pages/PrivacyPolicy";
import Support from "./pages/Support";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background overflow-x-hidden">
          <BrowserRouter>
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
          </BrowserRouter>
        </div>
        <SpeedInsights />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
