
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  BarChart2, 
  FileText, 
  Briefcase, 
  Award,
  HelpCircle,
  GraduationCap,
  Target,
  CreditCard
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { hasJobsAccess } = useSubscription();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Dashboard", icon: BarChart2 },
    { path: "/skills", label: "Skills", icon: Award },
    { path: "/documents", label: "Documents", icon: FileText },
    { 
      path: "/jobs", 
      label: "Jobs", 
      icon: Briefcase,
      locked: !hasJobsAccess
    },
    { path: "/coaching", label: "Coaching", icon: GraduationCap },
    { path: "/lifedesign", label: "Life Design", icon: Target },
    { path: "/pricing", label: "Pricing", icon: CreditCard },
    { path: "/help", label: "Help", icon: HelpCircle },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <NavLinks links={navLinks} />
        <UserMenu 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu} 
        />
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} navLinks={navLinks} />
    </header>
  );
};

export default Navbar;
