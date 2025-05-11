
import { useEffect, useState } from "react";
import { getUserDocuments } from "@/services/documentService";
import { useToast } from "@/hooks/use-toast";
import { processResumeDocument } from "./useResumeDataProcessing";

interface ResumeData {
  currentPosition: string;
  company: string;
  duration: string;
  skills: string[];
  fullName: string;
  yearsExperience: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useResumeData = (): ResumeData => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    currentPosition: "",
    company: "",
    duration: "",
    skills: [],
    fullName: "",
    yearsExperience: null,
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
          // Process resume document to extract data
          const extractedData = processResumeDocument(resumeDoc);
          
          setResumeData({
            ...extractedData,
            isLoading: false,
            error: null
          });
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
