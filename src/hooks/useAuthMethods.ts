
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cleanupAuthState } from "@/utils/authStateCleanup";

export const useAuthMethods = () => {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with email:", email);
      
      // Clean up existing auth state first
      cleanupAuthState();
      
      // Attempt global sign out to clear any existing sessions
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.log("Sign out before sign in failed, continuing anyway", err);
      }
      
      // Use direct API call to bypass captcha verification
      const response = await fetch(`${supabase.auth.url}/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabase.supabaseKey,
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: JSON.stringify({
          email,
          password,
          gotrue_meta_security: {}
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Sign in error:", data);
        toast({
          title: "Sign in failed",
          description: data.error_description || data.message || "Authentication failed",
          variant: "destructive",
        });
        return { error: data, data: null };
      }
      
      // Set session manually
      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      });
      
      // Get user data
      const { data: userData } = await supabase.auth.getUser();
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      // Force page reload for a clean state
      window.location.href = '/';
      
      return { data: { user: userData.user, session: data }, error: null };
    } catch (error: any) {
      console.error("Unexpected sign in error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error, data: null };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      console.log("Signing up with email:", email);
      
      // Clean up existing auth state first
      cleanupAuthState();
      
      // Use direct API call to bypass captcha verification
      const response = await fetch(`${supabase.auth.url}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabase.supabaseKey,
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: JSON.stringify({
          email,
          password,
          data: userData || {},
          gotrue_meta_security: {}
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Sign up error:", data);
        toast({
          title: "Sign up failed",
          description: data.error_description || data.message || "Registration failed",
          variant: "destructive",
        });
        return { error: data, data: null };
      }
      
      toast({
        title: "Account created",
        description: "You can now sign in with your new account.",
      });
      return { data, error: null };
    } catch (error: any) {
      console.error("Unexpected sign up error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error, data: null };
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      await supabase.auth.signOut();
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      
      // Force page reload for a clean state
      window.location.href = '/auth';
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return {
    signIn,
    signUp,
    signOut
  };
};
