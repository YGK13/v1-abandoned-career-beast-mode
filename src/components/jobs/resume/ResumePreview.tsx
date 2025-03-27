
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Job } from "../data/types";
import { FileText, CheckCircle, Star, Briefcase, Calendar, MapPin, Save } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ResumePreviewProps {
  resumeData: {
    jobTitle: string;
    company: string;
    tailoredSkills: string[];
    resumeId: string;
    atsScore: number;
    keywords: string[];
  } | null;
  job: Job;
  onSaveResume?: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, job, onSaveResume }) => {
  const { toast } = useToast();
  
  if (!resumeData) return null;
  
  const atsScoreColor = resumeData.atsScore >= 90 
    ? "bg-green-100 text-green-700 border-green-200" 
    : resumeData.atsScore >= 80 
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-red-100 text-red-700 border-red-200";
  
  const handleSaveResume = () => {
    // Save to local storage
    const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
    
    // Check if this resume is already saved
    const alreadySaved = savedResumes.some((resume: any) => resume.resumeId === resumeData.resumeId);
    
    if (!alreadySaved) {
      const resumeToSave = {
        ...resumeData,
        job: {
          title: job.title,
          company: job.company,
          location: job.location,
          postedDate: job.postedDate,
          skills: job.skills
        },
        savedAt: new Date().toISOString()
      };
      
      savedResumes.push(resumeToSave);
      localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
      
      toast({
        title: "Resume Saved",
        description: "Your tailored resume has been saved for future reference.",
      });
    } else {
      toast({
        title: "Already Saved",
        description: "This resume is already in your saved collection.",
      });
    }
    
    if (onSaveResume) {
      onSaveResume();
    }
  };
  
  return (
    <DashboardCard className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h4 className="font-medium">ATS-Optimized Resume</h4>
        </div>
        <Badge variant="outline" className={`${atsScoreColor} font-medium`}>
          {resumeData.atsScore}% ATS Score
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">{job.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Posted: {job.postedDate}</p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Star className="h-4 w-4 text-amber-500" />
            <p className="text-sm font-medium">Key Skills Highlighted:</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-medium">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  {skill}
                </div>
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            This resume has been automatically tailored to match this job's requirements
            and optimized to pass ATS filters with a high score.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleSaveResume}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ResumePreview;
