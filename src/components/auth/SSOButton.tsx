
import React, { useId } from "react";
import { Button } from "@/components/ui/button";
import { SSOProvider } from "@/utils/linkedInUtils";
import { useToast } from "@/hooks/use-toast";
import { getProviderConfig } from "@/components/auth/SSOProviderConfig";
import { useTurnstile } from "@/utils/turnstileUtils";
import { useSSOAuth } from "@/hooks/useSSOAuth";

interface SSOButtonProps {
  provider: SSOProvider;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({ 
  provider, 
  className,
  onSuccess,
  onError
}) => {
  const { toast } = useToast();
  const containerId = useId();
  const turnstileContainerId = `turnstile-container-${containerId}`;
  
  const { handleSignIn, isLoading } = useSSOAuth({
    provider, 
    onSuccess,
    onError
  });
  
  const { getToken } = useTurnstile({
    containerId: turnstileContainerId,
  });

  const config = getProviderConfig(provider);

  const handleClick = async () => {
    toast({
      title: `Connecting to ${config.label}...`,
      description: "You will be redirected to sign in.",
    });
    
    // Get Turnstile token if available
    const captchaToken = getToken();
    
    if (!captchaToken) {
      console.log(`No Turnstile token available for ${provider}, proceeding anyway`);
      toast({
        title: "Captcha verification recommended",
        description: "Proceeding without captcha verification",
        variant: "destructive",
      });
    } else {
      console.log(`Captcha token available for ${provider}: ${captchaToken.substring(0, 10)}...`);
    }
    
    await handleSignIn(captchaToken);
  };

  return (
    <div className="space-y-3">
      <Button 
        variant="outline"
        className={`w-full ${config.className} ${className}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin">○</span>
        ) : (
          config.icon
        )}
        Sign in with {config.label}
      </Button>
      
      {/* Hidden div for Turnstile widget */}
      <div id={turnstileContainerId} className="h-0 overflow-hidden"></div>
    </div>
  );
};

export default SSOButton;
