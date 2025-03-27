
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

export const linkedInProfileSchema = z.object({
  profileUrl: z.string().url("Please enter a valid LinkedIn URL").includes("linkedin.com", {
    message: "Please enter a valid LinkedIn URL",
  }),
});

export type LinkedInProfileFormValues = z.infer<typeof linkedInProfileSchema>;

export const simulateImportProcess = (
  setIsImporting: (value: boolean) => void,
  setImportProgress: React.Dispatch<React.SetStateAction<number>>,
  onImportComplete: () => void
) => {
  setIsImporting(true);
  setImportProgress(0);
  
  const interval = setInterval(() => {
    setImportProgress((prev) => {
      const newProgress = prev + 20;
      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsImporting(false);
          onImportComplete();
        }, 500);
        return 100;
      }
      return newProgress;
    });
  }, 700);
};
