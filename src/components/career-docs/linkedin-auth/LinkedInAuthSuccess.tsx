
import React from "react";
import { CheckCircle2 } from "lucide-react";

const LinkedInAuthSuccess: React.FC = () => {
  return (
    <div className="text-center p-6 max-w-md">
      <div className="flex justify-center mb-4">
        <CheckCircle2 className="h-12 w-12 text-success" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Successfully Connected</h2>
      <p className="text-muted-foreground">
        Your LinkedIn profile has been successfully connected. Redirecting...
      </p>
    </div>
  );
};

export default LinkedInAuthSuccess;
