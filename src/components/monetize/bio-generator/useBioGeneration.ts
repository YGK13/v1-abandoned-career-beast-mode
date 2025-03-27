
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
    try {
      // Validate required fields
      if (!firstName || !lastName || !headline || !years || expertise.length === 0) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields before generating a bio",
          variant: "destructive"
        });
        return;
      }

      // Validate numeric inputs
      if (isNaN(Number(years)) || Number(years) <= 0) {
        toast({
          title: "Invalid Input",
          description: "Years of experience must be a positive number",
          variant: "destructive"
        });
        return;
      }
      
      setIsGenerating(true);
      
      // Simulate API call delay
      setTimeout(() => {
        try {
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
          toast({
            title: "Success",
            description: "Bio generated successfully!",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "An error occurred while generating your bio. Please try again.",
            variant: "destructive"
          });
          console.error("Bio generation error:", error);
        } finally {
          setIsGenerating(false);
        }
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please check your inputs and try again.",
        variant: "destructive"
      });
      console.error("Bio generation setup error:", error);
      setIsGenerating(false);
    }
  };
  
  // Regenerate bio
  const regenerateBio = (firstName: string, expertise: string[]) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Slightly modify the existing bio for demonstration purposes
        if (generatedBio) {
          const newBio = generatedBio.replace(
            /specializing in/,
            "with specialized focus on"
          );
          setGeneratedBio(newBio);
          
          toast({
            title: "Success",
            description: "Bio regenerated with new variations",
          });
        } else {
          toast({
            title: "Info",
            description: "Please generate a bio first before regenerating",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while regenerating your bio",
          variant: "destructive"
        });
        console.error("Bio regeneration error:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    if (generatedBio) {
      try {
        navigator.clipboard.writeText(generatedBio);
        
        toast({
          title: "Copied",
          description: "Bio copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive"
        });
        console.error("Clipboard error:", error);
      }
    } else {
      toast({
        title: "Info",
        description: "No bio to copy. Generate one first!",
      });
    }
  };
  
  // Save bio
  const saveBio = () => {
    if (generatedBio) {
      try {
        // This would typically save to a database
        toast({
          title: "Saved",
          description: "Bio saved to your assets",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save your bio",
          variant: "destructive"
        });
        console.error("Save bio error:", error);
      }
    } else {
      toast({
        title: "Info",
        description: "No bio to save. Generate one first!",
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
