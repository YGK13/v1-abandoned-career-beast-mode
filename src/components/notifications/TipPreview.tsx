
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Lightbulb, BookOpen, Users, Target, Zap, Calendar } from "lucide-react";
import { SampleTip, NotificationType } from "./types";

interface TipPreviewProps {
  category: NotificationType;
  categoryName: string;
  tip: SampleTip;
  onClose: () => void;
}

const getCategoryIcon = (category: NotificationType) => {
  switch (category) {
    case "career":
      return <Target className="h-4 w-4 text-primary" />;
    case "skills":
      return <BookOpen className="h-4 w-4 text-primary" />;
    case "networking":
      return <Users className="h-4 w-4 text-primary" />;
    case "mindset":
      return <Zap className="h-4 w-4 text-primary" />;
    case "productivity":
      return <Calendar className="h-4 w-4 text-primary" />;
    case "onboarding":
      return <Lightbulb className="h-4 w-4 text-primary" />;
    default:
      return <Lightbulb className="h-4 w-4 text-primary" />;
  }
};

const TipPreview: React.FC<TipPreviewProps> = ({ 
  category, 
  categoryName, 
  tip, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">Sample Tip Preview</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{tip.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {categoryName}
                  </Badge>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  {getCategoryIcon(category)}
                  <p className="text-sm text-muted-foreground">{tip.content}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipPreview;
