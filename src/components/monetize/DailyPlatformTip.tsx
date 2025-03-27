
import React from "react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign } from "lucide-react";
import { ExpertPlatform } from "@/data/expertPlatformsData";

interface DailyPlatformTipProps {
  platform: ExpertPlatform;
  date: string;
}

const DailyPlatformTip: React.FC<DailyPlatformTipProps> = ({ platform, date }) => {
  return (
    <Alert className="mb-8 bg-card border">
      <div className="flex items-start">
        <DollarSign className="h-5 w-5 text-primary mt-0.5" />
        <div className="ml-2">
          <AlertTitle className="text-lg font-semibold">
            Daily Expert Platform: {platform.name}
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p>{platform.description}</p>
            <p className="text-sm text-muted-foreground mt-2">Average rate: {platform.payRange}</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/monetize-expertise/${platform.id}`}>
                  Platform details <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={platform.link} target="_blank" rel="noopener noreferrer">
                  Visit website
                </a>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">Updated: {date}</p>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default DailyPlatformTip;
