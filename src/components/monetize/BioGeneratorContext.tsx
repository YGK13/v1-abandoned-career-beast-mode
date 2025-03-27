
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

// Define types
interface BioGeneratorContextType {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  headline: string;
  setHeadline: (value: string) => void;
  years: string;
  setYears: (value: string) => void;
  expertise: string[];
  setExpertise: (value: string[]) => void;
  tone: string;
  setTone: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  includeLinkedIn: boolean;
  setIncludeLinkedIn: (value: boolean) => void;
  includeDocuments: boolean;
  setIncludeDocuments: (value: boolean) => void;
  generatedBio: string | null;
  isGenerating: boolean;
  generateBio: () => void;
  regenerateBio: () => void;
  copyToClipboard: () => void;
  saveBio: () => void;
}

// Create context
const BioGeneratorContext = createContext<BioGeneratorContextType | undefined>(undefined);

// Context provider component
export const BioGeneratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [headline, setHeadline] = useState("");
  const [years, setYears] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [includeLinkedIn, setIncludeLinkedIn] = useState(true);
  const [includeDocuments, setIncludeDocuments] = useState(true);
  
  // Bio generation state
  const [generatedBio, setGeneratedBio] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Example bio templates
  const bioTemplates = {
    professional: `${firstName} ${lastName} is a ${headline} with ${years} years of experience, specializing in ${expertise.join(", ")}. Known for delivering strategic solutions, ${firstName} has a proven track record of success across various projects and initiatives.`,
    
    conversational: `Hey there! I'm ${firstName} ${lastName}, a passionate ${headline} with ${years} years in the field. I love working on ${expertise.join(", ")}, and I'm always looking for new challenges to tackle. Let's connect and explore how we can collaborate!`,
    
    academic: `${firstName} ${lastName}, a ${headline} with ${years} years of experience, has developed significant expertise in ${expertise.join(", ")}. Their research and professional work have contributed to advancements in these domains, leading to effective implementations across various contexts.`
  };

  // Generate bio function
  const generateBio = () => {
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
  const regenerateBio = () => {
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

  // Context value
  const value = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    headline,
    setHeadline,
    years,
    setYears,
    expertise,
    setExpertise,
    tone,
    setTone,
    length,
    setLength,
    includeLinkedIn,
    setIncludeLinkedIn,
    includeDocuments,
    setIncludeDocuments,
    generatedBio,
    isGenerating,
    generateBio,
    regenerateBio,
    copyToClipboard,
    saveBio
  };

  return (
    <BioGeneratorContext.Provider value={value}>
      {children}
    </BioGeneratorContext.Provider>
  );
};

// Custom hook to use the context
export const useBioGenerator = () => {
  const context = useContext(BioGeneratorContext);
  if (context === undefined) {
    throw new Error("useBioGenerator must be used within a BioGeneratorProvider");
  }
  return context;
};
