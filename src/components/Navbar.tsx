
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => {
                // If link has children, create a dropdown
                if (link.children && link.children.length > 0) {
                  return (
                    <NavigationMenuItem key={link.path}>
                      <NavigationMenuTrigger className="flex items-center gap-2">
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-background border border-border rounded-md shadow-md">
                        <ul className="grid w-[250px] gap-1 p-2">
                          {link.children.map((child) => (
                            <li key={child.path}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={child.path}
                                  className={cn(
                                    "flex items-center gap-2 select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    location.pathname === child.path && "bg-accent text-accent-foreground"
                                  )}
                                >
                                  <child.icon className="h-4 w-4" />
                                  <span>{child.label}</span>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }
                // Regular link without dropdown
                return (
                  <NavigationMenuItem key={link.path}>
                    <a
                      href={link.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "flex items-center gap-2",
                        location.pathname === link.path && "bg-accent text-accent-foreground"
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
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
