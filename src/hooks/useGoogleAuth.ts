
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { handleGoogleCallback, processGoogleProfile, saveGoogleDataToSupabase } from "@/utils/googleIntegration";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export const useGoogleAuth = () => {
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
      
      // Get the state we saved before redirecting to Google
      const savedState = sessionStorage.getItem("google_oauth_state");
      
      // Clear saved state
      sessionStorage.removeItem("google_oauth_state");
      
      // Check if there's an error from Google
      if (errorParam) {
        console.error(`Google returned an error: ${errorParam} - ${errorDescription}`);
        setError(`Google Error: ${errorParam} - ${errorDescription || 'No description provided'}`);
        return;
      }
      
      if (!code) {
        console.error("No authorization code found in URL parameters");
        setError("No authorization code found in the URL");
        return;
      }
      
      if (state !== savedState) {
        console.warn(`State mismatch. Received: ${state}, Saved: ${savedState}`);
        // Continue despite state mismatch for debugging
      }
      
      setIsProcessing(true);
      
      try {
        // Get Google profile data
        console.log("Getting Google profile with code:", code);
        const googleProfile = await handleGoogleCallback(code);
        console.log("Retrieved Google profile:", googleProfile);
        
        if (!googleProfile) {
          throw new Error("Failed to retrieve Google profile data");
        }
        
        // Process the profile data
        const processedProfile = processGoogleProfile(googleProfile);
        console.log("Processed profile:", processedProfile);
        
        // If user is authenticated, save data to Supabase
        if (user) {
          console.log("Saving Google data for user:", user.id);
          await saveGoogleDataToSupabase(processedProfile, user.id);
          
          // Show success message
          setSuccess(true);
          
          toast({
            title: "Google Connected",
            description: "Your Google account has been successfully connected.",
          });
          
          // Wait 2 seconds before redirecting for better UX
          setTimeout(() => {
            navigate("/google", { replace: true });
          }, 2000);
        } else {
          console.warn("User not authenticated, cannot save Google data to database");
          setError("You need to be logged in to connect your Google account");
        }
        
      } catch (err: any) {
        console.error("Google authentication error:", err);
        
        // Extract more detailed error message
        let errorMessage = err.message || "Failed to authenticate with Google";
        
        // Check for specific error types
        if (errorMessage.includes("Google profiles table not available")) {
          errorMessage = "Database setup issue: Google profiles table not available. Please contact support.";
        } else if (errorMessage.includes("API request failed")) {
          errorMessage = "Google API error: " + errorMessage;
        }
        
        setError(errorMessage);
        
        // Try to extract more error details
        if (err.rawResponse) {
          setRawResponse(err.rawResponse);
        }
        
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: errorMessage,
        });
      } finally {
        setIsProcessing(false);
      }
    };
    
    if (searchParams.get("code") || searchParams.get("error")) {
      processAuthCode();
    } else {
      console.log("No code or error parameter found in URL");
      setError("Missing authorization code. Please try connecting again.");
    }
  }, [searchParams, navigate, toast, user]);

  return {
    isProcessing,
    error,
    success,
    rawResponse
  };
};
