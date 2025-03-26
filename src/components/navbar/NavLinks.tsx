
import React from "react";
import NavLink, { NavItem } from "./NavLink";

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
