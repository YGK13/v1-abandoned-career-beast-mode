
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

/**
 * Fetches a user's profile from the database
 */
export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  
  return data;
};

/**
 * Signs in a user with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    toast({
      title: "Sign in failed",
      description: response.error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "Welcome back!",
      description: "You've successfully signed in.",
    });
  }

  return response;
};

/**
 * Signs up a user with email and password
 */
export const signUpWithEmail = async (email: string, password: string, userData?: any) => {
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });

  if (response.error) {
    toast({
      title: "Sign up failed",
      description: response.error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "Account created",
      description: "Please check your email to confirm your account.",
    });
  }

  return response;
};

/**
 * Signs out the current user
 */
export const signOutUser = async () => {
  await supabase.auth.signOut();
  toast({
    title: "Signed out",
    description: "You've been successfully signed out.",
  });
};
