
import React from "react";
import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import FilterSection from "./FilterSection";

interface MatchThresholdFilterProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const MatchThresholdFilter: React.FC<MatchThresholdFilterProps> = ({ value, onChange }) => {
  return (
    <FilterSection title="Match Threshold" icon={Filter}>
      <div className="pt-2 pb-1">
        <Slider
          value={value}
          onValueChange={onChange}
          max={100}
          step={5}
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{value}% match or higher</span>
      </div>
    </FilterSection>
  );
};

export default MatchThresholdFilter;
