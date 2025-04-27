
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

// Default redirect URI if none provided
const DEFAULT_REDIRECT_URI = 'https://wcxdaenhwiiowmoecpli.lovableproject.com/linkedin/callback';

/**
 * Main handler function that processes incoming requests
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const body = await parseRequestBody(req);
    
    // Log request and environment information
    logEnvironmentInfo();
    logRequestInfo(body);

    const { code, action, redirectUri = DEFAULT_REDIRECT_URI } = body;

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
 * Log environment information to help with debugging
 */
function logEnvironmentInfo() {
  console.log("Environment variables loaded:");
  console.log("- LINKEDIN_CLIENT_ID:", LINKEDIN_CLIENT_ID ? "Present (length: " + LINKEDIN_CLIENT_ID.length + ")" : "Missing");
  console.log("- LINKEDIN_CLIENT_SECRET:", LINKEDIN_CLIENT_SECRET ? "Present (length: " + LINKEDIN_CLIENT_SECRET.length + ")" : "Missing");
  console.log("- SUPABASE_URL:", SUPABASE_URL ? "Present" : "Missing");
  console.log("- SUPABASE_ANON_KEY:", SUPABASE_ANON_KEY ? "Present" : "Missing");
}

/**
 * Log LinkedIn auth request information
 */
function logRequestInfo(body) {
  const { action, redirectUri } = body;
  
  console.log("LinkedIn Auth Function called with action:", action);
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
    
    return createSuccessResponse(linkedInProfile);
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
  logTokenRequestParams(code, redirectUri);
  
  return await fetchWithErrorHandling(
    'https://www.linkedin.com/oauth/v2/accessToken',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams,
    }
  );
}

/**
 * Log token request parameters (excluding sensitive data)
 */
function logTokenRequestParams(code, redirectUri) {
  console.log("Token request params (without client_secret):", 
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: LINKEDIN_CLIENT_ID,
      redirect_uri: redirectUri,
    }).toString()
  );
}

/**
 * Helper function to handle fetch requests with error logging
 */
async function fetchWithErrorHandling(url, options) {
  try {
    const response = await fetch(url, options);
    const responseText = await response.text();
    
    console.log(`Response status from ${url}: ${response.status}`);
    console.log(`Raw response: ${responseText.substring(0, 500)}${responseText.length > 500 ? '...' : ''}`);
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (e) {
      console.error(`Error parsing response from ${url}:`, e);
      throw new Error(`Invalid response from ${url}: ${responseText}`);
    }
    
    if (!response.ok) {
      console.error(`API error from ${url}:`, parsedResponse);
      throw new Error(`API request failed: ${JSON.stringify(parsedResponse)}`);
    }
    
    return parsedResponse;
  } catch (e) {
    console.error(`Network error with ${url}:`, e);
    throw new Error(`Request to ${url} failed: ${e.message}`);
  }
}

/**
 * Fetch LinkedIn profile data
 */
async function fetchLinkedInProfile(accessToken) {
  console.log("Fetching LinkedIn profile data with token");
  
  try {
    return await fetchWithErrorHandling(
      'https://api.linkedin.com/v2/userinfo', // Using the OpenID userinfo endpoint
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    throw error;
  }
}

/**
 * Fetch LinkedIn email if available
 */
async function fetchLinkedInEmail(accessToken) {
  try {
    return await fetchWithErrorHandling(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.warn("Could not fetch LinkedIn email, might be missing permission:", error);
    return {};
  }
}

/**
 * Process and combine LinkedIn profile data
 * Updated to handle the OpenID Connect userinfo response format
 */
function processLinkedInData(profileData, emailData, tokenData) {
  console.log("Processing LinkedIn profile data:", JSON.stringify(profileData).substring(0, 200));
  
  return {
    id: profileData.sub || profileData.id,
    firstName: profileData.given_name || profileData.name?.split(' ')[0] || '',
    lastName: profileData.family_name || profileData.name?.split(' ').slice(1).join(' ') || '',
    profileUrl: profileData.profile || `https://www.linkedin.com/in/${profileData.sub || profileData.id}`,
    email: profileData.email || emailData?.elements?.[0]?.['handle~']?.emailAddress || null,
    accessToken: tokenData.access_token,
    expiresIn: tokenData.expires_in,
    tokenType: tokenData.token_type,
  };
}

/**
 * Create a standardized success response
 */
function createSuccessResponse(data) {
  return new Response(
    JSON.stringify({ success: true, profile: data }), 
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Create a standardized error response
 */
function createErrorResponse(message, status = 400) {
  return new Response(
    JSON.stringify({ success: false, error: message }), 
    {
      status: status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
