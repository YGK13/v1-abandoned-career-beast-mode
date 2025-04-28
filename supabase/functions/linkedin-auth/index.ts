import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

// Configuration and environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID') ?? '';
const LINKEDIN_CLIENT_SECRET = Deno.env.get('LINKEDIN_CLIENT_SECRET') ?? '';
const LINKEDIN_REDIRECT_URL = Deno.env.get('LINKEDIN_REDIRECT_URL') ?? '';

// CORS headers for cross-origin requests - update with more permissive settings for debugging
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

/**
 * Main handler function that processes incoming requests
 */
serve(async (req) => {
  console.log("LinkedIn auth function called with URL:", req.url);
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests with detailed logging
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    console.log("Creating Supabase client with URL:", SUPABASE_URL ? "Present" : "Missing");

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const body = await parseRequestBody(req);
    
    // Log request and environment information
    logEnvironmentInfo();
    logRequestInfo(body);

    const { code, action, redirectUri } = body;
    
    // Get the redirect URI from environment variable, body param, or fallback to a default
    const effectiveRedirectUri = chooseRedirectUri(redirectUri);
    console.log("Effective redirect URI:", effectiveRedirectUri);

    if (action === "exchange_token" && code) {
      return await handleExchangeToken(code, effectiveRedirectUri);
    }

    console.log("Invalid action or missing code:", { action, hasCode: !!code });
    return createErrorResponse("Invalid action or missing authorization code", 400);
  } catch (error) {
    console.error("LinkedIn auth function error:", error);
    return createErrorResponse(error.message || "An unexpected error occurred", 500);
  }
});

/**
 * Choose the most appropriate redirect URI
 */
function chooseRedirectUri(providedRedirectUri) {
  // Priority: 1. Environment variable, 2. Provided in request, 3. Default fallback
  if (LINKEDIN_REDIRECT_URL) {
    console.log("Using redirect URI from environment variable:", LINKEDIN_REDIRECT_URL);
    return LINKEDIN_REDIRECT_URL;
  }
  
  if (providedRedirectUri) {
    console.log("Using redirect URI from request:", providedRedirectUri);
    return providedRedirectUri;
  }
  
  // Fallback to a default
  const fallbackUri = 'https://wcxdaenhwiiowmoecpli.lovableproject.com/linkedin';
  console.log("Using fallback redirect URI:", fallbackUri);
  return fallbackUri;
}

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
  console.log("- LINKEDIN_REDIRECT_URL:", LINKEDIN_REDIRECT_URL || "Not set in environment");
  console.log("- SUPABASE_URL:", SUPABASE_URL ? "Present" : "Missing");
  console.log("- SUPABASE_ANON_KEY:", SUPABASE_ANON_KEY ? "Present" : "Missing");
  console.log("- All environment variable names:", Object.keys(Deno.env.toObject()));
}

/**
 * Log LinkedIn auth request information
 */
function logRequestInfo(body) {
  const { action, redirectUri } = body;
  
  console.log("LinkedIn Auth Function called with action:", action);
  console.log("- Redirect URI from request:", redirectUri || "Not provided");
}

/**
 * Handle the LinkedIn authorization code exchange
 */
async function handleExchangeToken(code, redirectUri) {
  console.log("Exchanging authorization code for access token");
  console.log("Code (first 10 chars):", code.substring(0, 10) + "...");
  console.log("Redirect URI:", redirectUri);
  
  try {
    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code, redirectUri);
    console.log("Token exchange response:", tokenData ? "Success" : "Failed");
    
    if (!tokenData.access_token) {
      console.error("No access token in response:", tokenData);
      return createErrorResponse("Failed to obtain access token", 400);
    }
    
    // Get user profile data
    console.log("Fetching LinkedIn profile with access token");
    const profileData = await fetchLinkedInProfile(tokenData.access_token);
    console.log("Profile data retrieved:", profileData ? "Success" : "Failed");
    
    // Get email data if available
    console.log("Fetching LinkedIn email");
    const emailData = await fetchLinkedInEmail(tokenData.access_token);
    console.log("Email data retrieved:", emailData ? "Success" : "Failed");
    
    // Process and combine profile data
    const linkedInProfile = processLinkedInData(profileData, emailData, tokenData);
    
    console.log("Successfully retrieved LinkedIn profile data", {
      id: linkedInProfile.id,
      firstName: linkedInProfile.firstName,
      hasEmail: !!linkedInProfile.email
    });
    
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
