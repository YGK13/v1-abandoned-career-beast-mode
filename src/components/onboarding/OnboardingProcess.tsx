
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useSubscription } from "@/context/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  cta: string;
  path: string;
  completed: boolean;
}

const OnboardingProcess: React.FC = () => {
  const { tier } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initial onboarding steps based on subscription tier
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>(() => {
    const baseSteps: OnboardingStep[] = [
      {
        id: "profile",
        title: "Complete Your Profile",
        description: "Add your professional information to personalize your experience.",
        cta: "Update Profile",
        path: "/profile",
        completed: false
      },
      {
        id: "upload-resume",
        title: "Upload Your Resume",
        description: "Upload your resume to unlock AI-powered career insights.",
        cta: "Upload Resume",
        path: "/career-docs",
        completed: false
      },
      {
        id: "skills-assessment",
        title: "Skills Assessment",
        description: "Track your current skills to highlight growth opportunities.",
        cta: "Assess Skills",
        path: "/skills",
        completed: false
      },
      {
        id: "set-goals",
        title: "Set Career Goals",
        description: "Define your short and long-term career objectives.",
        cta: "Set Goals",
        path: "/career-tracking",
        completed: false
      }
    ];
    
    // Add job-specific steps for job access tier
    if (tier === "jobs" || tier === "premium") {
      baseSteps.push({
        id: "job-preferences",
        title: "Set Job Preferences",
        description: "Tell us what you're looking for to get personalized job recommendations.",
        cta: "Set Preferences",
        path: "/jobs",
        completed: false
      });
    }
    
    // Add premium-specific steps
    if (tier === "premium") {
      baseSteps.push({
        id: "coaching-intro",
        title: "Schedule Coaching Session",
        description: "Book your first one-on-one coaching session.",
        cta: "Schedule Now",
        path: "/coaching",
        completed: false
      });
    }
    
    return baseSteps;
  });
  
  // Calculate progress percentage
  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const progress = Math.round((completedSteps / onboardingSteps.length) * 100);
  
  // Mark a step as completed
  const completeStep = (stepId: string) => {
    setOnboardingSteps(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
    
    // Store completion status in localStorage
    const completedSteps = JSON.parse(localStorage.getItem("onboarding_completed") || "[]");
    if (!completedSteps.includes(stepId)) {
      completedSteps.push(stepId);
      localStorage.setItem("onboarding_completed", JSON.stringify(completedSteps));
    }
    
    toast({
      title: "Step completed!",
      description: "Your onboarding progress has been updated.",
      variant: "default"
    });
  };
  
  // Navigate to step and mark previous as completed
  const goToStep = (step: OnboardingStep) => {
    // If this isn't the first step, mark the previous step as completed
    if (!step.completed) {
      const currentIndex = onboardingSteps.findIndex(s => s.id === step.id);
      if (currentIndex > 0) {
        const prevStep = onboardingSteps[currentIndex - 1];
        if (!prevStep.completed) {
          completeStep(prevStep.id);
        }
      }
    }
    
    navigate(step.path);
  };
  
  return (
    <Card className="mb-8">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center justify-between">
          <span>Welcome to Your Career Growth Journey</span>
          <span className="text-sm font-normal">{progress}% Complete</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="space-y-4">
          {onboardingSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`p-4 rounded-lg border ${
                step.completed 
                  ? "bg-primary/5 border-primary/20" 
                  : index === completedSteps 
                    ? "border-primary" 
                    : "border-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs ${
                      index === completedSteps ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  {(!step.completed && index <= completedSteps) && (
                    <Button 
                      size="sm" 
                      onClick={() => goToStep(step)}
                      className="mt-1"
                    >
                      {step.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {progress === 100 && (
          <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <h3 className="font-semibold text-green-800">Onboarding Complete!</h3>
            <p className="text-green-700 text-sm">
              You're all set up. Continue exploring the platform to make the most of your subscription.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingProcess;
