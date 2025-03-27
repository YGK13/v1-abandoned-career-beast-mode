
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getBioTemplates } from "./utils";

export function useBioGeneration() {
  const { toast } = useToast();
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
    includeDocuments: boolean
  ) => {
    if (!firstName || !lastName || !headline || !years || expertise.length === 0) {
      toast({
        description: "Please fill in all required fields before generating a bio",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const bioTemplates = getBioTemplates(firstName, lastName, headline, years, expertise);
      let bio: string;
      
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
      
      // Adjust length
      if (length === "short") {
        bio = bio.split(". ").slice(0, 2).join(". ") + ".";
      } else if (length === "long") {
        bio = bio + `\n\nThroughout ${firstName}'s career, they have consistently demonstrated the ability to ${expertise[0]} and ${expertise[expertise.length - 1]}. With a focus on delivering high-quality results, ${firstName} approaches each project with a keen analytical mindset and creative problem-solving abilities.`;
      }
      
      // Include LinkedIn data
      if (includeLinkedIn) {
        bio += `\n\nAccording to ${firstName}'s LinkedIn profile, they have collaborated with cross-functional teams and stakeholders to drive successful outcomes on multiple projects. Their expertise spans across various domains, enabling them to provide comprehensive solutions.`;
      }
      
      // Include documents data
      if (includeDocuments) {
        bio += `\n\nAs documented in their professional portfolio, ${firstName} has received recognition for exceptional work in ${expertise[Math.floor(Math.random() * expertise.length)]}, demonstrating a commitment to excellence and continuous improvement.`;
      }
      
      setGeneratedBio(bio);
      setIsGenerating(false);
      
      toast({
        description: "Bio generated successfully!",
      });
    }, 1500);
  };
  
  // Regenerate bio
  const regenerateBio = (firstName: string, expertise: string[]) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Slightly modify the existing bio for demonstration purposes
      if (generatedBio) {
        const newBio = generatedBio.replace(
          /specializing in/,
          "with specialized focus on"
        );
        setGeneratedBio(newBio);
      }
      
      setIsGenerating(false);
      
      toast({
        description: "Bio regenerated with new variations",
      });
    }, 1000);
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    if (generatedBio) {
      navigator.clipboard.writeText(generatedBio);
      
      toast({
        description: "Bio copied to clipboard",
      });
    }
  };
  
  // Save bio
  const saveBio = () => {
    if (generatedBio) {
      toast({
        description: "Bio saved to your assets",
      });
    }
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
