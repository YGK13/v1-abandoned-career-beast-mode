
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, LinkedinIcon, MessageCircle } from "lucide-react";
import { PersonRecommendation } from "@/data/networkingData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PersonRecommendationCardProps {
  person: PersonRecommendation;
}

const PersonRecommendationCard: React.FC<PersonRecommendationCardProps> = ({ person }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="h-20 bg-gradient-to-r from-primary/30 to-primary/10"></div>
        <div className="px-4 pt-0 pb-4 relative">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-full border-4 border-background overflow-hidden -mt-10 bg-muted">
              {person.imageUrl ? (
                <img 
                  src={person.imageUrl} 
                  alt={person.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-lg">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full mt-2 text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(person.linkedinUrl, '_blank');
                    }}
                  >
                    <LinkedinIcon size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View LinkedIn Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="mt-2">
            <h3 className="font-semibold">{person.name}</h3>
            <p className="text-sm text-muted-foreground">{person.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{person.company}</p>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {person.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-primary/5">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mt-3">
            <p className="text-xs">
              <strong>Connection reason:</strong> {person.connectionReason}
            </p>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 gap-1"
            >
              <UserPlus size={14} />
              <span>Connect</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-1"
            >
              <MessageCircle size={14} />
              <span>Message</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonRecommendationCard;
