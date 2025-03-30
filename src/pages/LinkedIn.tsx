
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import LinkedInProfile from "@/components/career-docs/LinkedInProfile";
import LinkedInProfileImport from "@/components/career-docs/LinkedInProfileImport";
import LinkedInPostSuggestions from "@/components/career-docs/LinkedInPostSuggestions";
import LinkedInPostHistory from "@/components/career-docs/linkedin-posts/LinkedInPostHistory";
import LinkedInNextSteps from "@/components/career-docs/LinkedInNextSteps";
import LinkedInAuthHelper from "@/components/career-docs/LinkedInAuthHelper";
import { useSearchParams } from "react-router-dom";
import { getUserLinkedInProfile } from "@/utils/linkedInProfile";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
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
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Checking LinkedIn connection...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {isCallback ? (
        <LinkedInAuthHelper />
      ) : (
        <div className="page-container">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div>
                <h1 className="text-4xl font-bold">LinkedIn Profile Optimization</h1>
                <p className="text-muted-foreground mt-1">
                  Improve your professional presence on the world's largest career network
                </p>
              </div>
            </div>
            <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md dark:bg-blue-950/20 dark:border-blue-900/30">
              <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Your data is protected with two-factor authentication during the onboarding process.
              </p>
            </div>
          </header>

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
      )}
    </Layout>
  );
};

export default LinkedIn;
