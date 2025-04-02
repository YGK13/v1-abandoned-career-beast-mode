
// Utility functions for hCaptcha integration

export interface CaptchaData {
  token: string;
  siteKey: string;
}

let hCaptchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"; // Default to test key if not set

// API to get hCaptcha token
export const getHCaptchaToken = async (): Promise<CaptchaData | null> => {
  try {
    if (typeof (window as any).hcaptcha === 'undefined') {
      console.error('hCaptcha not loaded');
      return null;
    }

    // Execute hCaptcha
    const token = await new Promise<string>((resolve, reject) => {
      (window as any).hcaptcha.execute(hCaptchaSiteKey, { async: true })
        .then((response: string) => {
          resolve(response);
        })
        .catch((error: any) => {
          console.error('hCaptcha execution error:', error);
          reject(error);
        });
    });

    return {
      token,
      siteKey: hCaptchaSiteKey
    };
  } catch (error) {
    console.error('Error getting hCaptcha token:', error);
    return null;
  }
};

// Setup hCaptcha
export const setupCaptcha = () => {
  // Check if hCaptcha script is already loaded
  if (document.querySelector('script[src*="hcaptcha"]')) {
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

// Clean up hCaptcha
export const cleanupCaptcha = () => {
  if (typeof (window as any).hcaptcha !== 'undefined') {
    (window as any).hcaptcha.reset();
  }
};
