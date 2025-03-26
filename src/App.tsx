
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import Index from "./pages/Index";
import Skills from "./pages/Skills";
import SkillDetails from "./pages/SkillDetails";
import CareerDocs from "./pages/CareerDocs";
import Jobs from "./pages/Jobs";
import Coaching from "./pages/Coaching";
import CoachingOneOnOne from "./pages/CoachingOneOnOne";
import BuildBusiness from "./pages/BuildBusiness";
import LifeDesign from "./pages/LifeDesign";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import ManageEverything from "./pages/ManageEverything";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SubscriptionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/skills/:skillName" element={<SkillDetails />} />
              <Route path="/career-docs" element={<CareerDocs />} />
              <Route path="/build-business" element={<BuildBusiness />} />
              <Route path="/manage-everything" element={<ManageEverything />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/coaching/one-on-one" element={<CoachingOneOnOne />} />
              <Route path="/lifedesign" element={<LifeDesign />} />
              <Route path="/help" element={<Help />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </SubscriptionProvider>
  </QueryClientProvider>
);

export default App;
