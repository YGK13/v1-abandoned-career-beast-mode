
import { supabase } from "@/integrations/supabase/client";

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID || "77cdibmhgr0f9n";
const REDIRECT_URI = `${window.location.origin}/linkedin/callback`;

export const generateLinkedInAuthUrl = () => {
  const state = Math.random().toString(36).substring(2, 15);
  // Store state in sessionStorage for validation when the user returns
  sessionStorage.setItem("linkedin_oauth_state", state);
  
  const scope = encodeURIComponent("r_liteprofile r_emailaddress");
  
  console.log("Creating LinkedIn auth URL with client ID:", LINKEDIN_CLIENT_ID);
  console.log("Redirect URI:", REDIRECT_URI);
  
  // Direct LinkedIn OAuth URL with all necessary parameters
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=${scope}`;
  
  console.log("Generated LinkedIn auth URL:", authUrl);
  
  return authUrl;
};

export const handleLinkedInCallback = async (code: string): Promise<any> => {
  try {
    console.log("Calling Supabase function with code:", code.substring(0, 10) + "...");
    
    // Exchange the authorization code for an access token using our Supabase edge function
    const { data, error } = await supabase.functions.invoke('linkedin-auth', {
      body: { code, action: "exchange_token", redirectUri: REDIRECT_URI }
    });

    console.log("Supabase function response:", data, error);

    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(error.message || "Error connecting with LinkedIn");
    }
    
    if (!data || !data.success) {
      console.error("LinkedIn auth failed:", data?.error || "Unknown error");
      throw new Error(data?.error || "Failed to authenticate with LinkedIn");
    }
    
    return data.profile;
  } catch (err) {
    console.error("LinkedIn integration error:", err);
    throw err;
  }
};

export const processLinkedInProfile = (profile: any) => {
  // Process and standardize the LinkedIn profile data
  return {
    id: profile.id,
    fullName: `${profile.firstName} ${profile.lastName}`,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    profileUrl: profile.profileUrl,
    accessToken: profile.accessToken,
  };
};

export const saveLinkedInDataToSupabase = async (linkedInData: any, userId: string) => {
  try {
    console.log("Saving LinkedIn data to user_linkedin_profiles table for user:", userId);
    
    // Save the processed LinkedIn data to Supabase
    const { data, error } = await supabase.from('user_linkedin_profiles')
      .upsert({
        user_id: userId,
        linkedin_id: linkedInData.id,
        full_name: linkedInData.fullName,
        email: linkedInData.email,
        profile_url: linkedInData.profileUrl,
        data: linkedInData,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("Error saving LinkedIn data:", error);
      throw error;
    }
    
    console.log("LinkedIn data saved successfully:", data);
    return data;
  } catch (err) {
    console.error("Error saving LinkedIn data:", err);
    throw err;
  }
};
