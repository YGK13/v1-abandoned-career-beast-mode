
import React from "react";
import { Calendar, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { PROpportunity } from "@/data/personalBrandData";
import { formatDistanceToNow } from "date-fns";

interface PROpportunityCardProps {
  opportunity: PROpportunity;
}

const PROpportunityCard: React.FC<PROpportunityCardProps> = ({ opportunity }) => {
  const { title, description, source, deadline, link, category, datePosted } = opportunity;
  
  // Calculate how recent the posting is
  const postedDate = new Date(datePosted);
  const postedTimeAgo = formatDistanceToNow(postedDate, { addSuffix: true });
  
  // Format the deadline
  const deadlineDate = deadline ? new Date(deadline) : null;
  const deadlineFormatted = deadlineDate 
    ? formatDistanceToNow(deadlineDate, { addSuffix: true }) 
    : "Open deadline";
    
  // Determine badge color based on source
  const getBadgeColor = () => {
    switch(source) {
      case "Qwoted": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Featured": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Help a B2B Writer": return "bg-green-50 text-green-700 border-green-200";
      case "JournoRequests": return "bg-amber-50 text-amber-700 border-amber-200";
      case "ResponseSource": return "bg-red-50 text-red-700 border-red-200";
      case "MuckRack": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "ProfNet": return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "SourceBottle": return "bg-pink-50 text-pink-700 border-pink-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <Badge variant="outline" className={`${getBadgeColor()}`}>
            {source}
          </Badge>
          
          <Badge variant="secondary" className="font-normal">
            {category}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>Posted {postedTimeAgo}</span>
          </div>
          
          {deadlineDate && (
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Deadline {deadlineFormatted}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2"
          >
            Apply / Learn more <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PROpportunityCard;
