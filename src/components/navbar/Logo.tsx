
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/90 to-accent/80 flex items-center justify-center shadow-sm">
        <span className="text-white font-bold">C</span>
      </div>
      <span className="font-bold text-xl tracking-tight">Career BEAST MODE</span>
    </Link>
  );
};

export default Logo;
