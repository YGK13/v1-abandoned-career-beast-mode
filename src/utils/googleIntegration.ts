
import { supabase } from "@/integrations/supabase/client";

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
// Get the current origin dynamically to handle different environments
const CURRENT_ORIGIN = window.location.origin;
const GOOGLE_REDIRECT_URI = `${CURRENT_ORIGIN}/google/callback`;

export const generateGoogleAuthUrl = () => {
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2, 15);
  
  // Store state in sessionStorage for validation when the user returns
  sessionStorage.setItem("google_oauth_state", state);
  
  // Define the scopes we're requesting
  const scope = encodeURIComponent("email profile https://www.googleapis.com/auth/gmail.readonly");
  
  console.log("Creating Google auth URL with client ID:", GOOGLE_CLIENT_ID);
  console.log("Google Redirect URI:", GOOGLE_REDIRECT_URI);
  
  // Direct Google OAuth URL with all necessary parameters
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&state=${state}&scope=${scope}&access_type=offline&prompt=consent`;
  
  console.log("Generated Google auth URL:", authUrl);
  
  return authUrl;
};

export const handleGoogleCallback = async (code: string): Promise<any> => {
  try {
    console.log("Calling Supabase function with Google code:", code.substring(0, 10) + "...");
    
    // Exchange the authorization code for an access token using our Supabase edge function
    const { data, error } = await supabase.functions.invoke('google-auth', {
      body: { 
        code, 
        action: "exchange_token", 
        redirectUri: GOOGLE_REDIRECT_URI 
      }
    });

    console.log("Google Supabase function response:", data, error);

    if (error) {
      console.error("Google Supabase function error:", error);
      throw new Error(error.message || "Error connecting with Google");
    }
    
    if (!data || !data.success) {
      console.error("Google auth failed:", data?.error || "Unknown error");
      throw new Error(data?.error || "Failed to authenticate with Google");
    }
    
    return data.profile;
  } catch (err) {
    console.error("Google integration error:", err);
    throw err;
  }
};

export const processGoogleProfile = (profile: any) => {
  // Process and standardize the Google profile data
  return {
    id: profile.id,
    fullName: profile.name,
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    profileUrl: profile.picture,
    accessToken: profile.accessToken,
    refreshToken: profile.refreshToken,
  };
};

export const saveGoogleDataToSupabase = async (googleData: any, userId: string) => {
  try {
    console.log("Saving Google data to user_google_profiles table for user:", userId);
    
    // Check if table exists first - this will no longer throw an error since we've created the table
    const { error: tableCheckError } = await (supabase
      .from('user_google_profiles' as any)
      .select('id', { count: 'exact', head: true }) as any);
    
    if (tableCheckError) {
      // Table might not exist
      console.error("Error checking user_google_profiles table:", tableCheckError);
      throw new Error("Google profiles table not available: " + tableCheckError.message);
    }
    
    // Save the processed Google data to Supabase
    const { data, error } = await (supabase.from('user_google_profiles' as any)
      .upsert({
        user_id: userId,
        google_id: googleData.id,
        full_name: googleData.fullName,
        email: googleData.email,
        profile_url: googleData.profileUrl,
        data: googleData,
        access_token: googleData.accessToken,
        refresh_token: googleData.refreshToken,
        updated_at: new Date().toISOString(),
      })
      .select() as any);

    if (error) {
      console.error("Error saving Google data:", error);
      throw error;
    }
    
    console.log("Google data saved successfully:", data);
    return data;
  } catch (err) {
    console.error("Error saving Google data:", err);
    throw err;
  }
};
