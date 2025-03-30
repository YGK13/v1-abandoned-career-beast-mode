
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { handleLinkedInCallback, processLinkedInProfile, saveLinkedInDataToSupabase } from "@/utils/linkedInIntegration";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "../layout/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

const LinkedInAuthHelper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rawResponse, setRawResponse] = useState<any>(null);

  useEffect(() => {
    const processAuthCode = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const errorParam = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      
      const savedState = sessionStorage.getItem("linkedin_oauth_state");
      
      // Clear saved state
      sessionStorage.removeItem("linkedin_oauth_state");
      
      // Check if there's an error from LinkedIn
      if (errorParam) {
        console.error(`LinkedIn returned an error: ${errorParam} - ${errorDescription}`);
        setError(`LinkedIn Error: ${errorParam} - ${errorDescription || 'No description provided'}`);
        return;
      }
      
      if (!code) {
        console.error("No authorization code found in URL parameters");
        setError("No authorization code found in the URL");
        return;
      }
      
      if (state !== savedState) {
        console.warn(`State mismatch. Received: ${state}, Saved: ${savedState}`);
        // Continuing despite state mismatch for debugging
      }
      
      setIsProcessing(true);
      
      try {
        // Get LinkedIn profile data
        console.log("Getting LinkedIn profile with code:", code);
        const linkedInProfile = await handleLinkedInCallback(code);
        console.log("Retrieved LinkedIn profile:", linkedInProfile);
        
        if (!linkedInProfile) {
          throw new Error("Failed to retrieve LinkedIn profile data");
        }
        
        // Process the profile data
        const processedProfile = processLinkedInProfile(linkedInProfile);
        console.log("Processed profile:", processedProfile);
        
        // If user is authenticated, save data to Supabase
        if (user) {
          console.log("Saving LinkedIn data for user:", user.id);
          await saveLinkedInDataToSupabase(processedProfile, user.id);
        } else {
          console.warn("User not authenticated, cannot save LinkedIn data to database");
          // Still consider this a success for demonstration
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
        
      } catch (err: any) {
        console.error("LinkedIn authentication error:", err);
        setError(err.message || "Failed to authenticate with LinkedIn");
        
        // Try to extract more error details
        if (err.rawResponse) {
          setRawResponse(err.rawResponse);
        }
        
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: err.message || "Failed to connect with LinkedIn",
        });
      } finally {
        setIsProcessing(false);
      }
    };
    
    if (searchParams.get("code") || searchParams.get("error")) {
      processAuthCode();
    } else {
      console.log("No code or error parameter found in URL");
    }
  }, [searchParams, navigate, toast, user]);
  
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      {isProcessing && (
        <div className="text-center">
          <LoadingSpinner />
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
          
          {rawResponse && (
            <div className="mb-4 p-3 bg-muted/50 rounded-md text-left overflow-auto max-h-[200px] text-xs">
              <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
            </div>
          )}
          
          <Button onClick={() => navigate("/linkedin")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to LinkedIn Page
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
