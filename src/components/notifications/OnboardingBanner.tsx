
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { OnboardingSequence } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface OnboardingBannerProps {
  onboardingSequence: OnboardingSequence;
  onToggle: () => void;
  onReset: () => void;
}

const OnboardingBanner: React.FC<OnboardingBannerProps> = ({ 
  onboardingSequence, 
  onToggle, 
  onReset 
}) => {
  const isMobile = useIsMobile();
  
  if (!onboardingSequence.enabled || onboardingSequence.daysRemaining <= 0) {
    return null;
  }

  return (
    <div className="rounded-md border-2 border-primary/30 p-4 bg-primary/5">
      <div className="flex items-start gap-3">
        <Clock className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-primary mt-0.5`} />
        <div className="flex-1">
          <h3 className={`font-medium ${isMobile ? "text-sm" : ""}`}>15-Day Onboarding Sequence</h3>
          <p className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>
            You're currently receiving our special 15-day onboarding sequence with 
            daily guidance to help you get the most from your subscription.
          </p>
          <div className={`mt-2 flex items-center gap-2 ${isMobile ? "flex-wrap" : ""}`}>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {onboardingSequence.daysRemaining} days remaining
            </Badge>
            <Button 
              variant="ghost" 
              size={isMobile ? "xs" : "sm"}
              onClick={onToggle}
              className={isMobile ? "text-xs px-2 h-7" : ""}
            >
              {onboardingSequence.enabled ? "Pause" : "Resume"}
            </Button>
            <Button 
              variant="ghost" 
              size={isMobile ? "xs" : "sm"}
              onClick={onReset}
              className={isMobile ? "text-xs px-2 h-7" : ""}
            >
              Restart Sequence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBanner;
