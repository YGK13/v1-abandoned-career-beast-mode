
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowUpRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  type: "skill" | "network" | "review" | "document";
  link: string;
  dueDate?: string;
}

interface NextStepsProps {
  actionItems: ActionItem[];
}

const NextSteps: React.FC<NextStepsProps> = ({ actionItems }) => {
  const [completed, setCompleted] = React.useState<string[]>([]);

  const toggleComplete = (id: string) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(itemId => itemId !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const priorityColors = {
    high: "text-red-500 bg-red-50 dark:bg-red-950/30",
    medium: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
    low: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
  };

  const priorityText = {
    high: "High priority",
    medium: "Medium priority",
    low: "Recommended"
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Priority actions for your career growth</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <span>View All</span>
            <ArrowUpRight size={12} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {actionItems
            .filter((_, index) => index < 4) // Only show first 4 items
            .map(item => (
              <div 
                key={item.id} 
                className={`p-3 rounded-md flex items-start gap-3 transition-colors ${
                  completed.includes(item.id) 
                    ? "bg-muted/20 opacity-60" 
                    : "bg-muted/50"
                }`}
              >
                <div 
                  onClick={() => toggleComplete(item.id)}
                  className={`w-5 h-5 rounded-full flex-shrink-0 cursor-pointer flex items-center justify-center ${
                    completed.includes(item.id) ? "bg-primary/20" : priorityColors[item.priority]
                  }`}
                >
                  {completed.includes(item.id) && <CheckCircle2 size={16} className="text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className={`font-medium text-sm ${completed.includes(item.id) ? "line-through" : ""}`}>
                      {item.title}
                    </h4>
                    <Badge variant="outline" className={`text-xs ${priorityColors[item.priority]}`}>
                      {priorityText[item.priority]}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  
                  {!completed.includes(item.id) && (
                    <Button 
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 mt-2 text-xs flex items-center gap-1"
                      asChild
                    >
                      <a href={item.link}>
                        Take action
                        <ChevronRight size={12} />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NextSteps;
