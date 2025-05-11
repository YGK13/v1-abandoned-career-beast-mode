// This file has been emptied as part of LinkedIn integration removal
export type SSOProvider = "google";

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
