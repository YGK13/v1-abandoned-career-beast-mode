
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ChevronRight } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface SkillCardProps {
  name: string;
  level: number;
  category: string;
  trend?: "up" | "down" | "stable";
  isInDemand?: boolean;
  onClick?: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  name,
  level,
  category,
  trend = "stable",
  isInDemand = false,
  onClick
}) => {
  const getLevelLabel = (level: number) => {
    if (level < 20) return "Beginner";
    if (level < 40) return "Basic";
    if (level < 60) return "Intermediate";
    if (level < 80) return "Advanced";
    return "Expert";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↗️";
    if (trend === "down") return "↘️";
    return "→";
  };

  return (
    <DashboardCard 
      className="h-full cursor-pointer hover:border-primary/50 transition-colors"
      isHoverable={true}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-medium text-base">{name}</h4>
          {isInDemand && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles size={12} className="text-yellow-500" />
              <span className="text-xs">In Demand</span>
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <Progress 
            value={level} 
            variant="circular" 
            size="sm" 
            className="mx-auto" 
          />
          <span className="text-xs text-muted-foreground ml-3">{getLevelLabel(level)}</span>
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {getTrendIcon(trend)} {trend === "stable" ? "Stable" : trend === "up" ? "Growing" : "Declining"}
            </span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SkillCard;
