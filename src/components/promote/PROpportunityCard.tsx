
import React from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROpportunity } from "@/data/prOpportunitiesData";

interface PROpportunityCardProps {
  opportunity: PROpportunity;
}

const PROpportunityCard: React.FC<PROpportunityCardProps> = ({ opportunity }) => {
  const { title, description, source, sourceType, deadline, link, tags } = opportunity;
  
  return (
    <div className="p-5 rounded-lg border bg-card hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={`
              ${sourceType === 'LinkedIn' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                sourceType === 'Twitter' ? 'bg-sky-50 text-sky-700 border-sky-200' : 
                'bg-gray-50 text-gray-700 border-gray-200'
              }`
            }>
              {sourceType}
            </Badge>
            <span className="text-sm text-muted-foreground">{source}</span>
          </div>
        </div>
        
        {deadline && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{deadline}</span>
          </div>
        )}
      </div>
      
      <p className="mt-3 text-muted-foreground">
        {description}
      </p>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="mt-4">
        <Button asChild variant="outline" size="sm">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Apply / Learn more <ExternalLink className="h-3 w-3 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PROpportunityCard;
