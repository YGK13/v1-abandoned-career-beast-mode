
// Completely dummy captcha utility - No actual verification occurs
// This file exists only to satisfy any existing imports

export interface CaptchaData {
  token: string;
  siteKey: string;
}

// Always returns a dummy token without any verification
export const getHCaptchaToken = async (): Promise<CaptchaData> => {
  return {
    token: "dummy-token-captcha-disabled",
    siteKey: "dummy-site-key"
  };
};

// No-op functions
export const setupCaptcha = () => {};
export const cleanupCaptcha = () => {};
