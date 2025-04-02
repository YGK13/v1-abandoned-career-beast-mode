
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getSupabaseProvider } from "@/components/auth/SSOProviderConfig";
import { SSOProvider } from "@/utils/linkedInUtils";

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
      
      // Disable hCaptcha completely
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: supabaseProvider as any,
        options: {
          redirectTo: `${window.location.origin}/auth`,
          scopes: provider.toLowerCase() === 'linkedin' ? 'r_liteprofile r_emailaddress' : undefined
        }
      });
      
      if (error) {
        console.error(`${provider} SSO error:`, error);
        toast({
          title: "Authentication Error",
          description: error.message,
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
        description: error.message || "An unexpected error occurred",
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
