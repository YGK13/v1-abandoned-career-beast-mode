
import React, { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import LoadingSpinner from "./layout/LoadingSpinner";
import PageContainer from "./layout/PageContainer";
import Footer from "./layout/Footer";

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
        <LoadingSpinner />
      ) : (
        <>
          <Navbar />
          <PageContainer>{children}</PageContainer>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
