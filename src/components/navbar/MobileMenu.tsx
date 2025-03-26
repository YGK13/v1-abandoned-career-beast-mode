
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavItem } from "./NavLink";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
        {navLinks.map((link) => {
          // If this link has children
          if (link.children && link.children.length > 0) {
            return (
              <Accordion type="single" collapsible key={link.path}>
                <AccordionItem value={link.path} className="border-0">
                  <AccordionTrigger
                    className={`px-4 py-3 rounded-md flex items-center space-x-3 transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    } ${link.locked ? "opacity-75" : ""}`}
                  >
                    <span className="flex items-center space-x-3">
                      <link.icon size={18} />
                      <span>{link.label}</span>
                      {link.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pl-8 pt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`px-4 py-3 rounded-md flex items-center space-x-3 transition-colors ${
                            location.pathname === child.path
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          } ${child.locked ? "opacity-75" : ""}`}
                        >
                          <child.icon size={18} />
                          <span>{child.label}</span>
                          {child.locked && <span className="w-2 h-2 bg-amber-500 rounded-full ml-1"></span>}
                        </Link>
                      ))}
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
              className={`px-4 py-3 rounded-md flex items-center space-x-3 transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } ${link.locked ? "opacity-75" : ""}`}
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
