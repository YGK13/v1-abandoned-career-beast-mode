
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import LinkedInProfile from "@/components/career-docs/LinkedInProfile";
import LinkedInProfileImport from "@/components/career-docs/LinkedInProfileImport";
import LinkedInPostSuggestions from "@/components/career-docs/LinkedInPostSuggestions";
import LinkedInPostHistory from "@/components/career-docs/linkedin-posts/LinkedInPostHistory";
import LinkedInNextSteps from "@/components/career-docs/LinkedInNextSteps";
import LinkedInAuthHelper from "@/components/career-docs/LinkedInAuthHelper";
import LinkedInPageHeader from "@/components/linkedin/LinkedInPageHeader";
import LinkedInLoadingState from "@/components/linkedin/LinkedInLoadingState";
import { useSearchParams } from "react-router-dom";
import { getUserLinkedInProfile } from "@/utils/linkedInProfile";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LinkedIn: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isCallback, setIsCallback] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if this is a callback from LinkedIn OAuth
    if (searchParams.get("code")) {
      setIsCallback(true);
      setIsLoading(false);
      return;
    }
    
    // Check if the user has already connected their LinkedIn profile
    if (user) {
      const checkConnection = async () => {
        try {
          setIsLoading(true);
          console.log("Checking LinkedIn connection for user:", user.id);
          const profile = await getUserLinkedInProfile();
          console.log("LinkedIn profile check result:", profile);
          
          setIsConnected(profile !== null);
        } catch (error) {
          console.error("Error checking LinkedIn connection:", error);
          toast({
            variant: "destructive",
            title: "Connection Error",
            description: "Failed to check LinkedIn connection status",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      checkConnection();
    } else {
      console.log("No user logged in, can't check LinkedIn connection");
      setIsLoading(false);
    }
  }, [searchParams, user, toast]);
  
  // Show loading state while checking connection status
  if (isLoading) {
    return (
      <Layout>
        <LinkedInLoadingState />
      </Layout>
    );
  }
  
  // Show callback handler if this is a callback from LinkedIn OAuth
  if (isCallback) {
    return (
      <Layout>
        <LinkedInAuthHelper />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="page-container">
        <LinkedInPageHeader />

        {/* LinkedIn Profile Import Section - Only show if not connected */}
        {!isConnected && <LinkedInProfileImport />}
        
        {/* LinkedIn Profile Assessment Section - Only show if connected */}
        {isConnected && <LinkedInProfile />}
        
        {/* LinkedIn Post History & Analytics Section - Only show if connected */}
        {isConnected && <LinkedInPostHistory />}
        
        {/* LinkedIn Post Suggestions Section - Only show if connected */}
        {isConnected && <LinkedInPostSuggestions />}
        
        {/* Next Steps - Navigation options to other sections */}
        <LinkedInNextSteps />
      </div>
    </Layout>
  );
};

export default LinkedIn;
