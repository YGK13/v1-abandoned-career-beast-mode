
import React from "react";
import { ArrowUpRight, BookOpen, Brain, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import DashboardCard from "@/components/DashboardCard";

const LifeDesignSection: React.FC = () => {
  const navigate = useNavigate();
  
  const goToLifeDesign = () => {
    navigate("/lifedesign");
  };

  // Sample tip of the day
  const tipOfTheDay = {
    quote: "Your identity is not fixed but constantly evolving through your choices.",
    category: "Identity",
    conversation: "Self",
    color: "bg-rose-100 text-rose-700 border-rose-200"
  };

  return (
    <DashboardCard 
      title="Life Design" 
      subtitle="Daily wisdom from Be Your Own Commander-in-Chief"
      footer={
        <Button variant="ghost" size="sm" className="w-full justify-between" onClick={goToLifeDesign}>
          <span>View Life Design</span>
          <ArrowUpRight size={14} />
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <BookOpen size={14} className="text-primary" />
              </div>
              <h4 className="font-medium text-sm">Today's Wisdom</h4>
            </div>
            <Badge variant="outline" className={tipOfTheDay.color}>
              {tipOfTheDay.conversation}
            </Badge>
          </div>
          <blockquote className="text-sm italic border-l-2 border-primary/30 pl-3 mb-2">
            "{tipOfTheDay.quote}"
          </blockquote>
          <p className="text-xs text-muted-foreground">From Be Your Own Commander-in-Chief</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div 
            className="p-3 rounded-md bg-rose-50 hover:bg-rose-100/80 transition-colors cursor-pointer flex items-center gap-2"
            onClick={goToLifeDesign}
          >
            <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
              <Heart size={14} className="text-rose-700" />
            </div>
            <span className="text-sm font-medium text-rose-700">Self</span>
          </div>
          <div 
            className="p-3 rounded-md bg-blue-50 hover:bg-blue-100/80 transition-colors cursor-pointer flex items-center gap-2"
            onClick={goToLifeDesign}
          >
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Brain size={14} className="text-blue-700" />
            </div>
            <span className="text-sm font-medium text-blue-700">Mind</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default LifeDesignSection;
