
// Completely disabled captcha utility - Acts as if verification always succeeds
// This file exists to satisfy imports but does not perform any actual verification

export interface CaptchaData {
  token: string;
  siteKey: string;
}

// Always returns a dummy token that will be accepted by our modified authentication flow
export const getHCaptchaToken = async (): Promise<CaptchaData> => {
  return {
    token: "captcha-completely-disabled-bypass-token",
    siteKey: "dummy-site-key"
  };
};

// No-op functions 
export const setupCaptcha = () => {};
export const cleanupCaptcha = () => {};
