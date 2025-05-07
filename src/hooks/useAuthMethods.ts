
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
      
      // Sign in without captcha
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Sign in error:", error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      // Force page reload for a clean state
      window.location.href = '/';
      
      return { data, error: null };
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
      
      // Sign up without captcha
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) {
        console.error("Sign up error:", error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return { error, data: null };
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
