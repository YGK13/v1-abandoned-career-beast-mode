
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Coaching from "./pages/Coaching";
import Documents from "./pages/Documents";
import CareerDocs from "./pages/CareerDocs";
import Jobs from "./pages/Jobs";
import Skills from "./pages/Skills";
import SkillDetails from "./pages/SkillDetails";
import SalaryTitle from "./pages/SalaryTitle";
import Business from "./pages/Business";
import BuildBusiness from "./pages/BuildBusiness";
import ScaleYourBiz from "./pages/ScaleYourBiz";
import MentalModels from "./pages/MentalModels";
import LifeDesign from "./pages/LifeDesign";
import LifeSkills from "./pages/LifeSkills";
import CareerTracking from "./pages/CareerTracking";
import Networking from "./pages/Networking";
import MonetizeExpertise from "./pages/MonetizeExpertise";
import MonetizePlatformDetails from "./pages/MonetizePlatformDetails";
import Monetize from "./pages/Monetize";
import BioGenerator from "./pages/BioGenerator";
import PersonalBrand from "./pages/PersonalBrand";
import ManageEverything from "./pages/ManageEverything";
import OnboardingPage from "./pages/OnboardingPage";
import CoachingOneOnOne from "./pages/CoachingOneOnOne";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/career-docs" element={<CareerDocs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/:skillId" element={<SkillDetails />} />
        <Route path="/salary-title" element={<SalaryTitle />} />
        <Route path="/business" element={<Business />} />
        <Route path="/build-business" element={<BuildBusiness />} />
        <Route path="/scale-business" element={<ScaleYourBiz />} />
        <Route path="/mental-models" element={<MentalModels />} />
        <Route path="/life-design" element={<LifeDesign />} />
        <Route path="/life-skills" element={<LifeSkills />} />
        <Route path="/career-tracking" element={<CareerTracking />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/monetize-expertise" element={<MonetizeExpertise />} />
        <Route path="/monetize/:platformId" element={<MonetizePlatformDetails />} />
        <Route path="/monetize" element={<Monetize />} />
        <Route path="/bio-generator" element={<BioGenerator />} />
        <Route path="/personal-brand" element={<PersonalBrand />} />
        <Route path="/manage-everything" element={<ManageEverything />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/coaching-one-on-one" element={<CoachingOneOnOne />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/help" element={<Help />} />
        <Route path="/linkedin" element={<LinkedIn />} />
        <Route path="/linkedin/callback" element={<LinkedIn />} />
        <Route path="/google" element={<Google />} />
        <Route path="/google/callback" element={<Google />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
