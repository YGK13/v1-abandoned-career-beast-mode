
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

interface CurrentPositionProps {
  currentPosition: string;
  company: string;
  duration: string;
  skills: string[];
}

const CurrentPosition: React.FC<CurrentPositionProps> = ({ 
  currentPosition, 
  company, 
  duration, 
  skills 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Current Position</h3>
      <div className="p-4 rounded-md bg-muted/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Briefcase size={16} className="text-primary" />
          </div>
          <h4 className="font-medium">{currentPosition}</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{company}, {duration}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentPosition;
