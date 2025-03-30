
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID') ?? '';
const LINKEDIN_CLIENT_SECRET = Deno.env.get('LINKEDIN_CLIENT_SECRET') ?? '';
const REDIRECT_URL = Deno.env.get('LINKEDIN_REDIRECT_URL') ?? '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { code, action } = await req.json();

    console.log("LinkedIn Auth Function called with action:", action);

    if (action === "exchange_token" && code) {
      console.log("Exchanging authorization code for access token");
      console.log("Using LINKEDIN_CLIENT_ID:", LINKEDIN_CLIENT_ID ? "Present" : "Missing");
      console.log("Using LINKEDIN_CLIENT_SECRET:", LINKEDIN_CLIENT_SECRET ? "Present" : "Missing");
      console.log("Using REDIRECT_URL:", REDIRECT_URL);
      
      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: LINKEDIN_CLIENT_ID,
          client_secret: LINKEDIN_CLIENT_SECRET,
          redirect_uri: REDIRECT_URL,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        console.error("LinkedIn token exchange error:", tokenData);
        throw new Error(`LinkedIn token exchange failed: ${JSON.stringify(tokenData)}`);
      }

      console.log("Successfully obtained LinkedIn access token");

      // Get user profile data
      const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      const profileData = await profileResponse.json();
      
      if (!profileResponse.ok) {
        console.error("LinkedIn profile fetch error:", profileData);
        throw new Error(`LinkedIn profile fetch failed: ${JSON.stringify(profileData)}`);
      }

      // Get email address if available with the granted permissions
      let emailData = {};
      try {
        const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (emailResponse.ok) {
          emailData = await emailResponse.json();
        }
      } catch (error) {
        console.warn("Could not fetch LinkedIn email, might be missing permission:", error);
      }

      // Combine profile data
      const linkedInProfile = {
        id: profileData.id,
        firstName: profileData.localizedFirstName,
        lastName: profileData.localizedLastName,
        profileUrl: `https://www.linkedin.com/in/${profileData.id}`,
        email: emailData?.elements?.[0]?.['handle~']?.emailAddress || null,
        accessToken: tokenData.access_token,
        expiresIn: tokenData.expires_in,
        tokenType: tokenData.token_type,
      };

      console.log("Successfully retrieved LinkedIn profile data");

      return new Response(JSON.stringify({ 
        success: true, 
        profile: linkedInProfile 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: "Invalid action or missing authorization code" 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error("LinkedIn auth function error:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || "An unexpected error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
