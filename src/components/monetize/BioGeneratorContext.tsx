
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { BioGeneratorContextType } from "./bio-generator/types";
import { BioFormValues, useBioForm } from "./bio-generator/schema";
import { useBioGeneration } from "./bio-generator/useBioGeneration";
import { useDataSources } from "./bio-generator/useDataSources";
import { useResumeData } from "@/hooks/useResumeData";

// Create context
const BioGeneratorContext = createContext<BioGeneratorContextType | undefined>(undefined);

// Context provider component
export const BioGeneratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
  
  // Initialize the form
  const form = useBioForm();

  // Get resume data to pre-populate fields
  const resumeData = useResumeData();

  // Use our custom hooks
  const { 
    linkedInData, 
    careerDocs, 
    dataSourcesLoaded 
  } = useDataSources();
  
  const {
    generatedBio,
    isGenerating,
    generateBio,
    regenerateBio,
    copyToClipboard,
    saveBio
  } = useBioGeneration();

  // Auto-populate form from resume data when available
  useEffect(() => {
    if (!resumeData.isLoading && resumeData.currentPosition) {
      // Set headline if not already set
      if (!headline) {
        setHeadline(resumeData.currentPosition);
      }
      
      // Set expertise from skills
      if (resumeData.skills && resumeData.skills.length > 0 && expertise.length === 0) {
        setExpertise(resumeData.skills);
        form.setValue("expertise", resumeData.skills.join(", "));
      }
      
      // Try to extract name from document title
      if (!firstName && resumeData.fullName) {
        const nameParts = resumeData.fullName.split(" ");
        if (nameParts.length > 0) {
          setFirstName(nameParts[0]);
          if (nameParts.length > 1) {
            setLastName(nameParts.slice(1).join(" "));
          }
        }
      }
      
      // Set years of experience if available
      if (!years && resumeData.yearsExperience) {
        setYears(String(resumeData.yearsExperience));
        form.setValue("experience", String(resumeData.yearsExperience));
      }
    }
  }, [resumeData.isLoading, resumeData.currentPosition, headline, expertise.length, firstName, years, form]);

  // Form submission handler
  const onSubmit = (values: BioFormValues) => {
    // Update state from form values
    setExpertise(values.expertise.split(",").map(item => item.trim()));
    setYears(values.experience);
    setIncludeLinkedIn(values.includeLinkedIn);
    setIncludeDocuments(values.includeCareerDocs);
    
    // Generate bio with the updated values
    generateBio(
      firstName, 
      lastName, 
      headline || values.targetAudience, // Use headline or target audience if headline not provided
      values.experience, 
      values.expertise.split(",").map(item => item.trim()),
      tone,
      length,
      values.includeLinkedIn,
      values.includeCareerDocs,
      linkedInData,
      careerDocs
    );
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
    generateBio: () => generateBio(
      firstName, 
      lastName, 
      headline, 
      years, 
      expertise, 
      tone, 
      length, 
      includeLinkedIn, 
      includeDocuments,
      linkedInData,
      careerDocs
    ),
    regenerateBio: () => regenerateBio(
      firstName, 
      expertise, 
      linkedInData,
      careerDocs
    ),
    copyToClipboard,
    saveBio,
    // Form and data properties
    form,
    onSubmit,
    linkedInData,
    careerDocs,
    dataSourcesLoaded,
    resumeData
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
