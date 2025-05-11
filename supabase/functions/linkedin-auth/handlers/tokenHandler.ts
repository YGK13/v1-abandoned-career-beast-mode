
import { exchangeCodeForToken, fetchLinkedInProfile } from "../services/linkedinService.ts";
import { createErrorResponse, createSuccessResponse } from "../utils/response.ts";

/**
 * Handle the LinkedIn authorization code exchange
 */
export async function handleExchangeToken(code, redirectUri) {
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
