
import { useEffect, useState } from "react";
import { getUserDocuments, Document } from "@/services/documentService";
import { useToast } from "@/hooks/use-toast";

interface ResumeData {
  currentPosition: string;
  company: string;
  duration: string;
  skills: string[];
  isLoading: boolean;
}

export const useResumeData = (): ResumeData => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    currentPosition: "",
    company: "",
    duration: "",
    skills: [],
    isLoading: true,
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
          return;
        }
        
        // Find the most recent resume document
        const resumeDoc = documents?.filter(doc => 
          doc.doc_type?.toLowerCase() === "resume"
        ).sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0];
        
        if (resumeDoc?.description) {
          // Extract position information from the resume description
          // In a real app, this would use proper parsing or metadata from the resume
          const positionMatch = resumeDoc.description.match(/(?:position|role|title):\s*([^,\n]+)/i);
          const companyMatch = resumeDoc.description.match(/(?:company|employer|organization):\s*([^,\n]+)/i);
          const durationMatch = resumeDoc.description.match(/(?:duration|years|period):\s*([^,\n]+)/i);
          const skillsMatch = resumeDoc.description.match(/(?:skills|expertise|competencies):\s*([^,\n]+)/i);
          
          setResumeData({
            currentPosition: positionMatch?.[1]?.trim() || "Senior Product Manager",
            company: companyMatch?.[1]?.trim() || "TechCorp Inc.",
            duration: durationMatch?.[1]?.trim() || "3 years",
            skills: skillsMatch?.[1]?.split(',').map(s => s.trim()) || 
                   ["Product Strategy", "Team Leadership", "Agile"],
            isLoading: false
          });
        } else {
          // Fallback to default values if no resume or description
          setResumeData({
            currentPosition: "Senior Product Manager",
            company: "TechCorp Inc.",
            duration: "3 years",
            skills: ["Product Strategy", "Team Leadership", "Agile"],
            isLoading: false
          });
        }
      } catch (error) {
        console.error("Error processing resume data:", error);
        setResumeData(prevData => ({
          ...prevData,
          isLoading: false
        }));
      }
    };
    
    fetchResumeData();
  }, [toast]);

  return resumeData;
};
