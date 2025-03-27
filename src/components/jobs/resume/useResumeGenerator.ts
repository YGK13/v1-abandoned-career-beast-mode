
import { useState, useEffect } from "react";
import { Job } from "../data/types";

export type StageType = 'analyzing' | 'optimizing' | 'formatting' | 'complete';

interface ResumeData {
  jobTitle: string;
  company: string;
  tailoredSkills: string[];
  resumeId: string;
  atsScore: number;
  keywords: string[];
}

export const useResumeGenerator = (isGenerating: boolean, job: Job) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<StageType>('analyzing');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

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
          if (currentStageIndex < stages.length - 1) {
            startProgress = stage.targetProgress;
            currentStageIndex++;
            setCurrentStage(stages[currentStageIndex].name as StageType);
          }
          
          if (currentStageIndex === stages.length - 1) {
            setResumeData({
              jobTitle: job.title,
              company: job.company,
              tailoredSkills: job.skills,
              resumeId: `resume-${Date.now()}`,
              atsScore: Math.floor(Math.random() * 11) + 90,
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
  }, [isGenerating, job, progress]);

  const resetGenerator = () => {
    setProgress(0);
    setCurrentStage('analyzing');
    setResumeData(null);
  };

  return {
    progress,
    currentStage,
    resumeData,
    resetGenerator
  };
};
