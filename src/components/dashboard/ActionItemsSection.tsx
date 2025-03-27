
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, Lightbulb, Briefcase, Globe, ChevronRight } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";

interface ActionItem {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  icon?: React.ReactNode;
  cta?: string;
  link?: string;
}

interface ActionItemsSectionProps {
  actionItems: ActionItem[];
}

const ActionItemsSection: React.FC<ActionItemsSectionProps> = ({ actionItems }) => {
  return (
    <DashboardCard 
      title="Action Items" 
      footer={
        <Button variant="ghost" size="sm" className="w-full justify-between">
          <span>View All Actions</span>
          <ArrowUpRight size={14} />
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-3">
        {actionItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              item.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
              item.priority === 'medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' : 
              'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
            }`}>
              {item.icon}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <Badge variant="outline" className={`ml-2 text-xs ${
                  item.priority === 'high' ? 'border-red-200 text-red-700 bg-red-50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800/30' : 
                  item.priority === 'medium' ? 'border-orange-200 text-orange-700 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800/30' : 
                  'border-green-200 text-green-700 bg-green-50 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800/30'
                }`}>
                  {item.priority === 'high' ? 'Urgent' : item.priority === 'medium' ? 'Important' : 'Recommended'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              {item.cta && (
                <div className="mt-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs flex items-center gap-1" asChild>
                    <a href={item.link}>
                      {item.cta}
                      <ChevronRight size={12} />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default ActionItemsSection;
