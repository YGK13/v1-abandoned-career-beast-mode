
import { extractNameFromTitle, extractPositionFromTitle, extractSkillsFromTitle, extractYearsExperience } from "@/utils/resumeDataExtractor";

/**
 * Process resume document data and extract relevant information
 */
export const processResumeDocument = (resumeDoc: any) => {
  if (!resumeDoc) {
    return {
      fullName: "Professional",
      currentPosition: "Senior Professional",
      company: "Current Company",
      duration: "Current",
      skills: ["Leadership", "Strategic Planning", "Communication"],
      yearsExperience: 5
    };
  }

  // Extract data from resume document
  const title = resumeDoc.title || "";
  const fullName = extractNameFromTitle(title);
  const yearsExperience = extractYearsExperience(title + " " + (resumeDoc.description || ""));
  
  // Process description or use title-based extraction
  if (resumeDoc.description) {
    // Extract from description
    const positionMatch = resumeDoc.description.match(/(?:position|role|title):\s*([^,\n]+)/i);
    const companyMatch = resumeDoc.description.match(/(?:company|employer|organization):\s*([^,\n]+)/i);
    const durationMatch = resumeDoc.description.match(/(?:duration|years|period):\s*([^,\n]+)/i);
    const skillsMatch = resumeDoc.description.match(/(?:skills|expertise|competencies):\s*([^,\n]+)/i);
    
    // Extract additional years of experience from description if not found in title
    const descYearsExp = yearsExperience || extractYearsExperience(resumeDoc.description);
    
    return {
      currentPosition: positionMatch?.[1]?.trim() || extractPositionFromTitle(title),
      company: companyMatch?.[1]?.trim() || "Current Company",
      duration: durationMatch?.[1]?.trim() || "Current",
      skills: skillsMatch 
        ? skillsMatch[1].split(',').map((s: string) => s.trim()) 
        : extractSkillsFromTitle(title),
      fullName: fullName || "Professional",
      yearsExperience: descYearsExp
    };
  } else {
    // Extract from title when no description
    const position = extractPositionFromTitle(title);
    const skills = extractSkillsFromTitle(title);
    
    // Check title for company/organization
    const companyMatch = title.match(/(?:at|for|with)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
    
    return {
      currentPosition: position,
      company: companyMatch?.[1] || "Current Company",
      duration: "Current",
      skills: skills,
      fullName: fullName || "Professional",
      yearsExperience: yearsExperience
    };
  }
};
