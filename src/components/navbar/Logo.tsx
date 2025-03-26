
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent/80 flex items-center justify-center">
        <span className="text-white font-semibold">B</span>
      </div>
      <span className="font-semibold text-xl">Beast Mode Career</span>
    </Link>
  );
};

export default Logo;
