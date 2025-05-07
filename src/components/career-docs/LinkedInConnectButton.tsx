
import React, { useState } from "react";
import { Linkedin, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface LinkedInConnectButtonProps {
  onClick: () => void;
}

const LinkedInConnectButton: React.FC<LinkedInConnectButtonProps> = ({ onClick }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get the redirect URI from the current environment
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/linkedin` : '';

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
      
      // Using Supabase auth directly with LinkedIn OIDC provider
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: redirectUri,
          scopes: 'openid profile email',
          queryParams: {
            state: `linkedin-auth-${Date.now()}`
          }
        }
      });
      
      if (error) {
        console.error("LinkedIn SSO error:", error);
        setDebugInfo({
          error: error.message,
          provider: 'linkedin_oidc',
          redirectUrl: redirectUri
        });
        toast({
          title: "Connection Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      if (!data.url) {
        throw new Error("No authentication URL returned from Supabase");
      }
      
      console.log("Redirecting to LinkedIn OAuth URL:", data.url);
      window.location.href = data.url;
      
    } catch (error: any) {
      console.error("Error connecting with LinkedIn:", error);
      setDebugInfo({
        error: error.message,
        stack: error.stack
      });
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

        {/* Debug information toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDebugInfo(!showDebugInfo)}
        >
          {showDebugInfo ? "Hide" : "Show"} Debug Info
        </Button>

        {showDebugInfo && (
          <div className="mt-4 p-3 bg-muted rounded-md text-xs overflow-auto max-h-[200px]">
            <h4 className="font-medium mb-2">Current Configuration:</h4>
            <p><strong>Redirect URI:</strong> {redirectUri}</p>
            <p><strong>Provider:</strong> linkedin_oidc</p>
            <p><strong>Required Scopes:</strong> openid profile email</p>
            
            {debugInfo && (
              <>
                <h4 className="font-medium mt-3 mb-1">Last Error:</h4>
                <pre className="whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInConnectButton;
