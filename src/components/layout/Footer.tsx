
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 border-t border-border mt-auto bg-muted/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Beast Mode Career © {new Date().getFullYear()} • Career Management Platform
        </p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
