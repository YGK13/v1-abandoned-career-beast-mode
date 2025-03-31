
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getSupabaseProvider } from "@/components/auth/SSOProviderConfig";
import { SSOProvider } from "@/utils/linkedInUtils";

export interface SSOAuthOptions {
  provider: SSOProvider;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSSOAuth = (options: SSOAuthOptions) => {
  const { provider, onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSignIn = async (captchaToken: string | null) => {
    setIsLoading(true);
    
    try {
      const supabaseProvider = getSupabaseProvider(provider);
      
      // Create the redirect URL with captcha token as a URL parameter if available
      const redirectTo = captchaToken 
        ? `${window.location.origin}/auth?captchaToken=${encodeURIComponent(captchaToken)}`
        : `${window.location.origin}/auth`;
      
      // Prepare Supabase OAuth options
      const options = {
        redirectTo,
        skipBrowserRedirect: false,
        queryParams: captchaToken ? { captchaToken } : undefined
      };
      
      console.log(`Using redirect URL: ${redirectTo}`);
      console.log(`Starting OAuth flow for provider: ${provider} (Supabase provider: ${supabaseProvider})`);
      
      // Start the OAuth flow
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider as any,
        options
      });
      
      if (error) {
        throw error;
      }

      // The user will be redirected, so we don't need to do anything else here
      console.log("OAuth initiated successfully:", data);
      
    } catch (error: any) {
      console.error(`Sign in error:`, error);
      toast({
        title: "Authentication failed",
        description: error.message || `There was an issue with your login.`,
        variant: "destructive",
      });
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { isLoading, handleSignIn };
};
