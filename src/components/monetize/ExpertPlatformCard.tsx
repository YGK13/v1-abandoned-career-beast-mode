
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExpertPlatform } from "@/data/expertPlatformsData";

interface ExpertPlatformCardProps {
  platform: ExpertPlatform;
  featured?: boolean;
}

const ExpertPlatformCard: React.FC<ExpertPlatformCardProps> = ({ platform, featured = false }) => {
  const { id, name, description, icon: Icon, payRange, industries } = platform;
  
  return (
    <div className={`p-6 rounded-lg border ${featured ? 'bg-primary/5 border-primary/20' : 'bg-card'} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${featured ? 'bg-primary/10' : 'bg-muted'}`}>
            <Icon className={`h-6 w-6 ${featured ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <h3 className="font-semibold text-lg">{name}</h3>
        </div>
        <Badge variant={featured ? "default" : "secondary"} className="ml-2">
          {payRange}
        </Badge>
      </div>
      
      <p className="mt-4 text-muted-foreground text-sm">
        {description}
      </p>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {industries.slice(0, 3).map((industry, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {industry}
          </Badge>
        ))}
        {industries.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{industries.length - 3} more
          </Badge>
        )}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <Button asChild variant="ghost" size="sm">
          <Link to={`/monetize-expertise/${id}`} className="flex items-center gap-1">
            Learn more <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="sm">
          <a href={platform.link} target="_blank" rel="noopener noreferrer">
            Visit website
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ExpertPlatformCard;
