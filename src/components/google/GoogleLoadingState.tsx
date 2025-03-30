
import React from "react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

const GoogleLoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-muted-foreground">Checking Google connection...</p>
      </div>
    </div>
  );
};

export default GoogleLoadingState;
