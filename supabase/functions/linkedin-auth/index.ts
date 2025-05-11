
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./utils/headers.ts";
import { parseRequestBody } from "./utils/request.ts";
import { createErrorResponse, createSuccessResponse } from "./utils/response.ts";
import { handleExchangeToken } from "./handlers/tokenHandler.ts";

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
    
    console.log("LinkedIn Auth Function called with action:", body.action);
    console.log("- Redirect URI:", body.redirectUri);

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
