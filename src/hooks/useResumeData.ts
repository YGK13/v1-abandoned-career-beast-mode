
import { useEffect, useState } from "react";
import { getUserDocuments } from "@/services/documentService";
import { useToast } from "@/hooks/use-toast";

interface ResumeData {
  currentPosition: string;
  company: string;
  duration: string;
  skills: string[];
  fullName: string;  // Added fullName property
  yearsExperience: number | null;  // Added yearsExperience property
  isLoading: boolean;
  error: string | null;
}

export const useResumeData = (): ResumeData => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    currentPosition: "",
    company: "",
    duration: "",
    skills: [],
    fullName: "",  // Initialize fullName
    yearsExperience: null,  // Initialize yearsExperience
    isLoading: true,
    error: null
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const { data: documents, error } = await getUserDocuments();
        
        if (error) {
          console.error("Error fetching documents:", error);
          toast({
            title: "Error loading resume data",
            description: error.message,
            variant: "destructive",
          });
          setResumeData(prevData => ({
            ...prevData,
            isLoading: false,
            error: error.message
          }));
          return;
        }

        console.log("Documents fetched:", documents);
        
        // Find the most recent resume document
        const resumeDoc = documents?.filter(doc => 
          doc.doc_type?.toLowerCase() === "resume"
        ).sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0];

        console.log("Resume document found:", resumeDoc);
        
        if (resumeDoc) {
          // Extract information from title if description is not available
          const title = resumeDoc.title || "";
          
          // Try to extract full name from title
          const extractNameFromTitle = (title: string): string => {
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
          
          // Try to extract position from title if no description
          const extractPositionFromTitle = (title: string) => {
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
          
          // Extract skills from title or use defaults
          const extractSkillsFromTitle = (title: string) => {
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
          
          // Extract years of experience from title or description
          const extractYearsExperience = (text: string): number | null => {
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
          
          const fullName = extractNameFromTitle(title);
          const yearsExperience = extractYearsExperience(title + " " + (resumeDoc.description || ""));
          
          // Process description or use title-based extraction
          if (resumeDoc.description) {
            // Extract from description as before
            const positionMatch = resumeDoc.description.match(/(?:position|role|title):\s*([^,\n]+)/i);
            const companyMatch = resumeDoc.description.match(/(?:company|employer|organization):\s*([^,\n]+)/i);
            const durationMatch = resumeDoc.description.match(/(?:duration|years|period):\s*([^,\n]+)/i);
            const skillsMatch = resumeDoc.description.match(/(?:skills|expertise|competencies):\s*([^,\n]+)/i);
            
            // Extract additional years of experience from description if not found in title
            const descYearsExp = yearsExperience || extractYearsExperience(resumeDoc.description);
            
            setResumeData({
              currentPosition: positionMatch?.[1]?.trim() || extractPositionFromTitle(title),
              company: companyMatch?.[1]?.trim() || "Current Company",
              duration: durationMatch?.[1]?.trim() || "Current",
              skills: skillsMatch 
                ? skillsMatch[1].split(',').map(s => s.trim()) 
                : extractSkillsFromTitle(title),
              fullName: fullName || "Professional",
              yearsExperience: descYearsExp,
              isLoading: false,
              error: null
            });
          } else {
            // Extract from title when no description
            const position = extractPositionFromTitle(title);
            const skills = extractSkillsFromTitle(title);
            
            // Check title for company/organization
            const companyMatch = title.match(/(?:at|for|with)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
            
            setResumeData({
              currentPosition: position,
              company: companyMatch?.[1] || "Current Company",
              duration: "Current",
              skills: skills,
              fullName: fullName || "Professional",
              yearsExperience: yearsExperience,
              isLoading: false,
              error: null
            });
          }
        } else {
          // Fallback to default values if no resume found
          setResumeData({
            currentPosition: "Senior Professional",
            company: "Current Company",
            duration: "Current",
            skills: ["Leadership", "Strategic Planning", "Communication"],
            fullName: "Professional",
            yearsExperience: 5,
            isLoading: false,
            error: "No resume found. Using default values."
          });
          
          toast({
            title: "No resume found",
            description: "Upload a resume to see personalized career path analysis.",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error processing resume data:", error);
        setResumeData(prevData => ({
          ...prevData,
          isLoading: false,
          error: "Error processing resume data"
        }));
      }
    };
    
    fetchResumeData();
  }, [toast]);

  return resumeData;
};
