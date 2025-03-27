
import React, { createContext, useContext, useState, ReactNode } from "react";
import { BioGeneratorContextType } from "./bio-generator/types";
import { BioFormValues, useBioForm } from "./bio-generator/schema";
import { useBioGeneration } from "./bio-generator/useBioGeneration";
import { useDataSources } from "./bio-generator/useDataSources";

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

  // Form submission handler
  const onSubmit = (values: BioFormValues) => {
    // Update state from form values
    setExpertise(values.expertise.split(",").map(item => item.trim()));
    setYears(values.experience);
    setIncludeLinkedIn(values.includeLinkedIn);
    setIncludeDocuments(values.includeCareerDocs);
    
    // Simulate API call delay
    setTimeout(() => {
      generateBio(
        firstName, 
        lastName, 
        headline, 
        values.experience, 
        values.expertise.split(",").map(item => item.trim()),
        tone,
        length,
        values.includeLinkedIn,
        values.includeCareerDocs
      );
    }, 1000);
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
      includeDocuments
    ),
    regenerateBio: () => regenerateBio(firstName, expertise),
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
