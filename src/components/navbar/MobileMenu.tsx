
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSubscription } from "@/context/SubscriptionContext";
import { NavItem } from "./NavLink";

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks }) => {
  const location = useLocation();
  const { hasJobsAccess } = useSubscription();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full w-64 mt-2 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700">
      {navLinks.map((link) => {
        // Skip job links if user doesn't have access
        if (link.path === "/jobs" && !hasJobsAccess) return null;

        // If this link has children (dropdown)
        if (link.children && link.children.length > 0) {
          return (
            <div key={link.path} className="px-2 py-1">
              <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <link.icon size={16} className="mr-2" />
                <span>{link.label}</span>
              </div>
              <div className="pl-6 mt-1 space-y-1">
                {link.children.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`block px-3 py-1.5 text-sm ${
                      location.pathname === child.path
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <child.icon size={14} className="mr-2" />
                      <span>{child.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        // Regular links without children
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2 text-sm ${
              location.pathname === link.path
                ? "text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <div className="flex items-center">
              <link.icon size={16} className="mr-2" />
              <span>{link.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileMenu;
