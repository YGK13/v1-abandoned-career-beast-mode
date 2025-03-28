
import React from "react";
import { useLocation } from "react-router-dom";
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
import { NavItem } from "./NavLink";

interface NavbarDesktopProps {
  navLinks: NavItem[];
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ navLinks }) => {
  const location = useLocation();

  return (
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
  );
};

export default NavbarDesktop;
