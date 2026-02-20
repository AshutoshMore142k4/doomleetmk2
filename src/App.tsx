import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Problems from "./pages/Problems";
import StriverSheet from "./pages/StriverSheet";
import Templates from "./pages/Templates";
import ProblemMapper from "./pages/ProblemMapper";
import Compare from "./pages/Compare";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/striver" element={<ProtectedRoute><StriverSheet /></ProtectedRoute>} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/mapper" element={<ProblemMapper />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
