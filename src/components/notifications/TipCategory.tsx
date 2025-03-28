
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TipCategory as TipCategoryType, NotificationType } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Eye } from "lucide-react";
import TipPreview from "./TipPreview";

interface TipCategoryProps {
  category: TipCategoryType;
  onToggle: (id: NotificationType) => void;
}

const TipCategory: React.FC<TipCategoryProps> = ({ category, onToggle }) => {
  const isMobile = useIsMobile();
  const [showPreview, setShowPreview] = useState(false);
  
  return (
    <>
      <div 
        className={`flex items-center justify-between rounded-md border p-4 ${
          category.id === "onboarding" ? "border-primary/20 bg-primary/5" : ""
        }`}
      >
        <div className="flex-1">
          <h3 className={`font-medium ${isMobile ? "text-sm" : ""}`}>{category.name}</h3>
          <p className={`text-sm text-muted-foreground ${isMobile ? "text-xs" : ""}`}>{category.description}</p>
        </div>
        <div className="flex items-center gap-3">
          {category.sampleTip && (
            <Button 
              variant="outline" 
              size={isMobile ? "xs" : "sm"} 
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className={isMobile ? "sr-only" : ""}>Preview</span>
            </Button>
          )}
          <Switch
            checked={category.enabled}
            onCheckedChange={() => onToggle(category.id)}
            className={isMobile ? "scale-90" : ""}
          />
        </div>
      </div>
      
      {showPreview && category.sampleTip && (
        <TipPreview
          category={category.id}
          categoryName={category.name}
          tip={category.sampleTip}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default TipCategory;
