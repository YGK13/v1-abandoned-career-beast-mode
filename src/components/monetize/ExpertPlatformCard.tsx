
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExpertPlatform } from "@/data/expertPlatformsData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExpertPlatformCardProps {
  platform: ExpertPlatform;
  featured?: boolean;
}

const ExpertPlatformCard: React.FC<ExpertPlatformCardProps> = ({ platform, featured = false }) => {
  const { id, name, description, icon: Icon, payRange, industries, lastVerified } = platform;
  
  // Calculate how recently the platform was verified
  const getVerificationStatus = () => {
    if (!lastVerified) return "Status unknown";
    
    const verifiedDate = new Date(lastVerified);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - verifiedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return "Verified this week";
    if (diffDays <= 30) return "Verified this month";
    return `Verified on ${new Date(lastVerified).toLocaleDateString()}`;
  };
  
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
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>{getVerificationStatus()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">All platforms are regularly verified for active listings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="mt-4 flex justify-between items-center">
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
