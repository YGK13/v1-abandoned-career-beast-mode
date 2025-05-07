
import { useEffect, useState } from "react";
import { getUserDocuments } from "@/services/documentService";
import { useToast } from "@/hooks/use-toast";

interface ResumeData {
  currentPosition: string;
  company: string;
  duration: string;
  skills: string[];
  isLoading: boolean;
  error: string | null;
}

export const useResumeData = (): ResumeData => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    currentPosition: "",
    company: "",
    duration: "",
    skills: [],
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
          
          // Try to extract position from title if no description
          const extractPositionFromTitle = (title: string) => {
            const positionKeywords = ["engineer", "manager", "developer", "analyst", "specialist", 
                                    "director", "coordinator", "assistant", "lead", "chief", 
                                    "officer", "head", "sme", "expert"];
            
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
          
          // Process description or use title-based extraction
          if (resumeDoc.description) {
            // Extract from description as before
            const positionMatch = resumeDoc.description.match(/(?:position|role|title):\s*([^,\n]+)/i);
            const companyMatch = resumeDoc.description.match(/(?:company|employer|organization):\s*([^,\n]+)/i);
            const durationMatch = resumeDoc.description.match(/(?:duration|years|period):\s*([^,\n]+)/i);
            const skillsMatch = resumeDoc.description.match(/(?:skills|expertise|competencies):\s*([^,\n]+)/i);
            
            setResumeData({
              currentPosition: positionMatch?.[1]?.trim() || extractPositionFromTitle(title),
              company: companyMatch?.[1]?.trim() || "Current Company",
              duration: durationMatch?.[1]?.trim() || "Current",
              skills: skillsMatch 
                ? skillsMatch[1].split(',').map(s => s.trim()) 
                : extractSkillsFromTitle(title),
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
