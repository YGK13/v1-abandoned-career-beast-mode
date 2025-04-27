
import { supabase } from "@/integrations/supabase/client";

// LinkedIn OAuth configuration - will now be fetched from edge function
const CURRENT_ORIGIN = typeof window !== 'undefined' ? window.location.origin : '';
const REDIRECT_URI = `${CURRENT_ORIGIN}/linkedin`;

export const generateLinkedInAuthUrl = async () => {
  // Generate a random state value for security
  const state = Math.random().toString(36).substring(2, 15);
  
  // Store state in sessionStorage for validation when the user returns
  if (typeof window !== 'undefined') {
    sessionStorage.setItem("linkedin_oauth_state", state);
    console.log("Set linkedin_oauth_state in session storage:", state);
  }
  
  // Define the scopes we're requesting according to what's available in your app
  // Using OpenID Connect scopes which are supported by LinkedIn
  const scope = encodeURIComponent("openid profile email");
  
  try {
    console.log("Fetching LinkedIn client ID from edge function");
    console.time("linkedin-config-fetch");
    
    // Fetch the LinkedIn client ID from Supabase edge function
    const { data, error } = await supabase.functions.invoke('linkedin-auth-config', {
      body: { action: "get_client_id" }
    });
    
    console.timeEnd("linkedin-config-fetch");
    console.log("Edge function response:", data, error);
    
    if (error) {
      console.error("Error fetching LinkedIn client ID:", error);
      throw new Error("Failed to get LinkedIn configuration");
    }
    
    const clientId = data?.clientId;
    
    if (!clientId) {
      console.error("No LinkedIn client ID returned from server");
      throw new Error("LinkedIn app configuration missing");
    }
    
    console.log("Creating LinkedIn auth URL with client ID:", clientId);
    console.log("Current origin:", CURRENT_ORIGIN);
    console.log("Redirect URI:", REDIRECT_URI);
    
    // Direct LinkedIn OAuth URL with all necessary parameters
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=${scope}`;
    
    console.log("Generated LinkedIn auth URL:", authUrl);
    
    return authUrl;
  } catch (error) {
    console.error("Error generating LinkedIn auth URL:", error);
    throw error;
  }
};

export const handleLinkedInCallback = async (code: string): Promise<any> => {
  try {
    console.log("Calling Supabase function with code:", code.substring(0, 10) + "...");
    console.time("linkedin-auth-exchange");
    
    // Exchange the authorization code for an access token using our Supabase edge function
    const { data, error } = await supabase.functions.invoke('linkedin-auth', {
      body: { 
        code, 
        action: "exchange_token", 
        redirectUri: REDIRECT_URI 
      }
    });

    console.timeEnd("linkedin-auth-exchange");
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
    
    // Check if table exists first
    const { error: tableCheckError } = await supabase
      .from('user_linkedin_profiles')
      .select('id', { count: 'exact', head: true });
    
    if (tableCheckError) {
      // Table might not exist
      console.error("Error checking user_linkedin_profiles table:", tableCheckError);
      throw new Error("LinkedIn profiles table not available: " + tableCheckError.message);
    }
    
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
