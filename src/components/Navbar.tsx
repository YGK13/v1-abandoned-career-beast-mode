
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Briefcase, 
  Award,
  HelpCircle,
  GraduationCap,
  Target,
  CreditCard,
  Building,
  Sprout,
  Scale,
  Factory,
  User,
  Landmark,
  Mailbox,
  Link,
  Users,
  DollarSign,
  Linkedin,
  Network
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";
import { NavItem } from "./navbar/NavLink";

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

  const navLinks: NavItem[] = [
    { path: "/", label: "Home", icon: Home },
    { 
      path: "/build", 
      label: "Build", 
      icon: Building,
      children: [
        { path: "/career-docs", label: "Career Docs", icon: FileText },
        { path: "/linkedin", label: "LinkedIn", icon: Linkedin },
        { path: "/build-business", label: "Start Your Biz", icon: Factory },
        { path: "/manage-everything", label: "Manage Everything", icon: Users }
      ]
    },
    { 
      path: "/grow", 
      label: "Grow", 
      icon: Sprout,
      children: [
        { path: "/skills", label: "Skills", icon: Award },
        { path: "/coaching", label: "Coaching", icon: GraduationCap },
        { path: "/networking", label: "Networking", icon: Network },
        { path: "/personal-brand", label: "Personal Brand", icon: User },
        { path: "/monetize-expertise", label: "Monetize Expertise", icon: DollarSign },
        { path: "/salary-title", label: "Salary + Title", icon: Target }
      ]
    },
    { 
      path: "/scale", 
      label: "Scale", 
      icon: Scale,
      children: [
        { path: "/lifedesign", label: "Life Design", icon: Target },
        { path: "/scale-your-biz", label: "Scale Your Biz", icon: Factory }
      ]
    },
    { 
      path: "/jobs", 
      label: "Jobs", 
      icon: Briefcase,
      locked: !hasJobsAccess
    },
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
