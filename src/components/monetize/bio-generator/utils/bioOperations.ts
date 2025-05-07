
import { toast } from "@/hooks/use-toast";

/**
 * Copies the bio to clipboard
 */
export const copyBioToClipboard = (generatedBio: string | null): boolean => {
  if (!generatedBio) {
    toast({
      title: "Info",
      description: "No bio to copy. Generate one first!",
    });
    return false;
  }

  try {
    navigator.clipboard.writeText(generatedBio);
    
    toast({
      title: "Copied",
      description: "Bio copied to clipboard",
    });
    return true;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to copy to clipboard",
      variant: "destructive"
    });
    console.error("Clipboard error:", error);
    return false;
  }
};

/**
 * Saves the bio (simulated functionality)
 */
export const saveBioToAssets = (generatedBio: string | null): boolean => {
  if (!generatedBio) {
    toast({
      title: "Info",
      description: "No bio to save. Generate one first!",
    });
    return false;
  }

  try {
    // This would typically save to a database
    toast({
      title: "Saved",
      description: "Bio saved to your assets",
    });
    return true;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to save your bio",
      variant: "destructive"
    });
    console.error("Save bio error:", error);
    return false;
  }
};
