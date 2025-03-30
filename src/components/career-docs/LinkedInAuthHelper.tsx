
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { handleLinkedInCallback, processLinkedInProfile, saveLinkedInDataToSupabase } from "@/utils/linkedInIntegration";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const LinkedInAuthHelper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const processAuthCode = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const savedState = sessionStorage.getItem("linkedin_oauth_state");
      
      // Clear saved state
      sessionStorage.removeItem("linkedin_oauth_state");
      
      if (!code) {
        setError("No authorization code found in the URL");
        return;
      }
      
      if (state !== savedState) {
        setError("Invalid state parameter. Authentication request may have been tampered with.");
        return;
      }
      
      setIsProcessing(true);
      
      try {
        // Get LinkedIn profile data
        const linkedInProfile = await handleLinkedInCallback(code);
        
        // Process the profile data
        const processedProfile = processLinkedInProfile(linkedInProfile);
        
        // If user is authenticated, save data to Supabase
        if (user) {
          await saveLinkedInDataToSupabase(processedProfile, user.id);
        }
        
        // Store in localStorage for demo purposes
        localStorage.setItem("linkedInProfile", JSON.stringify(processedProfile));
        
        setSuccess(true);
        
        toast({
          title: "LinkedIn Connected",
          description: "Your LinkedIn profile has been successfully connected.",
        });
        
        // Wait 2 seconds before redirecting for better UX
        setTimeout(() => {
          navigate("/linkedin", { replace: true });
        }, 2000);
        
      } catch (err) {
        console.error("LinkedIn authentication error:", err);
        setError(err.message || "Failed to authenticate with LinkedIn");
        
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: err.message || "Failed to connect with LinkedIn",
        });
      } finally {
        setIsProcessing(false);
      }
    };
    
    if (searchParams.get("code")) {
      processAuthCode();
    }
  }, [searchParams, navigate, toast, user]);
  
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      {isProcessing && (
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Connecting to LinkedIn...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center p-6 max-w-md">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Connection Failed</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => navigate("/linkedin")}>
            Return to LinkedIn Page
          </Button>
        </div>
      )}
      
      {success && (
        <div className="text-center p-6 max-w-md">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Successfully Connected</h2>
          <p className="text-muted-foreground">Your LinkedIn profile has been successfully connected. Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default LinkedInAuthHelper;
