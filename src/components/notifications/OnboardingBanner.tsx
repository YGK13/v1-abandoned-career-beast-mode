
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { OnboardingSequence } from "./types";

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
  if (!onboardingSequence.enabled || onboardingSequence.daysRemaining <= 0) {
    return null;
  }

  return (
    <div className="rounded-md border-2 border-primary/30 p-4 bg-primary/5">
      <div className="flex items-start gap-3">
        <Clock className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium">15-Day Onboarding Sequence</h3>
          <p className="text-sm text-muted-foreground">
            You're currently receiving our special 15-day onboarding sequence with 
            daily guidance to help you get the most from your subscription.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {onboardingSequence.daysRemaining} days remaining
            </Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onToggle}
            >
              {onboardingSequence.enabled ? "Pause" : "Resume"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onReset}
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
