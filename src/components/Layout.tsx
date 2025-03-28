
import React, { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingSpinner from "./layout/LoadingSpinner";
import PageContainer from "./layout/PageContainer";
import Footer from "./layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 600 : 800); // Slightly faster loading on mobile

    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Navbar />
          <PageContainer className={isMobile ? "px-3 py-4" : ""}>
            {children}
          </PageContainer>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
