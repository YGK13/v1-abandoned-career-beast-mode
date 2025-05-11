
import { corsHeaders } from "./headers.ts";

/**
 * Create a standardized success response
 */
export function createSuccessResponse(data) {
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
export function createErrorResponse(message, status = 400) {
  return new Response(
    JSON.stringify({ success: false, error: message }), 
    {
      status: status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
