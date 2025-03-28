
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
  LucideProps,
  FileSpreadsheet
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
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        // Check if the click is outside the mobile menu and not on the menu toggle button
        if (!target.closest('.mobile-menu') && !target.closest('.menu-toggle')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks: NavItem[] = [
    { path: "/", label: "Home", icon: Home },
    { 
      path: "/build", 
      label: "Build", 
      icon: Building,
      children: [
        { path: "/career-docs", label: "Career Assets", icon: FileText }, 
        { path: "/linkedin", label: "LinkedIn", icon: Linkedin },
        { path: "/manage-everything", label: "Manage Everything", icon: Users },
        { path: "/build-business", label: "Start Your Biz", icon: Factory },
        { path: "/bio-generator", label: "Bio Generator", icon: FileSpreadsheet }
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
      ]
    },
    { 
      path: "/scale", 
      label: "Scale", 
      icon: GrowthChartIcon,
      children: [
        { path: "/lifedesign", label: "Life Design", icon: Target },
        { path: "/scale-your-biz", label: "Scale Your Biz", icon: Factory },
        { path: "/monetize-expertise", label: "Monetize Expertise", icon: DollarSign },
        { path: "/mental-models", label: "Mental Models", icon: Target },
        { path: "/life-skills", label: "Life Skills", icon: Award }
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <React.Fragment key={link.path}>
                <a 
                  href={link.path} 
                  className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/50 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="menu-toggle">
          <UserMenu 
            isMobileMenuOpen={isMobileMenuOpen} 
            toggleMobileMenu={toggleMobileMenu} 
          />
        </div>
      </div>
      
      <div className="mobile-menu absolute right-0 top-16 w-64 md:hidden">
        <MobileMenu isOpen={isMobileMenuOpen} navLinks={navLinks} />
      </div>
    </header>
  );
};

export default Navbar;
