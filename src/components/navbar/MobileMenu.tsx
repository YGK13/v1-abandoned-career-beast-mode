
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  locked?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks }) => {
  const location = useLocation();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border z-50 animate-fade-in">
      <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
        {navLinks.map(({ path, label, icon: Icon, locked }) => (
          <Link
            key={path}
            to={path}
            className={`px-4 py-3 rounded-md flex items-center space-x-3 transition-colors ${
              location.pathname === path
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            } ${locked ? "opacity-75" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
            {locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
