
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
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const processAuthCode = async () => {
      console.log("LinkedInAuthHelper mounted, processing URL params");
      
      // Gather all URL parameters for debugging
      const allParams = Object.fromEntries(searchParams.entries());
      console.log("All URL parameters:", allParams);
      
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      
      // Gather debug info
      const debug = {
        currentUrl: window.location.href,
        currentPath: window.location.pathname,
        fullOrigin: window.location.origin,
        domainPath: `${window.location.origin}/linkedin`,
        params: allParams,
        currentTimestamp: new Date().toISOString(),
        userAuthenticated: !!user,
        userEmail: user?.email || null,
      };
      
      setDebugInfo(debug);
      
      console.log("LinkedIn callback debug info:", debug);
      
      if (errorParam) {
        console.error(`LinkedIn returned an error: ${errorParam} - ${errorDescription}`);
        setError(`LinkedIn Error: ${errorParam} - ${errorDescription || 'No description provided'}`);
        return;
      }
      
      if (!code) {
        console.error("No authorization code found in URL parameters");
        setError("No authorization code found in the URL. Please try connecting again.");
        return;
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
        console.log("Processing LinkedIn authentication code");
        const linkedInUser = await handleLinkedInCallback(code);
        console.log("LinkedIn auth completed, user data:", linkedInUser);
        
        if (!linkedInUser) {
          throw new Error("Failed to retrieve LinkedIn profile data");
        }
        
        const processedProfile = processLinkedInProfile(linkedInUser);
        console.log("Processed profile:", processedProfile);
        
        if (user) {
          console.log("Saving LinkedIn data for user:", user.id);
          await saveLinkedInDataToSupabase(processedProfile, user.id);
          
          setSuccess(true);
          
          toast({
            title: "LinkedIn Connected",
            description: "Your LinkedIn profile has been successfully connected.",
          });
          
          // Redirect after short delay
          setTimeout(() => {
            navigate("/linkedin", { replace: true });
          }, 2000);
        }
      } catch (err: any) {
        console.error("LinkedIn authentication error:", err);
        
        let errorMessage = err.message || "Failed to authenticate with LinkedIn";
        setError(errorMessage);
        
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
        />
      )}
      
      {success && <LinkedInAuthSuccess />}
    </div>
  );
};

export default LinkedInAuthHelper;
