
import React from "react";
import { Progress } from "@/components/ui/progress";

interface CareerAvatarProps {
  score: number;
  level: string;
  nextMilestone: string;
}

const CareerAvatar: React.FC<CareerAvatarProps> = ({ 
  score, 
  level,
  nextMilestone
}) => {
  // Calculate colors based on score
  const getColor = () => {
    if (score < 30) return "from-orange-400 to-red-500";
    if (score < 60) return "from-yellow-400 to-orange-500";
    if (score < 80) return "from-blue-400 to-indigo-500";
    return "from-green-400 to-emerald-500";
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6">
      <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${getColor()} p-1 shadow-lg animate-float`}>
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center text-center p-2 border border-primary/20">
            <span className="text-4xl font-bold">{score}</span>
            <span className="text-xs text-muted-foreground">Career Score</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <h4 className="font-semibold">{level}</h4>
        <div className="mt-2 space-y-2 w-full max-w-xs">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Current</span>
            <span className="text-muted-foreground">Next: {nextMilestone}</span>
          </div>
          <Progress value={score} className="h-2" />
          <p className="text-xs text-muted-foreground pt-1">
            {100 - score} points until next level
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerAvatar;
