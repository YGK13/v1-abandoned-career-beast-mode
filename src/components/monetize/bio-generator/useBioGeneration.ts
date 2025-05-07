
import { useState } from "react";
import { LinkedInData, CareerDoc } from "./types";
import { getBioTemplates } from "./utils";
import { 
  validateBioInputs, 
  enhanceWithLinkedIn, 
  enhanceWithCareerDocs,
  adjustBioLength,
  createBioVariation,
  showToast
} from "./utils/bioGenerationUtils";
import { 
  copyBioToClipboard as copyToClip, 
  saveBioToAssets 
} from "./utils/bioOperations";

export function useBioGeneration() {
  const [generatedBio, setGeneratedBio] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Generate bio function
  const generateBio = (
    firstName: string,
    lastName: string,
    headline: string,
    years: string,
    expertise: string[],
    tone: string,
    length: string,
    includeLinkedIn: boolean,
    includeDocuments: boolean,
    linkedInData: LinkedInData | null,
    careerDocs: CareerDoc[]
  ) => {
    try {
      // Validate inputs
      const validation = validateBioInputs(firstName, lastName, headline, years, expertise);
      if (!validation.isValid) {
        showToast("Missing Information", validation.error || "", "destructive");
        return;
      }

      setIsGenerating(true);
      
      // Simulate API call delay
      setTimeout(() => {
        try {
          // Get basic bio template
          const bioTemplates = getBioTemplates(firstName, lastName, headline, years, expertise);
          let bio: string;
          
          // Select template based on tone
          switch (tone) {
            case "conversational":
              bio = bioTemplates.conversational;
              break;
            case "academic":
              bio = bioTemplates.academic;
              break;
            default:
              bio = bioTemplates.professional;
          }
          
          // Enhance with LinkedIn data if selected
          if (includeLinkedIn && linkedInData) {
            bio = enhanceWithLinkedIn(bio, firstName, linkedInData);
          }
          
          // Enhance with career documents if selected
          if (includeDocuments && careerDocs.length > 0) {
            bio = enhanceWithCareerDocs(bio, firstName, expertise, careerDocs);
          }
          
          // Adjust length
          bio = adjustBioLength(bio, length, firstName, years, expertise);
          
          setGeneratedBio(bio);
          showToast("Success", "Bio generated successfully!");
        } catch (error) {
          showToast("Error", "An error occurred while generating your bio. Please try again.", "destructive");
          console.error("Bio generation error:", error);
        } finally {
          setIsGenerating(false);
        }
      }, 1500);
    } catch (error) {
      showToast("Error", "An error occurred. Please check your inputs and try again.", "destructive");
      console.error("Bio generation setup error:", error);
      setIsGenerating(false);
    }
  };
  
  // Regenerate bio with variations
  const regenerateBio = (
    firstName: string, 
    expertise: string[],
    linkedInData: LinkedInData | null,
    careerDocs: CareerDoc[]
  ) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Slightly modify the existing bio for variation
        if (generatedBio) {
          const newBio = createBioVariation(generatedBio, firstName, linkedInData);
          setGeneratedBio(newBio);
          
          showToast("Success", "Bio regenerated with new variations");
        } else {
          showToast("Info", "Please generate a bio first before regenerating");
        }
      } catch (error) {
        showToast("Error", "An error occurred while regenerating your bio", "destructive");
        console.error("Bio regeneration error:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    copyToClip(generatedBio);
  };
  
  // Save bio
  const saveBio = () => {
    saveBioToAssets(generatedBio);
  };

  return {
    generatedBio,
    isGenerating,
    generateBio,
    regenerateBio,
    copyToClipboard,
    saveBio
  };
}
