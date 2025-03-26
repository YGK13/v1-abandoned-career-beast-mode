
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

interface ActionItem {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
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
      <div className="space-y-3">
        {actionItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <div className={`w-2 h-2 mt-1.5 rounded-full ${
              item.priority === 'high' ? 'bg-destructive' : 
              item.priority === 'medium' ? 'bg-orange-400' : 'bg-green-400'
            }`} />
            <div>
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default ActionItemsSection;
