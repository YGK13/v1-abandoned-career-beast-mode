
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { exchangeLinkedInCode, saveLinkedInProfile } from "@/utils/linkedin";

const LinkedInAuthHelper: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [status, setStatus] = useState<'processing'|'success'|'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const handleAuth = async () => {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to connect your LinkedIn account.",
          variant: "destructive",
        });
        navigate("/auth", { replace: true });
        return;
      }
      
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const error = params.get("error");
      const errorDescription = params.get("error_description");
      
      if (error || !code) {
        setStatus('error');
        setErrorMessage(errorDescription || "LinkedIn authorization was denied or failed.");
        toast({
          title: "LinkedIn Connection Failed",
          description: errorDescription || "Authorization failed. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      try {
        // Exchange the code for profile data
        const data = await exchangeLinkedInCode(code);
        
        if (!data?.profile) {
          throw new Error("No profile data returned from LinkedIn");
        }
        
        // Save the profile in the database
        await saveLinkedInProfile(data.profile, user.id);
        
        setStatus('success');
        toast({
          title: "LinkedIn Connected",
          description: "Your LinkedIn account has been successfully connected.",
        });
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/settings", { replace: true });
        }, 2000);
        
      } catch (err: any) {
        console.error("LinkedIn auth processing error:", err);
        setStatus('error');
        setErrorMessage(err.message || "Failed to process LinkedIn authentication");
        toast({
          title: "Connection Failed",
          description: "An error occurred while connecting to LinkedIn.",
          variant: "destructive",
        });
      }
    };
    
    handleAuth();
  }, [location, navigate, toast, user]);
  
  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center mb-2">Processing LinkedIn Connection</h2>
            <p className="text-center text-muted-foreground">
              Please wait while we connect your LinkedIn account...
            </p>
          </>
        );
        
      case 'success':
        return (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center mb-2">LinkedIn Connected!</h2>
            <p className="text-center text-muted-foreground">
              Your LinkedIn account has been successfully connected.
              You'll be redirected in a moment...
            </p>
          </>
        );
        
      case 'error':
        return (
          <>
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center mb-2">Connection Failed</h2>
            <p className="text-center text-muted-foreground mb-4">
              {errorMessage || "An error occurred while connecting your LinkedIn account."}
            </p>
            <div className="flex justify-center">
              <Button onClick={() => navigate("/settings", { replace: true })}>
                Return to Settings
              </Button>
            </div>
          </>
        );
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 pb-8">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInAuthHelper;
