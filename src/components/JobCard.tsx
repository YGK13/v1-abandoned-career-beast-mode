
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Calendar, ArrowRight } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  matchScore: number;
  skills: string[];
  isRecommended?: boolean;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  postedDate,
  matchScore,
  skills,
  isRecommended = false,
  onClick
}) => {
  return (
    <DashboardCard
      className="h-full"
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-base">{title}</h4>
          <Badge 
            variant={matchScore > 80 ? "default" : "secondary"}
            className="ml-2"
          >
            {matchScore}% Match
          </Badge>
        </div>
        
        <p className="text-sm font-medium mb-4">{company}</p>
        
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          
          {salary && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign size={14} />
              <span>{salary}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar size={14} />
            <span>{postedDate}</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Briefcase size={14} />
            <span>Full-time</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="mt-auto">
          <Button variant="default" className="w-full flex items-center justify-center gap-1">
            <span>View Details</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default JobCard;
