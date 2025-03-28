
import React from "react";
import { Switch } from "@/components/ui/switch";
import { TipCategory as TipCategoryType } from "./types";

interface TipCategoryProps {
  category: TipCategoryType;
  onToggle: (id: string) => void;
}

const TipCategory: React.FC<TipCategoryProps> = ({ category, onToggle }) => {
  return (
    <div 
      className={`flex items-center justify-between rounded-md border p-4 ${
        category.id === "onboarding" ? "border-primary/20 bg-primary/5" : ""
      }`}
    >
      <div className="flex-1">
        <h3 className="font-medium">{category.name}</h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </div>
      <Switch
        checked={category.enabled}
        onCheckedChange={() => onToggle(category.id)}
      />
    </div>
  );
};

export default TipCategory;
