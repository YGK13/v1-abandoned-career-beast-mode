
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

// Daily tip type
type DailyTip = {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
};

interface DailyCareerTipProps {
  tips: DailyTip[];
}

const DailyCareerTip: React.FC<DailyCareerTipProps> = ({ tips }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
  };

  const currentTip = tips[currentTipIndex];
  const CurrentTipIcon = currentTip.icon;

  return (
    <Card className="mb-8 overflow-hidden border-primary/20">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Lightbulb size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold">Daily Career Tip</h3>
                <Badge variant="secondary" className="mt-1">
                  {currentTip.category}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevTip}
                  className="h-8 w-8 p-0"
                >
                  &larr;
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentTipIndex + 1}/{tips.length}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={nextTip}
                  className="h-8 w-8 p-0"
                >
                  &rarr;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <CurrentTipIcon size={20} className="text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-2">{currentTip.title}</h4>
            <p className="text-muted-foreground">{currentTip.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyCareerTip;
