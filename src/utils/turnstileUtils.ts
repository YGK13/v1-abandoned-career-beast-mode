
import { useState } from "react";

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

// Dummy implementation that always returns success
export const useTurnstile = () => {
  const [token] = useState<string | null>("dummy-token");
  
  const getToken = (): string | null => {
    return "dummy-token";
  };
  
  const resetToken = () => {
    // Do nothing
  };
  
  // This function will always return success
  const verifyToken = async (): Promise<TurnstileVerifyResponse> => {
    return { success: true };
  };
  
  return { token, getToken, resetToken, verifyToken };
};
