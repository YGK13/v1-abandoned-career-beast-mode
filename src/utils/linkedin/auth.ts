
import { supabase } from "@/integrations/supabase/client";

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
