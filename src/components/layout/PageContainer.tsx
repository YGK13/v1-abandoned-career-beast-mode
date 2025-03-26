
import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AnimatedTransition from "../AnimatedTransition";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <main className="flex-1 w-full">
      <AnimatedTransition key={location.pathname}>
        {children}
      </AnimatedTransition>
    </main>
  );
};

export default PageContainer;
