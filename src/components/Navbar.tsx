
import React, { useState, useEffect, forwardRef } from "react";
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
  Factory,
  User,
  Landmark,
  Mailbox,
  Link,
  Users,
  DollarSign,
  Linkedin,
  Network,
  LucideProps
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";
import { NavItem } from "./navbar/NavLink";

// Create a custom GrowthChartIcon component with the hockey stick growth shape that's compatible with Lucide format
const GrowthChartIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 3v18h18" />
    <path d="M18 3v4h4" />
    <path d="M18 7 9 16l-3-3-3 3" />
  </svg>
));

// Add display name for better debugging
GrowthChartIcon.displayName = "GrowthChartIcon";

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
        { path: "/manage-everything", label: "Manage Everything", icon: Users,
          children: [
            { path: "/build-business", label: "Start Your Biz", icon: Factory },
          ] 
        }
      ]
    },
    { 
      path: "/grow", 
      label: "Grow", 
      icon: Sprout,
      children: [
        { path: "/salary-title", label: "Salary + Title", icon: Target },
        { path: "/skills", label: "Pro Skills", icon: Award },
        { path: "/coaching", label: "Coaching", icon: GraduationCap },
        { path: "/networking", label: "Networking", icon: Network },
        { path: "/personal-brand", label: "Personal Brand", icon: User },
        { path: "/monetize-expertise", label: "Monetize Expertise", icon: DollarSign },
        { path: "/mental-models", label: "Mental Models", icon: Target },
        { path: "/life-skills", label: "Life Skills", icon: Award }
      ]
    },
    { 
      path: "/scale", 
      label: "Scale", 
      icon: GrowthChartIcon,
      children: [
        { path: "/lifedesign", label: "Life Design", icon: Target },
        { path: "/scale-your-biz", label: "Scale Your Biz", icon: Factory }
      ]
    },
    { path: "/jobs", label: "Jobs", icon: Briefcase },
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
