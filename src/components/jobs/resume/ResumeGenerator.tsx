
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText, Check, UserCheck } from "lucide-react";
import { Job } from "../data/types";
import ResumeGenerationProgress from "./ResumeGenerationProgress";
import ResumePreview from "./ResumePreview";
import { useResumeGenerator } from "./useResumeGenerator";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  const handleModalClose = () => {
    setOpenModal(false);
    onCancel();
  };
  
  const handleApply = () => {
    if (resumeData) {
      onApply(resumeData);
    }
  };

  const handleSaveResume = () => {
    // Any additional logic needed when a resume is saved
  };
  
  return (
    <Dialog open={openModal} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-lg p-6 rounded-xl">
        <DialogHeader className="mb-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-primary" />
            {job.applicationStatus === "not_applied" ? 
              "Tailoring Resume for " + job.title :
              "Creating Referral Resume for " + job.title
            }
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {job.applicationStatus === "not_applied" ?
              `Creating an ATS-optimized resume specifically for ${job.company}` :
              `Creating a tailored resume for your referral request at ${job.company}`
            }
          </DialogDescription>
        </DialogHeader>
        
        <ResumeGenerationProgress 
          progress={progress} 
          currentStage={currentStage} 
        />
        
        {resumeData && <ResumePreview resumeData={resumeData} job={job} onSaveResume={handleSaveResume} />}
        
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={handleModalClose} disabled={isApplying} className="rounded-lg font-medium">
            Cancel
          </Button>
          <Button 
            onClick={handleApply} 
            disabled={!resumeData || isApplying}
            className="gap-2 rounded-lg font-medium"
          >
            {isApplying ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                {job.applicationStatus === "not_applied" ? "Applying..." : "Creating Request..."}
              </>
            ) : (
              <>
                {job.applicationStatus === "not_applied" ? 
                  <Check size={16} /> : 
                  <UserCheck size={16} />
                }
                {job.applicationStatus === "not_applied" ? "Apply Now" : "Request Referral"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeGenerator;
