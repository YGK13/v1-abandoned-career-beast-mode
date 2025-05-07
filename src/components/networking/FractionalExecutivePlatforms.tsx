import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { executivePlatforms } from "@/data/networking";

const FractionalExecutivePlatforms = () => {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Fractional Executive Platforms</CardTitle>
            <p className="text-sm text-muted-foreground pt-1">
              Platforms that connect experienced executives with companies needing part-time expertise
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {executivePlatforms.map((platform) => (
            <Card key={platform.id} className="border">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {platform.logoUrl ? (
                        <img 
                          src={platform.logoUrl} 
                          alt={platform.name} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Briefcase size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{platform.name}</h3>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < platform.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}
                          />
                        ))}
                        <span className="text-xs ml-1">({platform.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => window.open(platform.url, '_blank')}
                        >
                          <ExternalLink size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Visit website</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm">{platform.description}</p>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {platform.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4 flex">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(platform.url, '_blank')}
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FractionalExecutivePlatforms;
