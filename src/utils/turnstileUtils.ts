
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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

// Default site key if not provided
const DEFAULT_SITE_KEY = "1x00000000000000000000AA"; // Cloudflare test key, replace with your actual key

export const useTurnstile = (options: TurnstileOptions) => {
  const { containerId, onTokenChange, siteKey = DEFAULT_SITE_KEY } = options;
  const [token, setToken] = useState<string | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  // Function to load the Turnstile script
  const loadTurnstileScript = useCallback(() => {
    if (window.turnstile) {
      // Script already loaded
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Turnstile script"));
      
      document.head.appendChild(script);
    });
  }, []);

  // Initialize Turnstile widget
  const initializeTurnstile = useCallback(() => {
    if (!window.turnstile || !document.getElementById(containerId)) {
      console.error("Turnstile not loaded or container not found");
      return;
    }

    // Reset any existing widget
    if (widgetId) {
      window.turnstile.reset(widgetId);
    }

    try {
      const newWidgetId = window.turnstile.render(`#${containerId}`, {
        sitekey: siteKey,
        callback: (response: string) => {
          console.log("Turnstile token received:", response);
          setToken(response);
          if (onTokenChange) onTokenChange(response);
        },
        "expired-callback": () => {
          console.log("Turnstile token expired");
          setToken(null);
          if (onTokenChange) onTokenChange(null);
        },
        "error-callback": () => {
          console.log("Turnstile error occurred");
          setToken(null);
          if (onTokenChange) onTokenChange(null);
        },
      });
      
      setWidgetId(newWidgetId);
      console.log("Turnstile widget initialized with ID:", newWidgetId);
    } catch (error) {
      console.error("Error initializing Turnstile:", error);
    }
  }, [containerId, siteKey, onTokenChange, widgetId]);

  // Load script and initialize widget
  useEffect(() => {
    loadTurnstileScript()
      .then(() => {
        // Small delay to ensure the DOM is ready
        setTimeout(() => {
          initializeTurnstile();
        }, 100);
      })
      .catch((error) => {
        console.error("Failed to load Turnstile:", error);
      });

    // Cleanup function
    return () => {
      if (window.turnstile && widgetId) {
        window.turnstile.reset(widgetId);
      }
    };
  }, [loadTurnstileScript, initializeTurnstile, widgetId]);

  // Function to get the current token
  const getToken = useCallback((): string | null => {
    return token;
  }, [token]);

  // Function to reset the widget
  const resetToken = useCallback(() => {
    if (window.turnstile && widgetId) {
      window.turnstile.reset(widgetId);
      setToken(null);
      if (onTokenChange) onTokenChange(null);
    }
  }, [widgetId, onTokenChange]);

  // Function to verify the token with Supabase
  const verifyToken = useCallback(async (): Promise<TurnstileVerifyResponse> => {
    if (!token) {
      console.error("No token to verify");
      return { success: false, error_codes: ["missing-token"] };
    }

    try {
      const { data, error } = await supabase.functions.invoke("verify-turnstile", {
        body: { token },
      });

      if (error) {
        console.error("Error verifying token:", error);
        return { success: false, error_codes: ["verification-failed"] };
      }

      return data;
    } catch (error) {
      console.error("Error calling verify-turnstile function:", error);
      return { success: false, error_codes: ["verification-failed"] };
    }
  }, [token]);

  return { token, getToken, resetToken, verifyToken };
};
