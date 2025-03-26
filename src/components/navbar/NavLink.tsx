
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  path: string;
  label: string;
  icon: LucideIcon;
  locked?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ path, label, icon: Icon, locked }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link
      to={path}
      className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-colors ${
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      } ${locked ? "opacity-75" : ""}`}
    >
      <Icon size={16} />
      <span>{label}</span>
      {locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
    </Link>
  );
};

export default NavLink;
