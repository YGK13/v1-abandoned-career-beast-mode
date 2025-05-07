
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getBioTemplates } from "./utils";
import { LinkedInData, CareerDoc } from "./types";

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
    includeDocuments: boolean,
    linkedInData: LinkedInData | null,
    careerDocs: CareerDoc[]
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
          // Get basic bio template
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
          
          // Enhance with LinkedIn data if selected
          if (includeLinkedIn && linkedInData) {
            // Add LinkedIn skills
            if (linkedInData.skills && linkedInData.skills.length > 0) {
              const topSkills = linkedInData.skills.slice(0, 3).join(", ");
              bio += `\n\n${firstName}'s LinkedIn profile highlights expertise in ${topSkills}.`;
            }
            
            // Add work experience
            if (linkedInData.positions && linkedInData.positions.length > 0) {
              const currentPosition = linkedInData.positions[0];
              bio += ` Their current role as ${currentPosition.title} at ${currentPosition.company} involves strategic leadership and industry expertise.`;
            }
          }
          
          // Enhance with career documents if selected
          if (includeDocuments && careerDocs.length > 0) {
            // Extract relevant content from resume
            const resume = careerDocs.find(doc => doc.type === "Resume");
            if (resume) {
              bio += `\n\nAs detailed in their professional resume, ${firstName} has demonstrated exceptional capabilities in ${expertise[0]}.`;
            }
            
            // Extract from cover letter or previous bio if available
            const otherDocs = careerDocs.filter(doc => doc.type !== "Resume");
            if (otherDocs.length > 0) {
              bio += ` Their professional portfolio further showcases achievements in ${expertise.length > 1 ? expertise[1] : expertise[0]}.`;
            }
          }
          
          // Adjust length
          if (length === "short") {
            bio = bio.split(". ").slice(0, 2).join(". ") + ".";
            bio = bio.split("\n\n")[0]; // Remove added paragraphs for short version
          } else if (length === "long") {
            bio = bio + `\n\nWith ${years} years of industry experience, ${firstName} has developed a comprehensive understanding of ${expertise.join(", ")} and continues to stay at the forefront of industry developments. ${firstName} approaches each engagement with a commitment to excellence and delivering tangible results.`;
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
          let newBio = generatedBio;
          
          // Apply some variations
          newBio = newBio.replace(
            /specializing in/,
            "with specialized focus on"
          );
          
          // Shuffle word order in some phrases
          newBio = newBio.replace(
            /proven track record/,
            "track record of proven success"
          );
          
          // Maybe add a different LinkedIn insight
          if (linkedInData && newBio.includes("LinkedIn profile highlights")) {
            const positions = linkedInData.positions || [];
            if (positions.length > 1) {
              const previousRole = positions[1];
              newBio += ` Prior experience as ${previousRole.title} at ${previousRole.company} provided valuable industry insights.`;
            }
          }
          
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
