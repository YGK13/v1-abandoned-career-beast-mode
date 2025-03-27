
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText, Check } from "lucide-react";
import { Job } from "../data/types";
import ResumeGenerationProgress from "./ResumeGenerationProgress";
import ResumePreview from "./ResumePreview";
import { useResumeGenerator } from "./useResumeGenerator";

interface ResumeGeneratorProps {
  job: Job;
  isGenerating: boolean;
  isApplying: boolean;
  onApply: (resumeData: any) => void;
  onCancel: () => void;
}

const ResumeGenerator: React.FC<ResumeGeneratorProps> = ({ 
  job, 
  isGenerating, 
  isApplying,
  onApply, 
  onCancel 
}) => {
  const [openModal, setOpenModal] = useState(true);
  const { progress, currentStage, resumeData } = useResumeGenerator(isGenerating, job);
  
  const handleModalClose = () => {
    setOpenModal(false);
    onCancel();
  };
  
  const handleApply = () => {
    if (resumeData) {
      onApply(resumeData);
    }
  };
  
  return (
    <Dialog open={openModal} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Tailoring Resume for {job.title}
          </DialogTitle>
          <DialogDescription>
            Creating an ATS-optimized resume specifically for {job.company}
          </DialogDescription>
        </DialogHeader>
        
        <ResumeGenerationProgress 
          progress={progress} 
          currentStage={currentStage} 
        />
        
        {resumeData && <ResumePreview resumeData={resumeData} job={job} />}
        
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" onClick={handleModalClose} disabled={isApplying}>
            Cancel
          </Button>
          <Button 
            onClick={handleApply} 
            disabled={!resumeData || isApplying}
            className="gap-2"
          >
            {isApplying ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <Check size={16} />
                Apply Now
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeGenerator;
