
import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, RefreshCw } from "lucide-react";

type StageType = 'analyzing' | 'optimizing' | 'formatting' | 'complete';

interface ResumeGenerationProgressProps {
  progress: number;
  currentStage: StageType;
}

const ResumeGenerationProgress: React.FC<ResumeGenerationProgressProps> = ({ 
  progress, 
  currentStage 
}) => {
  return (
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
    </div>
  );
};

export default ResumeGenerationProgress;
