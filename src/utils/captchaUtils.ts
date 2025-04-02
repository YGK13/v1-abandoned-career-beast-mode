
// Utility functions for hCaptcha integration (currently disabled)

export interface CaptchaData {
  token: string;
  siteKey: string;
}

// This function now returns null since hCaptcha is disabled
export const getHCaptchaToken = async (): Promise<CaptchaData | null> => {
  console.log('hCaptcha is disabled');
  return null;
};

// Setup is a no-op
export const setupCaptcha = () => {
  console.log('hCaptcha setup disabled');
};

// Cleanup is a no-op
export const cleanupCaptcha = () => {
  console.log('hCaptcha cleanup disabled');
};
