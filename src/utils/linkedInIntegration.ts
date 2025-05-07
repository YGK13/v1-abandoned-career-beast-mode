
import { supabase } from "@/integrations/supabase/client";

// LinkedIn OAuth configuration
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
    
    // Using Supabase auth directly with LinkedIn OIDC provider
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: REDIRECT_URI,
        scopes: 'openid profile email',
        queryParams: {
          state: `linkedin-auth-${Date.now()}`
        }
      }
    });
    
    endTimer("linkedin-config-fetch");
    
    if (error) {
      console.error("Error initiating LinkedIn OAuth:", error);
      throw new Error(`Failed to initiate LinkedIn authentication: ${error.message}`);
    }
    
    if (!data?.url) {
      throw new Error("No authentication URL returned from Supabase");
    }
    
    console.log("Generated LinkedIn auth URL via Supabase:", data.url);
    
    return data.url;
  } catch (error) {
    console.error("Error generating LinkedIn auth URL:", error);
    throw error;
  }
};

export const handleLinkedInCallback = async (code: string): Promise<any> => {
  startTimer("linkedin-auth-exchange");
  try {
    console.log("Processing LinkedIn OAuth callback with code:", code.substring(0, 10) + "...");
    
    // The actual handling is managed by Supabase automatically
    // This function is primarily for logging and handling any additional processing
    
    // Get the current session to verify successful login
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    const exchangeTime = endTimer("linkedin-auth-exchange");
    console.log(`Session check completed after ${exchangeTime}ms:`, 
      sessionData?.session ? "Session exists" : "No session found");

    if (sessionError) {
      console.error("Error getting session after LinkedIn auth:", sessionError);
      throw new Error(`Error verifying authentication: ${sessionError.message}`);
    }
    
    if (!sessionData?.session) {
      console.error("No session found after LinkedIn authentication");
      
      // Try to manually exchange the code if needed
      const { data: userData, error: userError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (userError) {
        console.error("Error exchanging code for session:", userError);
        throw new Error(`Failed to exchange code: ${userError.message}`);
      }
      
      if (!userData?.session) {
        throw new Error("Failed to authenticate with LinkedIn");
      }
      
      console.log("Successfully exchanged code for session");
      return userData.user;
    }
    
    // Get user profile data
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      console.error("Error getting user data after LinkedIn auth:", userError);
      throw new Error("Failed to retrieve user profile after authentication");
    }
    
    return userData.user;
  } catch (err) {
    console.error("LinkedIn integration error:", err);
    throw err;
  }
};

export const processLinkedInProfile = (profile: any) => {
  // Process and standardize the LinkedIn profile data
  return {
    id: profile.id,
    fullName: profile.user_metadata?.full_name || `${profile.user_metadata?.name || ''}`,
    firstName: profile.user_metadata?.given_name || profile.user_metadata?.name?.split(' ')[0] || '',
    lastName: profile.user_metadata?.family_name || profile.user_metadata?.name?.split(' ').slice(1).join(' ') || '',
    email: profile.email,
    profileUrl: profile.user_metadata?.profile || '',
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
