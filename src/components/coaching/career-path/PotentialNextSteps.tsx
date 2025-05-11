
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface PotentialNextStepsProps {
  potentialNextStep: {
    title: string;
    timeline: string;
  };
  suggestedSkills: string[];
}

const PotentialNextSteps: React.FC<PotentialNextStepsProps> = ({
  potentialNextStep,
  suggestedSkills
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Potential Next Steps</h3>
      <div className="p-4 rounded-md bg-muted/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp size={16} className="text-primary" />
          </div>
          <h4 className="font-medium">{potentialNextStep.title}</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Estimated timeline: {potentialNextStep.timeline}</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill, index) => (
            <Badge key={index} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PotentialNextSteps;
