
// Utility functions for captcha (completely disabled)

export interface CaptchaData {
  token: string;
  siteKey: string;
}

// Completely remove captcha functionality
export const getHCaptchaToken = async (): Promise<CaptchaData | null> => {
  console.log('Captcha is completely disabled');
  return null;
};

// Setup is a no-op
export const setupCaptcha = () => {
  console.log('Captcha setup is disabled');
};

// Cleanup is a no-op
export const cleanupCaptcha = () => {
  console.log('Captcha cleanup is disabled');
};
