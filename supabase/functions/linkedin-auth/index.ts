
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

// Configuration and environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID') ?? '';
const LINKEDIN_CLIENT_SECRET = Deno.env.get('LINKEDIN_CLIENT_SECRET') ?? '';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const body = await parseRequestBody(req);
    
    // Log request information
    logRequestInfo(body);

    const { code, action, redirectUri = 'https://wcxdaenhwiiowmoecpli.lovableproject.com/linkedin/callback' } = body;

    if (action === "exchange_token" && code) {
      return await handleExchangeToken(code, redirectUri);
    }

    return createErrorResponse("Invalid action or missing authorization code", 400);
  } catch (error) {
    console.error("LinkedIn auth function error:", error);
    return createErrorResponse(error.message || "An unexpected error occurred", 500);
  }
});

/**
 * Parse and validate the request body
 */
async function parseRequestBody(req) {
  try {
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));
    return body;
  } catch (e) {
    console.error("Error parsing request body:", e);
    throw new Error("Invalid request body");
  }
}

/**
 * Log LinkedIn auth request information
 */
function logRequestInfo(body) {
  const { action, redirectUri } = body;
  
  console.log("LinkedIn Auth Function called with action:", action);
  console.log("Environment variables loaded:");
  console.log("- LINKEDIN_CLIENT_ID:", LINKEDIN_CLIENT_ID ? "Present (length: " + LINKEDIN_CLIENT_ID.length + ")" : "Missing");
  console.log("- LINKEDIN_CLIENT_SECRET:", LINKEDIN_CLIENT_SECRET ? "Present (length: " + LINKEDIN_CLIENT_SECRET.length + ")" : "Missing");
  console.log("- Redirect URI:", redirectUri);
}

/**
 * Handle the LinkedIn authorization code exchange
 */
async function handleExchangeToken(code, redirectUri) {
  console.log("Exchanging authorization code for access token");
  
  try {
    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code, redirectUri);
    if (!tokenData.access_token) {
      return createErrorResponse("Failed to obtain access token", 400);
    }
    
    // Get user profile data
    const profileData = await fetchLinkedInProfile(tokenData.access_token);
    
    // Get email data if available
    const emailData = await fetchLinkedInEmail(tokenData.access_token);
    
    // Process and combine profile data
    const linkedInProfile = processLinkedInData(profileData, emailData, tokenData);
    
    console.log("Successfully retrieved LinkedIn profile data");
    
    return new Response(JSON.stringify({ 
      success: true, 
      profile: linkedInProfile 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in handleExchangeToken:", error);
    return createErrorResponse(error.message || "Failed to exchange token", 400);
  }
}

/**
 * Exchange the authorization code for an access token
 */
async function exchangeCodeForToken(code, redirectUri) {
  const tokenParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: LINKEDIN_CLIENT_ID,
    client_secret: LINKEDIN_CLIENT_SECRET,
    redirect_uri: redirectUri,
  });
  
  // Log parameters (excluding secret)
  console.log("Token request params (without client_secret):", 
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: LINKEDIN_CLIENT_ID,
      redirect_uri: redirectUri,
    }).toString()
  );
  
  // Exchange authorization code for access token
  const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tokenParams,
  });

  const tokenResponseText = await tokenResponse.text();
  console.log("Raw token response status:", tokenResponse.status);
  console.log("Raw token response:", tokenResponseText);
  
  // Parse the token response
  try {
    const tokenData = JSON.parse(tokenResponseText);
    
    if (!tokenResponse.ok) {
      console.error("LinkedIn token exchange error:", tokenData);
      throw new Error(`LinkedIn token exchange failed: ${JSON.stringify(tokenData)}`);
    }
    
    return tokenData;
  } catch (e) {
    console.error("Error parsing token response:", e);
    throw new Error("Invalid response from LinkedIn token endpoint");
  }
}

/**
 * Fetch LinkedIn profile data
 */
async function fetchLinkedInProfile(accessToken) {
  const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const profileResponseText = await profileResponse.text();
  console.log("Raw profile response status:", profileResponse.status);
  console.log("Raw profile response:", profileResponseText);
  
  try {
    const profileData = JSON.parse(profileResponseText);
    
    if (!profileResponse.ok) {
      console.error("LinkedIn profile fetch error:", profileData);
      throw new Error(`LinkedIn profile fetch failed: ${JSON.stringify(profileData)}`);
    }
    
    return profileData;
  } catch (e) {
    console.error("Error parsing profile response:", e);
    throw new Error("Invalid response from LinkedIn profile endpoint");
  }
}

/**
 * Fetch LinkedIn email if available
 */
async function fetchLinkedInEmail(accessToken) {
  try {
    const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (emailResponse.ok) {
      const emailData = await emailResponse.json();
      console.log("Email data:", JSON.stringify(emailData));
      return emailData;
    } else {
      console.warn("Could not fetch email, response:", await emailResponse.text());
      return {};
    }
  } catch (error) {
    console.warn("Could not fetch LinkedIn email, might be missing permission:", error);
    return {};
  }
}

/**
 * Process and combine LinkedIn profile data
 */
function processLinkedInData(profileData, emailData, tokenData) {
  return {
    id: profileData.id,
    firstName: profileData.localizedFirstName,
    lastName: profileData.localizedLastName,
    profileUrl: `https://www.linkedin.com/in/${profileData.id}`,
    email: emailData?.elements?.[0]?.['handle~']?.emailAddress || null,
    accessToken: tokenData.access_token,
    expiresIn: tokenData.expires_in,
    tokenType: tokenData.token_type,
  };
}

/**
 * Create a standardized error response
 */
function createErrorResponse(message, status = 400) {
  return new Response(JSON.stringify({ 
    success: false, 
    error: message 
  }), {
    status: status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
