
// LinkedIn data type
export interface LinkedInData {
  headline: string;
  skills: string[];
  positions: Array<{
    title: string;
    company: string;
    duration: string;
  }>;
}

// Career document type
export interface CareerDoc {
  type: string;
  content: string;
}

// Resume data interface
export interface ResumeData {
  currentPosition: string;
  company: string;
  duration: string;
  skills: string[];
  fullName: string;  // Added fullName property
  yearsExperience: number | null;  // Added yearsExperience property
  isLoading: boolean;
  error: string | null;
}

// Bio generator context type
export interface BioGeneratorContextType {
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
  // Form and data properties
  form: any; // We'll define this properly in the form schema file
  onSubmit: (values: any) => void; // This will be updated when we import the form values type
  linkedInData: LinkedInData | null;
  careerDocs: CareerDoc[];
  dataSourcesLoaded: boolean;
  resumeData: ResumeData;
}

// Re-export the BioFormValues type from our schema file
export type { BioFormValues } from "./schema";
