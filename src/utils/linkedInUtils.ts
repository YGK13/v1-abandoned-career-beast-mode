
import { supabase } from "@/integrations/supabase/client";

// Types for LinkedIn integration
export type SSOProvider = "google" | "linkedin";

// Generate LinkedIn OAuth URL
export const generateLinkedInAuthUrl = () => {
  // Base URL for LinkedIn OAuth 2.0
  const baseUrl = "https://www.linkedin.com/oauth/v2/authorization";
  
  // Required parameters
  const params = new URLSearchParams({
    response_type: "code",
    client_id: "77kzqqoduziywo", // LinkedIn Client ID
    redirect_uri: `${window.location.origin}/linkedin/callback`,
    state: generateRandomState(),
    scope: "r_liteprofile r_emailaddress",
  });
  
  return `${baseUrl}?${params.toString()}`;
};

// Generate a random state parameter for CSRF protection
const generateRandomState = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Exchange the authorization code for profile data
export const exchangeLinkedInCode = async (code: string) => {
  try {
    const { data, error } = await supabase.functions.invoke("linkedin-auth", {
      body: {
        action: "exchange_token",
        code,
        redirectUri: `${window.location.origin}/linkedin/callback`,
      },
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error exchanging LinkedIn code:", error);
    throw error;
  }
};

// Save LinkedIn profile to Supabase
export const saveLinkedInProfile = async (profile: any, userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_linkedin_profiles")
      .upsert({
        user_id: userId,
        linkedin_id: profile.id,
        full_name: profile.fullName,
        email: profile.email,
        profile_url: profile.profileUrl,
        data: profile,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving LinkedIn profile:", error);
    throw error;
  }
};

// Get LinkedIn profile data for a user
export const getLinkedInProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_linkedin_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    return null;
  }
};

// Disconnect LinkedIn profile
export const disconnectLinkedInProfile = async (userId: string) => {
  try {
    const { error } = await supabase
      .from("user_linkedin_profiles")
      .delete()
      .eq("user_id", userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error disconnecting LinkedIn profile:", error);
    throw error;
  }
};

// Simulated import process for demonstration purposes
export const simulateImportProcess = (
  setIsImporting: React.Dispatch<React.SetStateAction<boolean>>,
  setImportProgress: React.Dispatch<React.SetStateAction<number>>,
  onComplete?: () => void
) => {
  setIsImporting(true);
  setImportProgress(0);
  
  const totalSteps = 5;
  let currentStep = 0;
  
  const interval = setInterval(() => {
    currentStep++;
    setImportProgress(Math.round((currentStep / totalSteps) * 100));
    
    if (currentStep >= totalSteps) {
      clearInterval(interval);
      
      // If there's a completion callback, execute it after a short delay
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }
  }, 1000);
};
