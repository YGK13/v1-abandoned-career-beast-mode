
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
    
    // Get LinkedIn client ID from environment variables
    const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID') ?? '';
    console.log("Retrieved LINKEDIN_CLIENT_ID:", LINKEDIN_CLIENT_ID ? "Present (length: " + LINKEDIN_CLIENT_ID.length + ")" : "Missing");
    
    if (!LINKEDIN_CLIENT_ID) {
      console.error("LINKEDIN_CLIENT_ID not found in environment variables");
      throw new Error("LinkedIn client ID not configured in environment");
    }
    
    // Log all environment variables (without values) for debugging
    console.log("Available environment variables:", Object.keys(Deno.env.toObject()));
    
    return new Response(
      JSON.stringify({
        success: true,
        clientId: LINKEDIN_CLIENT_ID
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
