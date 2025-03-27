
import React from "react";
import { Progress } from "@/components/ui/progress";

interface LinkedInImportProgressProps {
  importProgress: number;
}

const LinkedInImportProgress: React.FC<LinkedInImportProgressProps> = ({ importProgress }) => {
  return (
    <div className="space-y-3 py-4">
      <div className="flex justify-between text-sm">
        <span>Importing profile data...</span>
        <span className="font-medium">{importProgress}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#0a66c2] transition-all duration-300 ease-out" 
          style={{ width: `${importProgress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground animate-pulse">
        Please wait while we analyze and import your profile data...
      </p>
    </div>
  );
};

export default LinkedInImportProgress;
