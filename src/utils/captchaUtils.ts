
// Completely disabled captcha utility functions

export interface CaptchaData {
  token: string;
  siteKey: string;
}

// Completely bypass captcha functionality by always returning a dummy token
export const getHCaptchaToken = async (): Promise<CaptchaData> => {
  console.log('Captcha is completely disabled - bypassing with dummy token');
  // Return a dummy token that will be ignored
  return {
    token: "dummy-token-captcha-disabled",
    siteKey: "dummy-site-key"
  };
};

// Setup is a no-op
export const setupCaptcha = () => {
  console.log('Captcha setup is disabled');
};

// Cleanup is a no-op
export const cleanupCaptcha = () => {
  console.log('Captcha cleanup is disabled');
};
