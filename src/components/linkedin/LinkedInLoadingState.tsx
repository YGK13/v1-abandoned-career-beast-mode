
import React from "react";
import { Loader2 } from "lucide-react";

const LinkedInLoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="ml-2">Checking LinkedIn connection...</p>
    </div>
  );
};

export default LinkedInLoadingState;
