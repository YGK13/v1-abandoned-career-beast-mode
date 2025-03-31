
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    // Get request data
    const { token } = await req.json();
    
    if (!token) {
      console.error("No token provided");
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "No token provided" 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400
        }
      );
    }
    
    // Get the secret key from environment variables
    const secretKey = Deno.env.get("TURNSTILE_SECRET_KEY");
    
    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Service misconfigured" 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      );
    }
    
    // Make request to Cloudflare API to verify the token
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    
    console.log(`Verifying token: ${token.substring(0, 20)}...`);
    
    const response = await fetch(verifyUrl, {
      method: "POST",
      body: formData,
    });
    
    const result = await response.json();
    console.log("Verification result:", result);
    
    // Return verification result
    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || "An unexpected error occurred" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
