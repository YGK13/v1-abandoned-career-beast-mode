
import React, { useState, useEffect } from "react";
import { Linkedin, Upload, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { generateLinkedInAuthUrl } from "@/utils/linkedInIntegration";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface LinkedInConnectButtonProps {
  onClick: () => void;
}

const LinkedInConnectButton: React.FC<LinkedInConnectButtonProps> = ({ onClick }) => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [configData, setConfigData] = useState<any>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get the redirect URI from the current environment
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/linkedin` : '';

  useEffect(() => {
    // Fetch LinkedIn config info for debugging
    const fetchConfigInfo = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('linkedin-auth-config');
        
        if (error) {
          console.error("Error fetching LinkedIn config:", error);
          setConfigError(error.message || "Failed to fetch LinkedIn configuration");
          return;
        }
        
        console.log("LinkedIn config data:", data);
        setConfigData(data);
      } catch (err) {
        console.error("Error in config fetch:", err);
        setConfigError("An unexpected error occurred while fetching LinkedIn configuration");
      }
    };
    
    fetchConfigInfo();
  }, []);

  const handleConnectLinkedIn = async () => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in before connecting your LinkedIn account",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
    
    try {
      setIsConnecting(true);
      // Generate and redirect to LinkedIn OAuth URL
      const authUrl = await generateLinkedInAuthUrl();
      console.log("Redirecting to LinkedIn OAuth URL:", authUrl);
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error generating LinkedIn auth URL:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect with LinkedIn. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg hover:border-primary/40 transition-colors">
        <Upload size={36} className="text-muted-foreground mb-4" />
        <h4 className="text-lg font-medium mb-2">Connect with LinkedIn</h4>
        <p className="text-center text-sm text-muted-foreground mb-6 max-w-md">
          Fast-track your onboarding by importing your professional profile, skills, and work history directly from LinkedIn.
        </p>
        
        {/* Show warning if not logged in */}
        {!user && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Required</AlertTitle>
            <AlertDescription>
              You need to be logged in before connecting your LinkedIn account.
              <Button variant="link" onClick={() => navigate("/auth")}>
                Login now
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col space-y-3 w-full max-w-xs">
          <Button 
            variant="default" 
            className="bg-[#0a66c2] hover:bg-[#0a66c2]/90"
            onClick={handleConnectLinkedIn}
            disabled={isConnecting || !user}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
              </>
            ) : (
              <>
                <Linkedin className="mr-2 h-4 w-4" /> Connect with LinkedIn
              </>
            )}
          </Button>
          
          <Dialog open={showLoginOptions} onOpenChange={setShowLoginOptions}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Connect with your account</DialogTitle>
                <DialogDescription>
                  Choose your preferred sign-in method to import your professional profile
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center">Please use the direct LinkedIn connection option.</p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Debug information section */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDebugInfo(!showDebugInfo)}
          >
            {showDebugInfo ? "Hide" : "Show"} Debug Info
          </Button>

          {showDebugInfo && (
            <>
              <Alert className="mt-4 text-xs overflow-auto max-h-[300px]">
                <AlertTitle>LinkedIn App Configuration</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p><strong>Current URL:</strong> {window.location.href}</p>
                  <p><strong>Redirect URI:</strong> {redirectUri}</p>
                  <p><strong>Required Scopes:</strong> openid, profile, email</p>
                  
                  {configData && (
                    <>
                      <div className="border-t border-muted pt-2 mt-2">
                        <p><strong>Config Debug:</strong></p>
                        <p>Client ID: {configData.clientId ? "Present" : "Missing"}</p>
                        <p>Configured Redirect URL: {configData.redirectUrl || "Not configured"}</p>
                        {configData.expectedRedirectUrl && (
                          <p>Expected URL: {configData.expectedRedirectUrl}</p>
                        )}
                      </div>
                    </>
                  )}
                  
                  {configError && (
                    <div className="text-destructive mt-2">
                      <p><strong>Error fetching config:</strong> {configError}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LinkedInConnectButton;
