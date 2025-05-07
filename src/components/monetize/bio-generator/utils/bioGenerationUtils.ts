
import { LinkedInData, CareerDoc } from "../types";
import { toast } from "@/hooks/use-toast";

/**
 * Validates the required fields for bio generation
 */
export const validateBioInputs = (
  firstName: string,
  lastName: string,
  headline: string,
  years: string,
  expertise: string[]
): { isValid: boolean; error?: string } => {
  // Validate required fields
  if (!firstName || !lastName || !headline || !years || expertise.length === 0) {
    return {
      isValid: false,
      error: "Please fill in all required fields before generating a bio"
    };
  }

  // Validate numeric inputs
  if (isNaN(Number(years)) || Number(years) <= 0) {
    return {
      isValid: false,
      error: "Years of experience must be a positive number"
    };
  }

  return { isValid: true };
};

/**
 * Enhances the bio with LinkedIn data
 */
export const enhanceWithLinkedIn = (
  bio: string,
  firstName: string,
  linkedInData: LinkedInData | null
): string => {
  if (!linkedInData) return bio;
  
  let enhancedBio = bio;
  
  // Add LinkedIn skills
  if (linkedInData.skills && linkedInData.skills.length > 0) {
    const topSkills = linkedInData.skills.slice(0, 3).join(", ");
    enhancedBio += `\n\n${firstName}'s LinkedIn profile highlights expertise in ${topSkills}.`;
  }
  
  // Add work experience
  if (linkedInData.positions && linkedInData.positions.length > 0) {
    const currentPosition = linkedInData.positions[0];
    enhancedBio += ` Their current role as ${currentPosition.title} at ${currentPosition.company} involves strategic leadership and industry expertise.`;
  }
  
  return enhancedBio;
};

/**
 * Enhances the bio with career documents
 */
export const enhanceWithCareerDocs = (
  bio: string,
  firstName: string,
  expertise: string[],
  careerDocs: CareerDoc[]
): string => {
  if (careerDocs.length === 0) return bio;
  
  let enhancedBio = bio;
  
  // Extract relevant content from resume
  const resume = careerDocs.find(doc => doc.type === "Resume");
  if (resume) {
    enhancedBio += `\n\nAs detailed in their professional resume, ${firstName} has demonstrated exceptional capabilities in ${expertise[0]}.`;
  }
  
  // Extract from cover letter or previous bio if available
  const otherDocs = careerDocs.filter(doc => doc.type !== "Resume");
  if (otherDocs.length > 0) {
    enhancedBio += ` Their professional portfolio further showcases achievements in ${expertise.length > 1 ? expertise[1] : expertise[0]}.`;
  }
  
  return enhancedBio;
};

/**
 * Adjusts the bio length based on the specified preference
 */
export const adjustBioLength = (
  bio: string,
  length: string,
  firstName: string,
  years: string,
  expertise: string[]
): string => {
  if (length === "short") {
    let shortBio = bio.split(". ").slice(0, 2).join(". ") + ".";
    shortBio = shortBio.split("\n\n")[0]; // Remove added paragraphs for short version
    return shortBio;
  } 
  
  if (length === "long") {
    return bio + `\n\nWith ${years} years of industry experience, ${firstName} has developed a comprehensive understanding of ${expertise.join(", ")} and continues to stay at the forefront of industry developments. ${firstName} approaches each engagement with a commitment to excellence and delivering tangible results.`;
  }
  
  return bio;
};

/**
 * Creates variations of the bio for regeneration
 */
export const createBioVariation = (
  existingBio: string,
  firstName: string,
  linkedInData: LinkedInData | null
): string => {
  let newBio = existingBio;
  
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
  
  return newBio;
};

/**
 * Handles toast notifications for the bio generator
 */
export const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
  toast({
    title,
    description,
    variant,
  });
};
