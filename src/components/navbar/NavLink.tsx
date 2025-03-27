
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface NavItemChild {
  path: string;
  label: string;
  icon: LucideIcon;
  locked?: boolean;
  children?: NavItemChild[];
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
                  (children?.some(child => 
                    location.pathname === child.path ||
                    child.children?.some(grandchild => location.pathname === grandchild.path)
                  ));
  const [open, setOpen] = useState(false);
  
  // Standardized font styling for all menu items
  const menuItemStyle = "font-medium text-sm";
  
  // If this is a parent link with children
  if (children && children.length > 0) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "px-3 py-2 rounded-md flex items-center space-x-1 transition-colors",
                menuItemStyle,
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                locked ? "opacity-75" : ""
              )}
              onClick={() => setOpen(!open)}
            >
              <Icon size={16} />
              <span>{label}</span>
              {locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[220px] p-2 space-y-1">
                {children.map((child) => {
                  // If this child has its own children (third level nav)
                  if (child.children && child.children.length > 0) {
                    return (
                      <li key={child.path} className="relative group">
                        <div
                          className={cn(
                            "flex items-center justify-between space-x-2 p-2 rounded-md cursor-pointer",
                            menuItemStyle,
                            location.pathname === child.path
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                            child.locked ? "opacity-75" : ""
                          )}
                        >
                          <div className="flex items-center space-x-2">
                            <child.icon size={16} />
                            <span>{child.label}</span>
                            {child.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                          </div>
                          <ChevronDown size={14} className="transform -rotate-90" />
                        </div>
                        
                        {/* Third level submenu */}
                        <div className="absolute left-full top-0 ml-1 hidden group-hover:block">
                          <div className="bg-background border border-border rounded-md shadow-md p-2 w-[220px]">
                            {child.children.map((grandchild) => (
                              <Link
                                key={grandchild.path}
                                to={grandchild.path}
                                className={cn(
                                  "flex items-center space-x-2 p-2 rounded-md",
                                  menuItemStyle,
                                  location.pathname === grandchild.path
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                  grandchild.locked ? "opacity-75" : ""
                                )}
                              >
                                <grandchild.icon size={16} />
                                <span>{grandchild.label}</span>
                                {grandchild.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  }
                  
                  // Regular second-level link
                  return (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className={cn(
                          "flex items-center space-x-2 p-2 rounded-md",
                          menuItemStyle,
                          location.pathname === child.path
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                          child.locked ? "opacity-75" : ""
                        )}
                      >
                        <child.icon size={16} />
                        <span>{child.label}</span>
                        {child.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
  
  // Regular link without children
  return (
    <Link
      to={path}
      className={cn(
        "px-3 py-2 rounded-md flex items-center space-x-1 transition-colors",
        menuItemStyle,
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        locked ? "opacity-75" : ""
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
      {locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
    </Link>
  );
};

export default NavLink;
