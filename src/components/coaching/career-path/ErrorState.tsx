
import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
      <p className="text-muted-foreground">{error}</p>
      <p className="text-sm mt-2">Using default career data. Upload a resume for personalized analysis.</p>
    </div>
  );
};

export default ErrorState;
