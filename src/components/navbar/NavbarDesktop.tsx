
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./NavLink";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavbarDesktopProps {
  navLinks: NavItem[];
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ navLinks }) => {
  const location = useLocation();

  // Style for navigation link items
  const navLinkStyles = "flex items-center gap-2 text-sm font-medium transition-colors";
  const activeStyles = "text-primary";
  const inactiveStyles = "text-muted-foreground hover:text-foreground";

  return (
    <div className="hidden md:flex md:flex-1 justify-start">
      <NavigationMenu>
        <NavigationMenuList>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
            // If this is a link with children (dropdown)
            if (link.children && link.children.length > 0) {
              return (
                <NavigationMenuItem key={link.path}>
                  <NavigationMenuTrigger 
                    className={cn(
                      navLinkStyles,
                      isActive ? activeStyles : inactiveStyles
                    )}
                  >
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[220px] p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "block select-none rounded-md px-3 py-2 text-sm font-medium",
                            location.pathname === child.path
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <child.icon size={16} />
                            <span>{child.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }
            
            // For simple links without children
            return (
              <NavigationMenuItem key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarDesktop;
