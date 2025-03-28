
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavItem } from "./NavLink";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  if (!isOpen) return null;
  
  // Standardized font styling for mobile menu
  const menuItemStyle = "font-medium text-sm";
  
  const toggleSubMenu = (path: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };
  
  return (
    <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-background/95 backdrop-blur-lg border-b border-border z-50 animate-fade-in overflow-auto">
      <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1 pb-24">
        {navLinks.map((link) => {
          // If this link has children
          if (link.children && link.children.length > 0) {
            return (
              <Accordion type="single" collapsible key={link.path}>
                <AccordionItem value={link.path} className="border-0">
                  <AccordionTrigger
                    className={cn(
                      "px-4 py-3 rounded-md flex items-center space-x-3 transition-colors",
                      menuItemStyle,
                      location.pathname === link.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      link.locked ? "opacity-75" : ""
                    )}
                  >
                    <span className="flex items-center space-x-3">
                      <link.icon size={18} />
                      <span>{link.label}</span>
                      {link.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pl-8 pt-1">
                      {link.children.map((child) => {
                        // If this child has its own children (third level nav)
                        if (child.children && child.children.length > 0) {
                          return (
                            <div key={child.path} className="rounded-md">
                              <div 
                                className={cn(
                                  "px-4 py-3 rounded-md flex items-center justify-between transition-colors", 
                                  menuItemStyle,
                                  location.pathname === child.path
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                  child.locked ? "opacity-75" : ""
                                )}
                                onClick={() => toggleSubMenu(child.path)}
                              >
                                <div className="flex items-center space-x-3">
                                  <child.icon size={18} />
                                  <span>{child.label}</span>
                                  {child.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                                </div>
                                <ChevronDown 
                                  size={16} 
                                  className={`transition-transform ${expandedItems[child.path] ? 'rotate-180' : ''}`} 
                                />
                              </div>
                              
                              {/* Third level menu */}
                              {expandedItems[child.path] && (
                                <div className="flex flex-col space-y-1 pl-8 pt-1">
                                  {child.children.map(grandchild => (
                                    <Link
                                      key={grandchild.path}
                                      to={grandchild.path}
                                      className={cn(
                                        "px-4 py-3 rounded-md flex items-center space-x-3 transition-colors",
                                        menuItemStyle,
                                        location.pathname === grandchild.path
                                          ? "text-primary bg-primary/10"
                                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                                        grandchild.locked ? "opacity-75" : ""
                                      )}
                                    >
                                      <grandchild.icon size={18} />
                                      <span>{grandchild.label}</span>
                                      {grandchild.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                        
                        // Regular second-level link
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={cn(
                              "px-4 py-3 rounded-md flex items-center space-x-3 transition-colors",
                              menuItemStyle,
                              location.pathname === child.path
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                              child.locked ? "opacity-75" : ""
                            )}
                          >
                            <child.icon size={18} />
                            <span>{child.label}</span>
                            {child.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }
          
          // Regular link without children
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-3 rounded-md flex items-center space-x-3 transition-colors",
                menuItemStyle,
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                link.locked ? "opacity-75" : ""
              )}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
              {link.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileMenu;
