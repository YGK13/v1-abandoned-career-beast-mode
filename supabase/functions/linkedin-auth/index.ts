
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
    const body = await parseRequestBody(req);
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
 * Log request information to help with debugging
 */
function logRequestInfo(body) {
  const { action, redirectUri } = body;
  
  console.log("LinkedIn Auth Function called with action:", action);
  console.log("- Redirect URI:", redirectUri);
  console.log("- LINKEDIN_CLIENT_ID present:", Boolean(LINKEDIN_CLIENT_ID));
  console.log("- LINKEDIN_CLIENT_SECRET present:", Boolean(LINKEDIN_CLIENT_SECRET));
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
    
    // Process and combine profile data
    const linkedInProfile = createLinkedInProfile(profileData, tokenData);
    
    console.log("Successfully retrieved LinkedIn profile data");
    
    return createSuccessResponse(linkedInProfile);
  } catch (error) {
    console.error("Error in handleExchangeToken:", error);
    return createErrorResponse(error.message || "Failed to exchange token", 400);
  }
}

/**
 * Create a standardized LinkedIn profile object from API responses
 */
function createLinkedInProfile(profileData, tokenData) {
  return {
    ...profileData,
    accessToken: tokenData.access_token,
    refreshToken: tokenData.refresh_token || null,
    expiresIn: tokenData.expires_in,
    tokenType: tokenData.token_type,
  };
}

/**
 * Exchange the authorization code for an access token
 */
async function exchangeCodeForToken(code, redirectUri) {
  const tokenParams = createTokenParams(code, redirectUri);
  
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
 * Create token request parameters
 */
function createTokenParams(code, redirectUri) {
  return new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: LINKEDIN_CLIENT_ID,
    client_secret: LINKEDIN_CLIENT_SECRET,
    redirect_uri: redirectUri,
  });
}

/**
 * Log token request parameters (excluding secret)
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
 * Fetch LinkedIn profile data using the access token
 */
async function fetchLinkedInProfile(accessToken) {
  // First get the basic profile info
  const basicProfile = await fetchWithErrorHandling(
    'https://api.linkedin.com/v2/me',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  // Then get the email address
  const emailData = await fetchWithErrorHandling(
    'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  // Extract email from response
  const email = emailData?.elements?.[0]?.['handle~']?.emailAddress || null;
  
  // Combine the data
  return {
    id: basicProfile.id,
    firstName: basicProfile.localizedFirstName,
    lastName: basicProfile.localizedLastName,
    fullName: `${basicProfile.localizedFirstName} ${basicProfile.localizedLastName}`,
    email: email,
    profileUrl: `https://www.linkedin.com/in/${basicProfile.id}/`
  };
}

/**
 * Helper function to handle fetch requests with error logging
 */
async function fetchWithErrorHandling(url, options) {
  try {
    const response = await fetch(url, options);
    const responseText = await response.text();
    
    logApiResponse(url, response.status, responseText);
    
    const parsedResponse = parseResponseData(responseText, url);
    
    if (!response.ok) {
      handleApiError(url, parsedResponse);
    }
    
    return parsedResponse;
  } catch (e) {
    console.error(`Network error with ${url}:`, e);
    throw new Error(`Request to ${url} failed: ${e.message}`);
  }
}

/**
 * Log API response for debugging
 */
function logApiResponse(url, status, responseText) {
  console.log(`Response status from ${url}: ${status}`);
  console.log(`Raw response: ${responseText.substring(0, 500)}${responseText.length > 500 ? '...' : ''}`);
}

/**
 * Parse response text to JSON
 */
function parseResponseData(responseText, url) {
  try {
    return JSON.parse(responseText);
  } catch (e) {
    console.error(`Error parsing response from ${url}:`, e);
    throw new Error(`Invalid response from ${url}: ${responseText}`);
  }
}

/**
 * Handle API error responses
 */
function handleApiError(url, parsedResponse) {
  console.error(`API error from ${url}:`, parsedResponse);
  throw new Error(`API request failed: ${JSON.stringify(parsedResponse)}`);
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
