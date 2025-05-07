
// Completely disabled captcha utility - All functions are no-ops
// This file exists only to satisfy any imports but doesn't actually do anything

export interface CaptchaData {
  token: string;
  siteKey: string;
}

// Function that will always successfully return without any actual verification
export const getHCaptchaToken = async (): Promise<CaptchaData> => {
  console.log("CAPTCHA COMPLETELY DISABLED - Bypassing captcha check");
  return {
    token: "", // Empty token - we'll modify auth to not use captcha at all
    siteKey: ""
  };
};

// No-op functions
export const setupCaptcha = () => {
  console.log("CAPTCHA COMPLETELY DISABLED - setupCaptcha is a no-op");
};

export const cleanupCaptcha = () => {
  console.log("CAPTCHA COMPLETELY DISABLED - cleanupCaptcha is a no-op");
};
