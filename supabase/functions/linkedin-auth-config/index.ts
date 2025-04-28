
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Log the request details for debugging
    console.log("LinkedIn config function called");
    console.log("Request method:", req.method);
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));
    console.log("Request URL:", req.url);
    
    // Get LinkedIn client ID from environment variables
    const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID') ?? '';
    console.log("Retrieved LINKEDIN_CLIENT_ID:", LINKEDIN_CLIENT_ID ? "Present (length: " + LINKEDIN_CLIENT_ID.length + ")" : "Missing");
    
    if (!LINKEDIN_CLIENT_ID) {
      console.error("LINKEDIN_CLIENT_ID not found in environment variables");
      throw new Error("LinkedIn client ID not configured in environment");
    }
    
    // Get redirect URL from environment if available
    const LINKEDIN_REDIRECT_URL = Deno.env.get('LINKEDIN_REDIRECT_URL') ?? '';
    console.log("Retrieved LINKEDIN_REDIRECT_URL:", LINKEDIN_REDIRECT_URL || "Not set in environment");
    
    // Log all environment variables (without values) for debugging
    console.log("Available environment variables:", Object.keys(Deno.env.toObject()));
    
    return new Response(
      JSON.stringify({
        success: true,
        clientId: LINKEDIN_CLIENT_ID,
        redirectUrl: LINKEDIN_REDIRECT_URL || null
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("LinkedIn config function error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
