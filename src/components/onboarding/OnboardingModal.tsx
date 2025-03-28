
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/context/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";

interface OnboardingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onOpenChange 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { tier } = useSubscription();
  const { toast } = useToast();
  const maxSteps = 3;
  
  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);
  
  const handleNext = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // On last step, close modal and show toast
      onOpenChange(false);
      localStorage.setItem('onboardingModalSeen', 'true');
      toast({
        title: "Welcome aboard!",
        description: "Your 15-day onboarding journey begins now. Check your inbox for daily tips!",
        variant: "default"
      });
    }
  };
  
  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 py-4">
            <h3 className="font-semibold text-lg">Welcome to Your Career Growth Platform</h3>
            <p>
              Congratulations on taking this important step in your professional journey!
              Over the next 15 days, we'll guide you through all the powerful features
              your subscription includes.
            </p>
            <div className="bg-primary/5 p-4 rounded-md">
              <p className="text-sm font-medium">Your {tier.charAt(0).toUpperCase() + tier.slice(1)} plan includes:</p>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                <li>Daily career growth tips via email/SMS</li>
                <li>Personalized onboarding journey</li>
                <li>Career tracking tools</li>
                {(tier === "jobs" || tier === "premium") && (
                  <li>Premium job search tools and alerts</li>
                )}
                {tier === "premium" && (
                  <li>One-on-one career coaching sessions</li>
                )}
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 py-4">
            <h3 className="font-semibold text-lg">Daily Communications</h3>
            <p>
              We've created a 15-day onboarding sequence to help you get the most
              out of your subscription. Each day, you'll receive:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                  1
                </div>
                <div>
                  <span className="font-medium">Daily growth tip</span>
                  <p className="text-sm text-muted-foreground">
                    A 15-minute actionable task to boost your career
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                  2
                </div>
                <div>
                  <span className="font-medium">Feature highlight</span>
                  <p className="text-sm text-muted-foreground">
                    Guidance on a specific platform feature to explore
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                  3
                </div>
                <div>
                  <span className="font-medium">Success metrics</span>
                  <p className="text-sm text-muted-foreground">
                    Insights on tracking your progress and celebrating wins
                  </p>
                </div>
              </li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 py-4">
            <h3 className="font-semibold text-lg">Communication Preferences</h3>
            <p>
              How would you like to receive your daily onboarding tips? You can change these settings anytime in your notification preferences.
            </p>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Email Updates</h4>
                  <p className="text-sm text-muted-foreground">Receive daily emails with actionable tips</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toast({
                      title: "Email notifications enabled",
                      description: "You'll receive daily onboarding emails for the next 15 days",
                    });
                  }}
                >
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between border p-3 rounded-md">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get text message reminders (carrier rates may apply)</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "SMS notifications enabled",
                      description: "You'll receive daily text messages for the next 15 days",
                    });
                  }}
                >
                  Enable
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Welcome to Your 15-Day Onboarding Journey</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map(step => (
              <div 
                key={step}
                className={`h-2 flex-1 ${
                  step < currentStep 
                    ? "bg-primary" 
                    : step === currentStep 
                      ? "bg-primary/50" 
                      : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          {getStepContent()}
        </div>
        
        <DialogFooter>
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentStep < maxSteps ? "Continue" : "Get Started"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
