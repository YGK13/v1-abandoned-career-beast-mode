
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
}

export interface DailyPlatformTipProps {
  platform: Platform;
  date: string;
}

const DailyPlatformTip: React.FC<DailyPlatformTipProps> = ({ platform, date }) => {
  const formattedDate = format(new Date(date), "MMMM d, yyyy");
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Platform Tip of the Day</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img 
                src={platform.logo} 
                alt={platform.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{platform.name}</h4>
              <p className="text-xs text-muted-foreground">{platform.description}</p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm italic">
              "When starting on a new platform, focus on consistency rather than perfection. 
              Post regularly, even if the content isn't perfect—you'll improve with each iteration."
            </p>
          </div>
          
          <a 
            href={platform.url}
            className="text-sm text-primary hover:underline block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about {platform.name} →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPlatformTip;
