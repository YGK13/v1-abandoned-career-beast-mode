
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface GoogleErrorStateProps {
  error: string;
  onRetry: () => void;
}

const GoogleErrorState: React.FC<GoogleErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
          Error Checking Google Connection
        </CardTitle>
        <CardDescription className="text-destructive">
          {error}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoogleErrorState;
