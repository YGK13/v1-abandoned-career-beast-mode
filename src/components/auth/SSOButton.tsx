
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SSOProvider } from "@/utils/linkedInUtils";
import { Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Provider } from "@supabase/supabase-js";

interface SSOButtonProps {
  provider: SSOProvider;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// Declare window.turnstile for TypeScript
declare global {
  interface Window {
    turnstile: any;
  }
}

const SSOButton: React.FC<SSOButtonProps> = ({ 
  provider, 
  className,
  onSuccess,
  onError
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize Cloudflare Turnstile
  useEffect(() => {
    const renderTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        // Use hCaptcha site key from Supabase secrets
        const siteKey = "0x4AAAAAAABI4S10D2f9gYqA";
        
        console.log(`Rendering Turnstile for ${provider} button with site key:`, siteKey);
        turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          callback: function(token: string) {
            console.log(`Turnstile token received for ${provider}:`, token.substring(0, 10) + "...");
            setCaptchaToken(token);
          },
          "expired-callback": function() {
            console.log(`Turnstile token expired for ${provider}`);
            setCaptchaToken(null);
          }
        });
      }
    };

    // Attempt to render initially or wait for Turnstile to load
    if (window.turnstile) {
      renderTurnstile();
    } else {
      const checkTurnstileLoaded = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstileLoaded);
          renderTurnstile();
        }
      }, 100);
      
      return () => clearInterval(checkTurnstileLoaded);
    }

    // Clean up Turnstile widget on unmount
    return () => {
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    };
  }, [provider]);
  
  const getProviderConfig = () => {
    switch (provider) {
      case "linkedin":
        return {
          icon: <Linkedin className="mr-2 h-4 w-4" />,
          label: "LinkedIn",
          className: "bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white"
        };
      case "google":
        return {
          icon: <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>,
          label: "Google",
          className: "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
        };
      case "microsoft":
        return {
          icon: <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="microsoft" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"></path></svg>,
          label: "Microsoft",
          className: "bg-[#2f2f2f] hover:bg-[#2f2f2f]/90 text-white"
        };
      case "apple":
        return {
          icon: <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>,
          label: "Apple",
          className: "bg-black hover:bg-black/90 text-white"
        };
      case "github":
        return {
          icon: <Github className="mr-2 h-4 w-4" />,
          label: "GitHub",
          className: "bg-[#24292e] hover:bg-[#24292e]/90 text-white"
        };
      default:
        return {
          icon: null,
          label: typeof provider === 'string' ? provider.charAt(0).toUpperCase() + provider.slice(1) : 'Connect',
          className: "bg-primary hover:bg-primary/90 text-white"
        };
    }
  };

  const config = getProviderConfig();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      toast({
        title: `Connecting to ${config.label}...`,
        description: "You will be redirected to sign in.",
      });
      
      const getSupabaseProvider = (): Provider => {
        switch(provider) {
          case 'linkedin':
            return 'linkedin_oidc';
          case 'microsoft':
            return 'azure';
          case 'apple':
            return 'apple';
          case 'github':
            return 'github';
          case 'google':
            return 'google';
          default:
            return provider as Provider;
        }
      };
      
      // Get Turnstile token if not already set
      if (!captchaToken && window.turnstile && turnstileWidgetId.current) {
        const token = window.turnstile.getResponse(turnstileWidgetId.current);
        if (token) {
          setCaptchaToken(token);
          console.log(`Retrieved Turnstile token for ${provider}:`, token.substring(0, 10) + "...");
        } else {
          console.log(`No Turnstile token available for ${provider}, trying to reset`);
          window.turnstile.reset(turnstileWidgetId.current);
          
          toast({
            title: "Captcha verification required",
            description: "Please complete the captcha verification and try again",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }
      
      console.log(`Starting OAuth flow for provider: ${provider} (Supabase provider: ${getSupabaseProvider()})`);
      console.log(`Captcha token available: ${Boolean(captchaToken)}`);
      
      // Create the redirect URL with captcha token as a URL parameter if available
      const redirectTo = captchaToken 
        ? `${window.location.origin}/auth?captchaToken=${encodeURIComponent(captchaToken)}`
        : `${window.location.origin}/auth`;
      
      // Prepare Supabase OAuth options
      const options = {
        redirectTo,
        skipBrowserRedirect: false,
      };
      
      console.log(`Using redirect URL: ${redirectTo}`);
      
      // Start the OAuth flow
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: getSupabaseProvider(),
        options
      });
      
      if (error) {
        throw error;
      }

      // The user will be redirected, so we don't need to do anything else here
      console.log("OAuth initiated successfully:", data);
      
    } catch (error: any) {
      console.error(`${config.label} sign in error:`, error);
      toast({
        title: "Authentication failed",
        description: error.message || `There was an issue with your ${config.label} login.`,
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
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
      <div ref={turnstileContainerRef} className="h-0 overflow-hidden"></div>
    </div>
  );
};

export default SSOButton;
