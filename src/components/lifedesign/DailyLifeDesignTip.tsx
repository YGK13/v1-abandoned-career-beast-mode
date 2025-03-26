import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenTool, ArrowLeft, ArrowRight, Calendar, Heart, Users, Coffee, BookOpen } from "lucide-react";

interface Tip {
  id: number;
  conversation: number;
  quote: string;
  tip: string;
  category: string;
  source: string;
}

interface DailyLifeDesignTipProps {
  tips: Tip[];
  day: string;
}

const DailyLifeDesignTip: React.FC<DailyLifeDesignTipProps> = ({ tips, day }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
  };

  const currentTip = tips[currentTipIndex];

  const getConversationStyle = (conversationId: number) => {
    switch (conversationId) {
      case 1: // Self
        return {
          bgColor: "bg-rose-100",
          textColor: "text-rose-700",
          borderColor: "border-rose-200",
          icon: <Heart size={20} className="text-rose-700" />,
          name: "Self"
        };
      case 2: // Others
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
          icon: <Users size={20} className="text-blue-700" />,
          name: "Others"
        };
      case 3: // Environment
        return {
          bgColor: "bg-amber-100",
          textColor: "text-amber-700",
          borderColor: "border-amber-200",
          icon: <Coffee size={20} className="text-amber-700" />,
          name: "Environment"
        };
      case 4: // Work
        return {
          bgColor: "bg-emerald-100",
          textColor: "text-emerald-700",
          borderColor: "border-emerald-200",
          icon: <PenTool size={20} className="text-emerald-700" />,
          name: "Work"
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
          icon: <PenTool size={20} className="text-gray-700" />,
          name: "Unknown"
        };
    }
  };

  const style = getConversationStyle(currentTip.conversation);

  return (
    <Card className="mb-8 overflow-hidden border-primary/20">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <BookOpen size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold">Daily Life Design Tip</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{day}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevTip}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft size={16} />
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
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${style.bgColor} flex items-center justify-center`}>
            {style.icon}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="text-lg font-medium">{currentTip.category}</h4>
              <Badge variant="outline" className={`${style.bgColor} ${style.textColor} border-2 ${style.borderColor}`}>
                Conversation with {style.name}
              </Badge>
            </div>
            <blockquote className="border-l-2 border-primary/30 pl-4 italic mb-4">
              "{currentTip.quote}"
            </blockquote>
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <PenTool size={16} className="text-primary" />
                <h5 className="font-medium">Today's Action</h5>
              </div>
              <p>{currentTip.tip}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{currentTip.source}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyLifeDesignTip;
