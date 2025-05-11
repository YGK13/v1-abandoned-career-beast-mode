
import { fetchWithErrorHandling } from "../utils/api.ts";

// Environment variables
const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID') ?? '';
const LINKEDIN_CLIENT_SECRET = Deno.env.get('LINKEDIN_CLIENT_SECRET') ?? '';

/**
 * Exchange the authorization code for an access token
 */
export async function exchangeCodeForToken(code, redirectUri) {
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
export async function fetchLinkedInProfile(accessToken) {
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
