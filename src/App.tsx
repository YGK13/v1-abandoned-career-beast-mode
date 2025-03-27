
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
import MonetizeExpertise from "./pages/MonetizeExpertise";
import MonetizePlatformDetails from "./pages/MonetizePlatformDetails";
import PersonalBrand from "./pages/PersonalBrand";
import LinkedIn from "./pages/LinkedIn";
import ScaleYourBiz from "./pages/ScaleYourBiz";
import Networking from "./pages/Networking";
import SalaryTitle from "./pages/SalaryTitle";
import MentalModels from "./pages/MentalModels";
import LifeSkills from "./pages/LifeSkills";
import BioGenerator from "./pages/BioGenerator";

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
              <Route path="/linkedin" element={<LinkedIn />} />
              <Route path="/build-business" element={<BuildBusiness />} />
              <Route path="/manage-everything" element={<ManageEverything />} />
              <Route path="/monetize-expertise" element={<MonetizeExpertise />} />
              <Route path="/monetize-expertise/:platformId" element={<MonetizePlatformDetails />} />
              <Route path="/personal-brand" element={<PersonalBrand />} />
              <Route path="/networking" element={<Networking />} />
              <Route path="/salary-title" element={<SalaryTitle />} />
              <Route path="/mental-models" element={<MentalModels />} />
              <Route path="/life-skills" element={<LifeSkills />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/coaching/one-on-one" element={<CoachingOneOnOne />} />
              <Route path="/lifedesign" element={<LifeDesign />} />
              <Route path="/scale-your-biz" element={<ScaleYourBiz />} />
              <Route path="/help" element={<Help />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/bio-generator" element={<BioGenerator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </SubscriptionProvider>
  </QueryClientProvider>
);

export default App;
