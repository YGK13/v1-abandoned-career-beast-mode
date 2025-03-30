
import React from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GoogleAuthErrorProps {
  error: string;
  rawResponse?: any;
}

const GoogleAuthError: React.FC<GoogleAuthErrorProps> = ({ error, rawResponse }) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center p-6 max-w-md">
      <div className="flex justify-center mb-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
      <p className="text-muted-foreground mb-4">{error}</p>
      
      {rawResponse && (
        <div className="mb-4 p-3 bg-muted/50 rounded-md text-left overflow-auto max-h-[200px] text-xs">
          <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
        </div>
      )}
      
      <div className="space-y-2">
        <Button onClick={() => navigate("/google")} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Google Page
        </Button>
        
        <Button 
          onClick={() => window.location.href = window.location.origin + "/google"} 
          variant="outline" 
          className="w-full"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default GoogleAuthError;
