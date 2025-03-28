
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Index from "./pages/Index";
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";
import Jobs from "./pages/Jobs";
import Documents from "./pages/Documents";
import CareerDocs from "./pages/CareerDocs";
import Skills from "./pages/Skills";
import Networking from "./pages/Networking";
import PersonalBrand from "./pages/PersonalBrand";
import SalaryTitle from "./pages/SalaryTitle";
import Coaching from "./pages/Coaching";
import LifeDesign from "./pages/LifeDesign";
import Business from "./pages/Business";
import Monetize from "./pages/Monetize";
import ScaleYourBiz from "./pages/ScaleYourBiz";
import Pricing from "./pages/Pricing";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/career-docs" element={<CareerDocs />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/personal-brand" element={<PersonalBrand />} />
        <Route path="/salary-title" element={<SalaryTitle />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/life-design" element={<LifeDesign />} />
        <Route path="/business" element={<Business />} />
        <Route path="/monetize" element={<Monetize />} />
        <Route path="/scale-your-biz" element={<ScaleYourBiz />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
};

export default App;
