
import React from "react";
import { Separator } from "@/components/ui/separator";
import { formatDate, timeAgo } from "@/utils/dateUtils";

interface CareerMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "promotion" | "job" | "education" | "achievement" | "skill";
}

interface CareerTimelineProps {
  milestones: CareerMilestone[];
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ milestones }) => {
  // Sort milestones by date (most recent first)
  const sortedMilestones = [...milestones].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "promotion":
        return (
          <div className="w-3 h-3 rounded-full bg-blue-500 absolute left-[0.9375rem] transform -translate-x-1/2"></div>
        );
      case "job":
        return (
          <div className="w-3 h-3 rounded-full bg-green-500 absolute left-[0.9375rem] transform -translate-x-1/2"></div>
        );
      case "education":
        return (
          <div className="w-3 h-3 rounded-full bg-amber-500 absolute left-[0.9375rem] transform -translate-x-1/2"></div>
        );
      case "achievement":
        return (
          <div className="w-3 h-3 rounded-full bg-purple-500 absolute left-[0.9375rem] transform -translate-x-1/2"></div>
        );
      case "skill":
        return (
          <div className="w-3 h-3 rounded-full bg-teal-500 absolute left-[0.9375rem] transform -translate-x-1/2"></div>
        );
      default:
        return (
          <div className="w-3 h-3 rounded-full bg-gray-500 absolute left-[0.9375rem] transform -translate-x-1/2"></div>
        );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Your Career Journey</h3>
        <span className="text-sm text-muted-foreground">
          {sortedMilestones.length} milestones
        </span>
      </div>

      <div className="relative pl-8 space-y-6">
        <div className="absolute top-0 bottom-0 left-[0.9375rem] transform -translate-x-1/2 w-0.5 bg-border"></div>
        
        {sortedMilestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            {getIcon(milestone.type)}
            
            <div className="bg-muted/40 p-3 rounded-md">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{milestone.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {timeAgo(milestone.date)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
              <time className="text-xs text-muted-foreground">{formatDate(milestone.date)}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTimeline;
