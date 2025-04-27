
import React from "react";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

const LinkedInAuthProcessing: React.FC = () => {
  return (
    <div className="text-center">
      <LoadingSpinner />
      <p className="mt-4 text-muted-foreground">Connecting to LinkedIn...</p>
    </div>
  );
};

export default LinkedInAuthProcessing;
