
import { supabase } from "@/integrations/supabase/client";

// LinkedIn OAuth configuration - will now be fetched from edge function
const CURRENT_ORIGIN = typeof window !== 'undefined' ? window.location.origin : '';
const REDIRECT_URI = `${CURRENT_ORIGIN}/linkedin`;

// Track timing for debugging
const TIMERS: Record<string, number> = {};

function startTimer(name: string) {
  TIMERS[name] = Date.now();
  console.log(`Starting timer: ${name}`);
}

function endTimer(name: string) {
  const start = TIMERS[name];
  if (!start) return;
  const duration = Date.now() - start;
  console.log(`Timer ${name} completed in ${duration}ms`);
  return duration;
}

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
    startTimer("linkedin-config-fetch");
    console.log("Fetching LinkedIn client ID from edge function");
    console.log("Current location:", window.location.href);
    console.log("Origin being used:", CURRENT_ORIGIN);
    console.log("Expected redirect URI:", REDIRECT_URI);
    
    // Fetch the LinkedIn client ID from Supabase edge function
    const { data, error } = await supabase.functions.invoke('linkedin-auth-config', {
      body: { 
        action: "get_client_id",
        currentUrl: window.location.href,
        redirectUri: REDIRECT_URI
      }
    });
    
    const fetchTime = endTimer("linkedin-config-fetch");
    console.log(`Edge function response after ${fetchTime}ms:`, data, error);
    
    if (error) {
      console.error("Error fetching LinkedIn client ID:", error);
      throw new Error("Failed to get LinkedIn configuration");
    }
    
    const clientId = data?.clientId;
    const configuredRedirectUrl = data?.redirectUrl;
    
    if (!clientId) {
      console.error("No LinkedIn client ID returned from server");
      throw new Error("LinkedIn app configuration missing");
    }
    
    // Use the redirect URL from config if available, otherwise use the default
    const finalRedirectUri = configuredRedirectUrl || REDIRECT_URI;
    
    console.log("Creating LinkedIn auth URL with client ID:", clientId);
    console.log("Current origin:", CURRENT_ORIGIN);
    console.log("Using redirect URI:", finalRedirectUri);
    console.log("Encoded redirect URI:", encodeURIComponent(finalRedirectUri));
    
    // Direct LinkedIn OAuth URL with all necessary parameters
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(finalRedirectUri)}&state=${state}&scope=${scope}`;
    
    console.log("Generated LinkedIn auth URL:", authUrl);
    
    return authUrl;
  } catch (error) {
    console.error("Error generating LinkedIn auth URL:", error);
    throw error;
  }
};

export const handleLinkedInCallback = async (code: string): Promise<any> => {
  startTimer("linkedin-auth-exchange");
  try {
    console.log("Calling Supabase function with code:", code.substring(0, 10) + "...");
    
    // Exchange the authorization code for an access token using our Supabase edge function
    const { data, error } = await supabase.functions.invoke('linkedin-auth', {
      body: { 
        code, 
        action: "exchange_token", 
        redirectUri: REDIRECT_URI 
      }
    });

    const exchangeTime = endTimer("linkedin-auth-exchange");
    console.log(`Supabase function response after ${exchangeTime}ms:`, data, error);

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
