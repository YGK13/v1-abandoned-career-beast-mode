
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, RefreshCw, FileText, CheckCircle2, X } from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  matchScore: number;
  skills: string[];
  isRecommended?: boolean;
}

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
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(true);
  const [currentStage, setCurrentStage] = useState<'analyzing' | 'optimizing' | 'formatting' | 'complete'>('analyzing');
  const [resumeData, setResumeData] = useState<any>(null);
  
  // Handle the resume generation process
  useEffect(() => {
    if (!isGenerating) return;
    
    let timer: ReturnType<typeof setTimeout>;
    
    const stages = [
      { name: 'analyzing', duration: 1200, targetProgress: 30 },
      { name: 'optimizing', duration: 1400, targetProgress: 60 },
      { name: 'formatting', duration: 1000, targetProgress: 90 },
      { name: 'complete', duration: 600, targetProgress: 100 }
    ];
    
    let currentStageIndex = 0;
    let startProgress = 0;
    
    const updateProgress = () => {
      const stage = stages[currentStageIndex];
      const increment = (stage.targetProgress - startProgress) / (stage.duration / 100);
      
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= stage.targetProgress) {
          // Move to next stage
          if (currentStageIndex < stages.length - 1) {
            startProgress = stage.targetProgress;
            currentStageIndex++;
            setCurrentStage(stages[currentStageIndex].name as any);
          }
          
          // Generate resume data when complete
          if (currentStageIndex === stages.length - 1) {
            setResumeData({
              jobTitle: job.title,
              company: job.company,
              tailoredSkills: job.skills,
              resumeId: `resume-${Date.now()}`,
              atsScore: Math.floor(Math.random() * 11) + 90, // 90-100 score
              keywords: job.skills.slice(0, 3)
            });
          }
          
          return stage.targetProgress;
        }
        return newProgress;
      });
      
      if (progress < 100) {
        timer = setTimeout(updateProgress, 100);
      }
    };
    
    timer = setTimeout(updateProgress, 100);
    
    return () => clearTimeout(timer);
  }, [isGenerating, job]);
  
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
        
        <div className="py-4">
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{currentStage === 'complete' ? 'Complete' : 'Optimizing...'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6">
                {currentStage === 'analyzing' ? (
                  <RefreshCw size={16} className="animate-spin text-primary" />
                ) : (
                  <CheckCircle2 size={16} className="text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">Analyzing job requirements</p>
                <p className="text-xs text-muted-foreground">Extracting key skills and qualifications</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6">
                {currentStage === 'analyzing' ? (
                  <div className="w-4 h-4" />
                ) : currentStage === 'optimizing' ? (
                  <RefreshCw size={16} className="animate-spin text-primary" />
                ) : (
                  <CheckCircle2 size={16} className="text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">Optimizing content for ATS</p>
                <p className="text-xs text-muted-foreground">Enhancing keyword matches and relevance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6">
                {currentStage === 'analyzing' || currentStage === 'optimizing' ? (
                  <div className="w-4 h-4" />
                ) : currentStage === 'formatting' ? (
                  <RefreshCw size={16} className="animate-spin text-primary" />
                ) : (
                  <CheckCircle2 size={16} className="text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">Formatting document</p>
                <p className="text-xs text-muted-foreground">Creating a clean, scannable layout</p>
              </div>
            </div>
          </div>
          
          {resumeData && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/20">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Resume Preview</h4>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {resumeData.atsScore}% ATS Score
                </Badge>
              </div>
              
              <div className="text-sm space-y-2">
                <p><strong>Optimized for:</strong> {job.title} at {job.company}</p>
                <div>
                  <p className="mb-1"><strong>Key Skills Highlighted:</strong></p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
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
