
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
      console.log("LinkedInAuthHelper mounted, processing URL params");
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const errorParam = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      
      const savedState = sessionStorage.getItem("linkedin_oauth_state");
      console.log("Retrieved linkedin_oauth_state from session storage:", savedState);
      sessionStorage.removeItem("linkedin_oauth_state");
      
      // Gather debug info
      const debug = {
        currentUrl: window.location.href,
        currentPath: window.location.pathname,
        fullOrigin: window.location.origin,
        domainPath: `${window.location.origin}/linkedin`,
        params: Object.fromEntries(searchParams.entries()),
        currentTimestamp: new Date().toISOString(),
        savedState,
        userAuthenticated: !!user,
        userEmail: user?.email || null,
      };
      
      setDebugInfo(debug);
      
      console.log("LinkedIn callback debug info:", debug);
      
      if (errorParam) {
        console.error(`LinkedIn returned an error: ${errorParam} - ${errorDescription}`);
        
        let detailedError = `LinkedIn Error: ${errorParam} - ${errorDescription || 'No description provided'}`;
        
        if (errorDescription?.includes("application is disabled")) {
          detailedError = `LinkedIn Error: Your LinkedIn application appears to be disabled or not properly configured.
          
Please check:
1. Your LinkedIn app status in the LinkedIn Developer Portal - ensure the app is marked as "Live" not "Development"
2. Confirm that redirect URIs are properly configured:
   - Current URL: ${window.location.href}
   - This should be listed as an authorized redirect URI in your LinkedIn app settings
   - If using Supabase environment variable, check LINKEDIN_REDIRECT_URL is set to: ${window.location.origin}/linkedin
3. If app is in Development mode, confirm you've been added as an authorized test user
4. Verify the app has the necessary OpenID permissions (openid, profile, email)
5. Check that client ID and secret are correctly entered in Supabase secrets`;
        }
        
        setError(detailedError);
        return;
      }
      
      if (!code) {
        console.error("No authorization code found in URL parameters");
        setError("No authorization code found in the URL. Please try connecting again.");
        return;
      }
      
      if (state !== savedState) {
        console.warn(`State mismatch. Received: ${state}, Saved: ${savedState}`);
        // Continue anyway for debugging purposes
      }
      
      // Check if user is logged in before proceeding
      if (!user) {
        console.warn("User not authenticated, cannot save LinkedIn data to database");
        setError("You need to be logged in to connect your LinkedIn profile. Please log in first and try again.");
        
        // Add navigation option to redirect to auth page
        setTimeout(() => {
          navigate("/auth", { replace: true });
        }, 5000);
        return;
      }
      
      setIsProcessing(true);
      
      try {
        console.time("linkedin-callback-processing");
        console.log("About to call handleLinkedInCallback with code and current URL:", window.location.href);
        const linkedInProfile = await handleLinkedInCallback(code);
        console.timeEnd("linkedin-callback-processing");
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
        }
      } catch (err: any) {
        console.error("LinkedIn authentication error:", err);
        
        let errorMessage = err.message || "Failed to authenticate with LinkedIn";
        
        if (errorMessage.includes("LinkedIn profiles table not available")) {
          errorMessage = "Database setup issue: LinkedIn profiles table not available. Please contact support.";
        } else if (errorMessage.includes("API request failed")) {
          errorMessage = "LinkedIn API error: " + errorMessage;
        } else if (errorMessage.includes("application is disabled") || errorMessage.includes("not authorized")) {
          errorMessage = "LinkedIn application issue: The LinkedIn application may be disabled or not properly configured. Try checking your app settings in the LinkedIn Developer Portal.";
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
