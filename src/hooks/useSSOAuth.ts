
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getSupabaseProvider } from "@/components/auth/SSOProviderConfig";

export interface SSOAuthOptions {
  provider: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSSOAuth = (options: SSOAuthOptions) => {
  const { provider, onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Get the correct Supabase provider string
  const getProvider = () => {
    try {
      return getSupabaseProvider(provider);
    } catch (error) {
      console.error(`Error getting provider for ${provider}:`, error);
      return provider.toLowerCase();
    }
  };
  
  const supabaseProvider = getProvider();
  
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log(`Initiating ${provider} SSO login with provider: ${supabaseProvider}`);
      
      // Get the full domain for the redirect URL
      const origin = window.location.origin;
      
      // Make sure we're always redirecting to /linkedin for LinkedIn authentication
      const redirectUrl = `${origin}/linkedin`;
      
      console.log(`Redirect URL: ${redirectUrl}`);
      
      // Using OpenID Connect scopes for LinkedIn
      const scopes = provider.toLowerCase() === 'linkedin' 
        ? 'openid profile email' 
        : undefined;
      
      console.log(`Using scopes: ${scopes}`);
      
      // Configure the OAuth request with the correct parameters
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider as any,
        options: {
          redirectTo: redirectUrl,
          scopes: scopes,
          queryParams: provider.toLowerCase() === 'linkedin' ? {
            // Adding a unique state parameter helps with debugging
            state: `linkedin-auth-${Date.now()}`,
          } : undefined,
        }
      });
      
      if (error) {
        console.error(`${provider} SSO error:`, error);
        toast({
          title: "Authentication Error",
          description: `Error: ${error.message}. Please make sure your LinkedIn app is properly configured with correct redirect URLs.`,
          variant: "destructive",
        });
        
        if (onError) onError(error);
        return;
      }
      
      // If successful, the user will be redirected to the OAuth provider
      console.log(`${provider} SSO initiated successfully`, data);
      
    } catch (error: any) {
      console.error(`Unexpected ${provider} SSO error:`, error);
      toast({
        title: "Authentication Error",
        description: error.message || "An unexpected error occurred during authentication",
        variant: "destructive",
      });
      
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    handleSignIn
  };
};
