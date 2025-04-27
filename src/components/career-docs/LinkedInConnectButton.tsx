
import React, { useState } from "react";
import { Linkedin, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { generateLinkedInAuthUrl } from "@/utils/linkedInIntegration";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface LinkedInConnectButtonProps {
  onClick: () => void;
}

const LinkedInConnectButton: React.FC<LinkedInConnectButtonProps> = ({ onClick }) => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  
  // Get the redirect URI from the current environment
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/linkedin` : '';

  const handleConnectLinkedIn = async () => {
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
        <div className="flex flex-col space-y-3 w-full max-w-xs">
          <Button 
            variant="default" 
            className="bg-[#0a66c2] hover:bg-[#0a66c2]/90"
            onClick={handleConnectLinkedIn}
            disabled={isConnecting}
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
          
          <Button
            variant="outline"
            onClick={() => setShowLoginOptions(true)}
          >
            Connect with other platforms
          </Button>

          {/* Debug information button */}
          <Button
            variant="ghost"
            size="sm"
            className="mt-8"
            onClick={() => setShowDebugInfo(!showDebugInfo)}
          >
            {showDebugInfo ? "Hide" : "Show"} Debug Info
          </Button>

          {showDebugInfo && (
            <Alert className="mt-4 text-xs">
              <AlertTitle>LinkedIn App Configuration</AlertTitle>
              <AlertDescription className="space-y-2">
                <p><strong>Redirect URI:</strong> {redirectUri}</p>
                <p><strong>Required Scopes:</strong> openid, profile, email</p>
                <p className="text-sm mt-2">
                  Ensure these match exactly with your LinkedIn Developer Portal settings.
                </p>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default LinkedInConnectButton;
