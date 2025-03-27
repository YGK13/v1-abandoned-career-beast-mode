
import React from "react";
import { Progress } from "@/components/ui/progress";

interface LinkedInImportProgressProps {
  importProgress: number;
}

const LinkedInImportProgress: React.FC<LinkedInImportProgressProps> = ({ importProgress }) => {
  return (
    <div className="space-y-3 py-4">
      <div className="flex flex-col items-center">
        <Progress 
          value={importProgress} 
          variant="circular" 
          size="md" 
          className="mb-2" 
        />
        <span className="text-sm font-medium mt-2">Importing profile data...</span>
      </div>
      <p className="text-xs text-muted-foreground animate-pulse text-center">
        Please wait while we analyze and import your profile data...
      </p>
    </div>
  );
};

export default LinkedInImportProgress;
