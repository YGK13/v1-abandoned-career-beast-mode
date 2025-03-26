
import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AnimatedTransition from "../AnimatedTransition";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const location = useLocation();
  
  // Note: We need to make sure our new route structures 
  // (like /build and /grow) are included in the animation key
  const getRouteKey = () => {
    // For main navigation paths, use the pathname
    if (location.pathname === '/' || 
        location.pathname === '/jobs' || 
        location.pathname === '/lifedesign' ||
        location.pathname === '/pricing' ||
        location.pathname === '/help') {
      return location.pathname;
    }
    
    // For paths under Build
    if (location.pathname === '/documents') {
      return '/build/documents';
    }
    
    // For paths under Grow
    if (location.pathname === '/skills') {
      return '/grow/skills';
    }
    
    if (location.pathname === '/coaching') {
      return '/grow/coaching';
    }
    
    // Default to the pathname
    return location.pathname;
  };
  
  return (
    <main className="flex-1 w-full">
      <AnimatedTransition key={getRouteKey()}>
        {children}
      </AnimatedTransition>
    </main>
  );
};

export default PageContainer;
