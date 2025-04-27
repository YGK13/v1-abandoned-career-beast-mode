import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { handleLinkedInCallback, processLinkedInProfile, saveLinkedInDataToSupabase } from "@/utils/linkedInIntegration";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import LinkedInAuthError from "./linkedin-auth/LinkedInAuthError";
import LinkedInAuthSuccess from "./linkedin-auth/LinkedInAuthSuccess";
import LinkedInAuthProcessing from "./linkedin-auth/LinkedInAuthProcessing";

const LinkedInAuthHelper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const processAuthCode = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const errorParam = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      
      const savedState = sessionStorage.getItem("linkedin_oauth_state");
      sessionStorage.removeItem("linkedin_oauth_state");
      
      const debug = {
        currentUrl: window.location.href,
        params: Object.fromEntries(searchParams.entries()),
        savedState,
        userAuthenticated: !!user,
        timestamp: new Date().toISOString(),
        appClientId: "77kzqpoduzjywo"
      };
      
      setDebugInfo(debug);
      
      console.log("LinkedIn callback received:", {
        code: code ? `${code.substring(0, 10)}...` : null,
        state,
        error: errorParam,
        errorDescription,
        savedState,
        ...debug
      });
      
      if (errorParam) {
        console.error(`LinkedIn returned an error: ${errorParam} - ${errorDescription}`);
        
        if (errorDescription?.includes("application is disabled")) {
          setError(`LinkedIn Error: Your LinkedIn application appears to be disabled or not properly configured.
          
Please check:
1. Your LinkedIn app status in the LinkedIn Developer Portal
2. Your app is set to "Live" mode, not "Development" mode
3. The redirect URI is set correctly to ${window.location.origin}/linkedin
4. Your app has the necessary OpenID permissions (openid, profile, email)`);
        } else {
          setError(`LinkedIn Error: ${errorParam} - ${errorDescription || 'No description provided'}`);
        }
        return;
      }
      
      if (!code) {
        console.error("No authorization code found in URL parameters");
        setError("No authorization code found in the URL. Please try connecting again.");
        return;
      }
      
      if (state !== savedState) {
        console.warn(`State mismatch. Received: ${state}, Saved: ${savedState}`);
      }
      
      setIsProcessing(true);
      
      try {
        const linkedInProfile = await handleLinkedInCallback(code);
        console.log("Retrieved LinkedIn profile:", linkedInProfile);
        
        if (!linkedInProfile) {
          throw new Error("Failed to retrieve LinkedIn profile data");
        }
        
        const processedProfile = processLinkedInProfile(linkedInProfile);
        console.log("Processed profile:", processedProfile);
        
        if (user) {
          console.log("Saving LinkedIn data for user:", user.id);
          await saveLinkedInDataToSupabase(processedProfile, user.id);
          
          setSuccess(true);
          
          toast({
            title: "LinkedIn Connected",
            description: "Your LinkedIn profile has been successfully connected.",
          });
          
          setTimeout(() => {
            navigate("/linkedin", { replace: true });
          }, 2000);
        } else {
          console.warn("User not authenticated, cannot save LinkedIn data to database");
          setError("You need to be logged in to connect your LinkedIn profile. Please log in first.");
        }
        
      } catch (err: any) {
        console.error("LinkedIn authentication error:", err);
        
        let errorMessage = err.message || "Failed to authenticate with LinkedIn";
        
        if (errorMessage.includes("LinkedIn profiles table not available")) {
          errorMessage = "Database setup issue: LinkedIn profiles table not available. Please contact support.";
        } else if (errorMessage.includes("API request failed")) {
          errorMessage = "LinkedIn API error: " + errorMessage;
        } else if (errorMessage.includes("application is disabled") || errorMessage.includes("not authorized")) {
          errorMessage = "LinkedIn application issue: The LinkedIn application may be disabled or not properly configured. Try using the other Career Beast Mode app in your LinkedIn Developer Portal.";
        }
        
        setError(errorMessage);
        
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
  
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      {isProcessing && <LinkedInAuthProcessing />}
      
      {error && (
        <LinkedInAuthError 
          error={error}
          debugInfo={debugInfo}
          rawResponse={rawResponse}
        />
      )}
      
      {success && <LinkedInAuthSuccess />}
    </div>
  );
};

export default LinkedInAuthHelper;
