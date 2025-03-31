
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
  
  // This function is now a placeholder as we're removing Turnstile
  // It just returns success to avoid breaking existing code
  return new Response(
    JSON.stringify({ success: true, message: "Turnstile verification disabled" }),
    { 
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    }
  );
});
