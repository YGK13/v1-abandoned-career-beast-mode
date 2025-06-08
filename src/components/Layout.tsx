import React from 'react';
import Navbar from './Navbar'; // Import Navbar

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header>
        <Navbar /> {/* Render Navbar here */}
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
