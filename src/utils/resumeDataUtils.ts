
/**
 * Utilities related to resume data processing
 */
import { extractNameFromTitle, extractPositionFromTitle, extractSkillsFromTitle, extractYearsExperience } from "./resumeDataExtractor";

// Re-export the extractors for use elsewhere
export { 
  extractNameFromTitle,
  extractPositionFromTitle,
  extractSkillsFromTitle,
  extractYearsExperience
};

/**
 * Gets a display name from a full name by taking the first name
 */
export const getDisplayName = (fullName: string): string => {
  if (!fullName) return "";
  return fullName.split(' ')[0];
};

/**
 * Determines career level from position title
 */
export const determineCareerLevel = (position: string): 'entry' | 'mid' | 'senior' | 'executive' => {
  const positionLower = position.toLowerCase();
  
  if (positionLower.includes('chief') || 
      positionLower.includes('ceo') || 
      positionLower.includes('cto') || 
      positionLower.includes('cfo') ||
      positionLower.includes('vice president') ||
      positionLower.includes('vp')) {
    return 'executive';
  }
  
  if (positionLower.includes('senior') || 
      positionLower.includes('sr') || 
      positionLower.includes('lead') || 
      positionLower.includes('principal') ||
      positionLower.includes('manager') ||
      positionLower.includes('director')) {
    return 'senior';
  }
  
  if (positionLower.includes('junior') || 
      positionLower.includes('jr') ||
      positionLower.includes('associate') ||
      positionLower.includes('intern')) {
    return 'entry';
  }
  
  return 'mid';
};
