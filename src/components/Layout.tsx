import React, { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AnimatedTransition from "./AnimatedTransition";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-primary/70 animate-spin" style={{ animationDuration: '1s' }}></div>
            <div className="absolute inset-4 rounded-full border-t-2 border-primary/40 animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-1 w-full">
            <AnimatedTransition key={location.pathname}>
              {children}
            </AnimatedTransition>
          </main>
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
        </>
      )}
    </div>
  );
};

export default Layout;
