
import React from "react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

const GoogleAuthProcessing: React.FC = () => {
  return (
    <div className="text-center">
      <LoadingSpinner />
      <p className="mt-4 text-muted-foreground">Connecting to Google...</p>
    </div>
  );
};

export default GoogleAuthProcessing;
