
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
    
    // Log request body
    let body;
    try {
      body = await req.json();
      console.log("Request body:", JSON.stringify(body));
    } catch (e) {
      console.error("Error parsing request body:", e);
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Invalid request body" 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const { code, action } = body;

    console.log("LinkedIn Auth Function called with action:", action);
    console.log("Environment variables loaded:");
    console.log("- LINKEDIN_CLIENT_ID:", LINKEDIN_CLIENT_ID ? "Present (length: " + LINKEDIN_CLIENT_ID.length + ")" : "Missing");
    console.log("- LINKEDIN_CLIENT_SECRET:", LINKEDIN_CLIENT_SECRET ? "Present (length: " + LINKEDIN_CLIENT_SECRET.length + ")" : "Missing");
    console.log("- REDIRECT_URL:", REDIRECT_URL);

    if (action === "exchange_token" && code) {
      console.log("Exchanging authorization code for access token");
      
      const tokenParams = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: REDIRECT_URL,
      });
      
      console.log("Token request params:", tokenParams.toString());
      
      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenParams,
      });

      const tokenResponseText = await tokenResponse.text();
      console.log("Raw token response:", tokenResponseText);
      
      let tokenData;
      try {
        tokenData = JSON.parse(tokenResponseText);
      } catch (e) {
        console.error("Error parsing token response:", e);
        return new Response(JSON.stringify({ 
          success: false, 
          error: "Invalid response from LinkedIn token endpoint",
          rawResponse: tokenResponseText
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (!tokenResponse.ok) {
        console.error("LinkedIn token exchange error:", tokenData);
        return new Response(JSON.stringify({ 
          success: false, 
          error: `LinkedIn token exchange failed: ${JSON.stringify(tokenData)}` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log("Successfully obtained LinkedIn access token");

      // Get user profile data
      const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      const profileResponseText = await profileResponse.text();
      console.log("Raw profile response:", profileResponseText);
      
      let profileData;
      try {
        profileData = JSON.parse(profileResponseText);
      } catch (e) {
        console.error("Error parsing profile response:", e);
        return new Response(JSON.stringify({ 
          success: false, 
          error: "Invalid response from LinkedIn profile endpoint",
          rawResponse: profileResponseText
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (!profileResponse.ok) {
        console.error("LinkedIn profile fetch error:", profileData);
        return new Response(JSON.stringify({ 
          success: false, 
          error: `LinkedIn profile fetch failed: ${JSON.stringify(profileData)}` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
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
          console.log("Email data:", JSON.stringify(emailData));
        } else {
          console.warn("Could not fetch email, response:", await emailResponse.text());
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

      console.log("Successfully retrieved LinkedIn profile data:", JSON.stringify(linkedInProfile));

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
