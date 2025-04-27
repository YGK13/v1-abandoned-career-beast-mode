
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Bug } from "lucide-react";

interface LinkedInAuthErrorProps {
  error: string;
  debugInfo: any;
  rawResponse?: any;
}

const LinkedInAuthError: React.FC<LinkedInAuthErrorProps> = ({ 
  error, 
  debugInfo, 
  rawResponse 
}) => {
  const navigate = useNavigate();

  return (
    <div className="text-center p-6 max-w-md">
      <div className="flex justify-center mb-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
      <p className="text-muted-foreground mb-4" style={{ whiteSpace: 'pre-line' }}>{error}</p>
      
      <div className="mb-4 p-3 bg-muted/50 rounded-md text-left overflow-auto max-h-[200px] text-xs">
        <h4 className="font-medium mb-2">Debug Information:</h4>
        <pre className="whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
      
      {rawResponse && (
        <div className="mb-4 p-3 bg-muted/50 rounded-md text-left overflow-auto max-h-[200px] text-xs">
          <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
        </div>
      )}
      
      <div className="space-y-2">
        <Button onClick={() => navigate("/linkedin")} className="w-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to LinkedIn Page
        </Button>
        
        <Button 
          onClick={() => window.location.href = window.location.origin + "/linkedin"} 
          variant="outline" 
          className="w-full"
        >
          Try Again
        </Button>
        
        <Button 
          onClick={() => navigate("/auth")}
          variant="outline"
          className="w-full"
        >
          <Bug className="mr-2 h-4 w-4" /> Go to Auth Page
        </Button>
      </div>
    </div>
  );
};

export default LinkedInAuthError;
