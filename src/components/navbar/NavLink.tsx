
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  children?: NavItem[];
  locked?: boolean;
}

interface NavLinkProps {
  to: string;
  label: string;
  icon: LucideIcon;
  locked?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon: Icon, locked }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      } ${locked ? "opacity-50 pointer-events-none" : ""}`}
    >
      <Icon size={18} />
      <span>{label}</span>
      {locked && (
        <span className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">PRO</span>
      )}
    </Link>
  );
};

export default NavLink;
