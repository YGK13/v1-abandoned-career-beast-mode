
import React, { createContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "./AuthContextTypes";
import { useToast } from "@/hooks/use-toast";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Unexpected error fetching profile:", error);
    }
  };

  // Clean up auth state
  const cleanupAuthState = () => {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          return;
        }

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          console.log("Found existing session");
          setSession(initialSession);
          setUser(initialSession.user);
          
          if (initialSession.user) {
            await fetchProfile(initialSession.user.id);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Authentication methods
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
      
      // IMPORTANT: Sign in WITHOUT using captcha
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
        // No captcha options at all
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
      
      // IMPORTANT: Sign up WITHOUT using captcha
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
          // No captcha options at all
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

  const contextValue: AuthContextType = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
