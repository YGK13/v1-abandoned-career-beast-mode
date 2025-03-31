
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY") || "";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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
    if (!TURNSTILE_SECRET_KEY) {
      console.error("TURNSTILE_SECRET_KEY is not set");
      return new Response(
        JSON.stringify({ success: false, error: "Server configuration error" }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Get token from request
    const { token, remoteip } = await req.json();
    
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing token" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("Verifying Turnstile token:", token.substring(0, 10) + "...");
    
    // Build form data for verification
    const formData = new FormData();
    formData.append("secret", TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    
    // Add remote IP if provided
    if (remoteip) {
      formData.append("remoteip", remoteip);
    }
    
    // Verify with Cloudflare
    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });
    
    const verifyResult = await verifyResponse.json();
    console.log("Verification result:", verifyResult);
    
    return new Response(
      JSON.stringify(verifyResult),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error verifying token:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
