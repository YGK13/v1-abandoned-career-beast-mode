
/**
 * Utility functions for extracting data from resume documents
 */

/**
 * Attempts to extract a full name from a resume title
 */
export const extractNameFromTitle = (title: string): string => {
  // Common resume title patterns: "Name Resume", "Resume - Name", "Name CV", etc.
  const namePatterns = [
    /^([\w\s]+?)\s+(?:Resume|CV)/i,  // "John Smith Resume"
    /^(?:Resume|CV)(?:\s+(?:for|of)?\s+|-\s*)([\w\s]+)/i,  // "Resume - John Smith" or "Resume for John Smith"
    /([\w\s]+?)(?:'s)?\s+(?:Resume|CV)/i  // "John Smith's Resume"
  ];
  
  for (const pattern of namePatterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // Look for name-like patterns with capitalization
  const words = title.split(/\s+/);
  const potentialName = words.filter(word => 
    word.length > 1 && 
    word[0] === word[0].toUpperCase() &&
    !/(?:resume|cv|portfolio|profile|document)/i.test(word)
  ).join(" ");
  
  if (potentialName) return potentialName;
  
  return "";
};

/**
 * Attempts to extract position/role from a resume title
 */
export const extractPositionFromTitle = (title: string): string => {
  const positionKeywords = ["engineer", "manager", "developer", "analyst", "specialist", 
                          "director", "coordinator", "assistant", "lead", "chief", 
                          "officer", "head", "sme", "expert", "consultant", "professional"];
  
  // Check if any position keywords are in the title
  for (const keyword of positionKeywords) {
    if (title.toLowerCase().includes(keyword)) {
      const words = title.split(" ");
      // Find the keyword in the title and get the surrounding words
      const keywordIndex = words.findIndex(w => w.toLowerCase().includes(keyword));
      if (keywordIndex !== -1) {
        // Get up to 3 words before and including the keyword
        const startIndex = Math.max(0, keywordIndex - 2);
        const position = words.slice(startIndex, keywordIndex + 1).join(" ");
        return position;
      }
    }
  }
  return title; // Default to title if no position found
};

/**
 * Extracts skills from a resume title or uses defaults
 */
export const extractSkillsFromTitle = (title: string): string[] => {
  // Common professional skills to look for
  const skillKeywords = ["ai", "hr", "product", "management", "leadership", "data", 
                        "analysis", "strategy", "communication", "project", "agile", 
                        "scrum", "development", "research", "technical", "design"];
  
  const foundSkills = skillKeywords.filter(skill => 
    title.toLowerCase().includes(skill)
  );
  
  // Add domain from title if not already in skills
  const domainMatch = title.match(/(?:in|for|at)\s+(\w+)/i);
  if (domainMatch && domainMatch[1]) {
    const domain = domainMatch[1];
    if (!foundSkills.includes(domain.toLowerCase())) {
      foundSkills.push(domain);
    }
  }
  
  return foundSkills.length > 0 
    ? foundSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)) 
    : ["Leadership", "Strategy", "Communication"];
};

/**
 * Extracts years of experience from text
 */
export const extractYearsExperience = (text: string): number | null => {
  // Look for patterns like "X years", "X+ years", "X yr", etc.
  const yearsPatterns = [
    /(\d+)(?:\+)?\s*(?:years?|yrs?)\s+(?:of\s+)?experience/i,
    /experience\D*(\d+)(?:\+)?\s*(?:years?|yrs?)/i,
    /(\d+)(?:\+)?\s*(?:years?|yrs?)\s+in\s+(?:the\s+)?(?:field|industry)/i
  ];
  
  for (const pattern of yearsPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  
  return null;
};
