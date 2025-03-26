
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-t-2 border-primary/70 animate-spin" style={{ animationDuration: '1s' }}></div>
        <div className="absolute inset-4 rounded-full border-t-2 border-primary/40 animate-spin" style={{ animationDuration: '1.5s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
