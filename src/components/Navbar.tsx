
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSubscription } from "@/context/SubscriptionContext";
import Logo from "./navbar/Logo";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";
import NavbarDesktop from "./navbar/NavbarDesktop";
import { navLinks } from "./navbar/navData";

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
        <NavbarDesktop navLinks={navLinks} />
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
