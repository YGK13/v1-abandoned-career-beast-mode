
import React from "react";
import { LucideIcon } from "lucide-react";
import NavLink from "./NavLink";

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  locked?: boolean;
}

interface NavLinksProps {
  links: NavItem[];
}

const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {links.map((link) => (
        <NavLink key={link.path} {...link} />
      ))}
    </nav>
  );
};

export default NavLinks;
