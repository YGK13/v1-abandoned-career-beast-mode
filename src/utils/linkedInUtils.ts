
// LinkedIn utility types and functions
import { z } from "zod";

export type SSOProvider = "linkedin" | "google";

export const validateLinkedInState = (state: string | null, savedState: string | null): boolean => {
  if (!state || !savedState) return false;
  return state === savedState;
};

// LinkedIn profile form schema
export const linkedInProfileSchema = z.object({
  profileUrl: z
    .string()
    .url("Please enter a valid URL")
    .startsWith("https://www.linkedin.com/", "Must be a LinkedIn profile URL")
    .min(5, "Profile URL is required"),
});

// Type for the form values
export type LinkedInProfileFormValues = z.infer<typeof linkedInProfileSchema>;

// Simulated import process for demonstration purposes
export const simulateImportProcess = (
  setIsImporting: React.Dispatch<React.SetStateAction<boolean>>,
  setImportProgress: React.Dispatch<React.SetStateAction<number>>,
  onComplete?: () => void
) => {
  setIsImporting(true);
  setImportProgress(0);
  
  const totalSteps = 5;
  let currentStep = 0;
  
  const interval = setInterval(() => {
    currentStep++;
    setImportProgress(Math.round((currentStep / totalSteps) * 100));
    
    if (currentStep >= totalSteps) {
      clearInterval(interval);
      
      // If there's a completion callback, execute it after a short delay
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }
  }, 1000);
};
