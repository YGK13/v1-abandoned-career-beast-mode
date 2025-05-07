
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
  
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log(`Initiating ${provider} SSO login`);
      
      // Get the correct Supabase provider string
      const supabaseProvider = getSupabaseProvider(provider);
      console.log(`Using Supabase provider: ${supabaseProvider}`);
      
      // Get the full domain for the redirect URL
      const origin = window.location.origin;
      const redirectUrl = `${origin}/${provider.toLowerCase()}`;
      
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
            state: `${provider.toLowerCase()}-auth-${Date.now()}`,
          } : undefined,
        }
      });
      
      if (error) {
        console.error(`${provider} SSO error:`, error);
        toast({
          title: "Authentication Error",
          description: `Error: ${error.message}`,
          variant: "destructive",
        });
        
        if (onError) onError(error);
        return;
      }
      
      if (!data.url) {
        throw new Error("No authentication URL generated");
      }
      
      // If successful, redirect the user to the OAuth provider
      console.log(`${provider} SSO initiated successfully, redirecting to:`, data.url);
      window.location.href = data.url;
      
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
