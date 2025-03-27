
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface BioGeneratorFormValues {
  expertise: string;
  experience: string;
  achievements: string;
  targetAudience: string;
  platform: string;
  wordLimit: number;
  includeLinkedIn: boolean;
  includeCareerDocs: boolean;
}

interface LinkedInData {
  skills: string[];
  headline: string;
  summary: string;
  positions: {
    title: string;
    company: string;
    duration: string;
  }[];
}

interface CareerDoc {
  type: string;
  content: string;
}

interface BioGeneratorContextType {
  form: UseFormReturn<BioGeneratorFormValues>;
  generatedBio: string;
  setGeneratedBio: React.Dispatch<React.SetStateAction<string>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  linkedInData: LinkedInData | null;
  careerDocs: CareerDoc[];
  dataSourcesLoaded: boolean;
  generateEnhancedBio: (data: BioGeneratorFormValues) => string;
  copyToClipboard: () => void;
  regenerateBio: () => void;
  saveBio: () => void;
  onSubmit: (data: BioGeneratorFormValues) => void;
}

const BioGeneratorContext = createContext<BioGeneratorContextType | undefined>(undefined);

export const BioGeneratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [generatedBio, setGeneratedBio] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInData | null>(null);
  const [careerDocs, setCareerDocs] = useState<CareerDoc[]>([]);
  const [dataSourcesLoaded, setDataSourcesLoaded] = useState(false);

  const form = useForm<BioGeneratorFormValues>({
    defaultValues: {
      expertise: "",
      experience: "",
      achievements: "",
      targetAudience: "",
      platform: "",
      wordLimit: 150,
      includeLinkedIn: true,
      includeCareerDocs: true
    }
  });

  // Simulate fetching LinkedIn profile data
  useEffect(() => {
    // In a real app, this would connect to your LinkedIn API integration
    const fetchLinkedInData = () => {
      // Simulated data
      return {
        skills: ["Leadership", "Product Management", "Digital Marketing", "Data Analysis"],
        headline: "Product Manager with 10+ years experience in SaaS",
        summary: "Results-driven product leader with experience scaling products from zero to millions in revenue.",
        positions: [
          { title: "Senior Product Manager", company: "Tech Solutions Inc.", duration: "3 years" },
          { title: "Product Manager", company: "Digital Innovations", duration: "4 years" },
        ]
      };
    };

    // Simulate fetching career documents
    const fetchCareerDocs = () => {
      // Simulated data
      return [
        { type: "Resume", content: "Led cross-functional teams to deliver enterprise solutions..." },
        { type: "Performance Review", content: "Exceeded targets by 40% through innovative product strategies..." },
        { type: "Professional Bio", content: "Experienced product leader with a track record of success..." }
      ];
    };

    // Set the data
    setLinkedInData(fetchLinkedInData());
    setCareerDocs(fetchCareerDocs());
    setDataSourcesLoaded(true);
  }, []);

  const generateEnhancedBio = (data: BioGeneratorFormValues) => {
    const { expertise, experience, achievements, targetAudience, wordLimit, includeLinkedIn, includeCareerDocs } = data;
    
    // Start with basic information
    let bioContent = `Experienced ${expertise} professional with ${experience} years in the industry. `;
    
    // Add achievements if provided
    if (achievements) {
      bioContent += `Known for ${achievements}. `;
    }
    
    // Include LinkedIn data if selected
    if (includeLinkedIn && linkedInData) {
      bioContent += `Specialized in ${linkedInData.skills.slice(0, 3).join(", ")}. `;
      bioContent += `${linkedInData.summary.substring(0, 100)}... `;
      
      if (linkedInData.positions && linkedInData.positions.length > 0) {
        const recentPosition = linkedInData.positions[0];
        bioContent += `Currently working as ${recentPosition.title} at ${recentPosition.company}. `;
      }
    }
    
    // Include career documents data if selected
    if (includeCareerDocs && careerDocs.length > 0) {
      // Extract relevant info from career docs
      const resumeDoc = careerDocs.find(doc => doc.type === "Resume");
      const bioDoc = careerDocs.find(doc => doc.type === "Professional Bio");
      
      if (resumeDoc) {
        bioContent += `${resumeDoc.content.substring(0, 80)}... `;
      }
      
      if (bioDoc) {
        bioContent += `${bioDoc.content.substring(0, 80)}... `;
      }
    }
    
    // Add target audience if provided
    if (targetAudience) {
      bioContent += `Helping ${targetAudience} achieve their goals. `;
    }
    
    // Add a call to action
    bioContent += "Let's connect to discuss how I can help you succeed!";
    
    // Trim to word limit
    const words = bioContent.split(' ');
    if (words.length > wordLimit) {
      bioContent = words.slice(0, wordLimit).join(' ') + '...';
    }
    
    return bioContent;
  };

  const onSubmit = (data: BioGeneratorFormValues) => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a bio based on the input and integrated data sources
      const bio = generateEnhancedBio(data);
      setGeneratedBio(bio);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedBio);
    toast({
      title: "Bio copied to clipboard"
    });
  };

  const regenerateBio = () => {
    if (form.formState.isValid) {
      onSubmit(form.getValues());
    } else {
      form.trigger();
    }
  };

  const saveBio = () => {
    // This would connect to a document storage functionality
    toast({
      title: "Bio saved to your Career Assets"
    });
  };

  return (
    <BioGeneratorContext.Provider
      value={{
        form,
        generatedBio,
        setGeneratedBio,
        isGenerating,
        setIsGenerating,
        linkedInData,
        careerDocs,
        dataSourcesLoaded,
        generateEnhancedBio,
        copyToClipboard,
        regenerateBio,
        saveBio,
        onSubmit
      }}
    >
      {children}
    </BioGeneratorContext.Provider>
  );
};

export const useBioGenerator = () => {
  const context = useContext(BioGeneratorContext);
  if (context === undefined) {
    throw new Error("useBioGenerator must be used within a BioGeneratorProvider");
  }
  return context;
};

// import toast library
import { toast } from "sonner";
