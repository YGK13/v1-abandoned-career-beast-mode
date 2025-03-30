
import React from "react";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import GoogleAuthProcessing from "@/components/google/auth/GoogleAuthProcessing";
import GoogleAuthError from "@/components/google/auth/GoogleAuthError";
import GoogleAuthSuccess from "@/components/google/auth/GoogleAuthSuccess";

const GoogleAuthHelper: React.FC = () => {
  const { isProcessing, error, success, rawResponse } = useGoogleAuth();
  
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      {isProcessing && <GoogleAuthProcessing />}
      
      {error && <GoogleAuthError error={error} rawResponse={rawResponse} />}
      
      {success && <GoogleAuthSuccess />}
    </div>
  );
};

export default GoogleAuthHelper;
