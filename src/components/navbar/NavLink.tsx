
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface NavItemChild {
  path: string;
  label: string;
  icon: LucideIcon;
  locked?: boolean;
}

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  locked?: boolean;
  children?: NavItemChild[];
}

interface NavLinkProps extends NavItem {}

const NavLink: React.FC<NavLinkProps> = ({ path, label, icon: Icon, locked, children }) => {
  const location = useLocation();
  const isActive = location.pathname === path || 
                  (children?.some(child => location.pathname === child.path));
  const [open, setOpen] = useState(false);
  
  // If this is a parent link with children
  if (children && children.length > 0) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-colors ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } ${locked ? "opacity-75" : ""}`}
              onClick={() => setOpen(!open)}
            >
              <Icon size={16} />
              <span>{label}</span>
              {locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[200px] p-2 space-y-1">
                {children.map((child) => (
                  <li key={child.path}>
                    <Link
                      to={child.path}
                      className={`flex items-center space-x-2 p-2 rounded-md ${
                        location.pathname === child.path
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      } ${child.locked ? "opacity-75" : ""}`}
                    >
                      <child.icon size={16} />
                      <span>{child.label}</span>
                      {child.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  
  // For regular links without children
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
