
import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AnimatedTransition from "../AnimatedTransition";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const location = useLocation();
  
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
    if (location.pathname === '/career-docs') {
      return '/build/career-docs';
    }
    
    if (location.pathname === '/linkedin') {
      return '/build/linkedin';
    }
    
    if (location.pathname === '/build-business') {
      return '/build/build-business';
    }
    
    if (location.pathname === '/manage-everything') {
      return '/build/manage-everything';
    }
    
    if (location.pathname === '/bio-generator') {
      return '/build/bio-generator';
    }
    
    // For paths under Grow
    if (location.pathname === '/skills') {
      return '/grow/skills';
    }
    
    if (location.pathname === '/monetize-expertise' || location.pathname.startsWith('/monetize-expertise/')) {
      return '/grow/monetize-expertise';
    }
    
    if (location.pathname === '/promote-yourself') {
      return '/grow/promote-yourself';
    }
    
    if (location.pathname === '/networking') {
      return '/grow/networking';
    }
    
    if (location.pathname === '/coaching') {
      return '/grow/coaching';
    }

    if (location.pathname === '/coaching/one-on-one') {
      return '/grow/coaching/one-on-one';
    }
    
    // For paths under Scale
    if (location.pathname === '/lifedesign') {
      return '/scale/lifedesign';
    }

    if (location.pathname === '/scale-your-biz') {
      return '/scale/scale-your-biz';
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
