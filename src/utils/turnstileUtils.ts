
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Declare window.turnstile for TypeScript
declare global {
  interface Window {
    turnstile: any;
  }
}

export interface TurnstileOptions {
  containerId: string;
  onTokenChange?: (token: string | null) => void;
  siteKey?: string;
}

export interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
  action?: string;
  cdata?: string;
}

export const TURNSTILE_SITE_KEY = "0x4AAAAAAABI4S10D2f9gYqA";

export const useTurnstile = (options: TurnstileOptions) => {
  const { containerId, onTokenChange, siteKey = TURNSTILE_SITE_KEY } = options;
  const [token, setToken] = useState<string | null>(null);
  const widgetId = useRef<string | null>(null);
  
  useEffect(() => {
    const renderTurnstile = () => {
      const container = document.getElementById(containerId);
      if (window.turnstile && container) {
        console.log(`Rendering Turnstile with site key:`, siteKey);
        widgetId.current = window.turnstile.render(container, {
          sitekey: siteKey,
          callback: function(token: string) {
            console.log(`Turnstile token received:`, token.substring(0, 10) + "...");
            setToken(token);
            if (onTokenChange) {
              onTokenChange(token);
            }
          },
          "expired-callback": function() {
            console.log(`Turnstile token expired`);
            setToken(null);
            if (onTokenChange) {
              onTokenChange(null);
            }
          }
        });
      }
    };

    // Attempt to render initially or wait for Turnstile to load
    if (window.turnstile) {
      renderTurnstile();
    } else {
      const checkTurnstileLoaded = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstileLoaded);
          renderTurnstile();
        }
      }, 100);
      
      return () => clearInterval(checkTurnstileLoaded);
    }

    // Clean up Turnstile widget on unmount
    return () => {
      if (window.turnstile && widgetId.current) {
        window.turnstile.reset(widgetId.current);
      }
    };
  }, [containerId, onTokenChange, siteKey]);
  
  const getToken = (): string | null => {
    if (token) {
      return token;
    }
    
    if (window.turnstile && widgetId.current) {
      const newToken = window.turnstile.getResponse(widgetId.current);
      if (newToken) {
        setToken(newToken);
        return newToken;
      }
      
      // If no token is available, try to reset
      window.turnstile.reset(widgetId.current);
    }
    
    return null;
  };
  
  const resetToken = () => {
    if (window.turnstile && widgetId.current) {
      window.turnstile.reset(widgetId.current);
      setToken(null);
    }
  };
  
  // New function to verify a token
  const verifyToken = async (token: string | null): Promise<TurnstileVerifyResponse> => {
    if (!token) {
      return { success: false, error_codes: ["missing-token"] };
    }
    
    try {
      const { data, error } = await supabase.functions.invoke("verify-turnstile", {
        body: { token },
      });
      
      if (error) {
        console.error("Error verifying token:", error);
        return { success: false, error_codes: [error.message] };
      }
      
      return data as TurnstileVerifyResponse;
    } catch (error) {
      console.error("Error calling verify-turnstile function:", error);
      return { success: false, error_codes: [(error as Error).message] };
    }
  };
  
  return { token, getToken, resetToken, verifyToken };
};
