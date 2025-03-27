
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { BioGeneratorContextType, LinkedInData, CareerDoc } from "./bio-generator/types";
import { BioFormValues, useBioForm } from "./bio-generator/schema";
import { getBioTemplates, getMockLinkedInData, getMockCareerDocs } from "./bio-generator/utils";

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

  // Data sources state
  const [linkedInData, setLinkedInData] = useState<LinkedInData | null>(null);
  const [careerDocs, setCareerDocs] = useState<CareerDoc[]>([]);
  const [dataSourcesLoaded, setDataSourcesLoaded] = useState(true);

  // Initialize the form
  const form = useBioForm();

  // Form submission handler
  const onSubmit = (values: BioFormValues) => {
    setIsGenerating(true);
    console.log("Form values:", values);
    
    // Update state from form values
    setExpertise(values.expertise.split(",").map(item => item.trim()));
    setYears(values.experience);
    setIncludeLinkedIn(values.includeLinkedIn);
    setIncludeDocuments(values.includeCareerDocs);
    
    // Simulate API call delay
    setTimeout(() => {
      generateBio();
    }, 1000);
  };

  // Load mock data on mount
  useEffect(() => {
    setTimeout(() => {
      setLinkedInData(getMockLinkedInData());
      setCareerDocs(getMockCareerDocs());
      setDataSourcesLoaded(true);
    }, 1500);
  }, []);

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
    saveBio,
    // Form and data properties
    form,
    onSubmit,
    linkedInData,
    careerDocs,
    dataSourcesLoaded
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
