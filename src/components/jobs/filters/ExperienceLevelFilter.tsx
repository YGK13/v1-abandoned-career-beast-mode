
import React from "react";
import { Briefcase } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FilterSection from "./FilterSection";

interface ExperienceLevelFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ExperienceLevelFilter: React.FC<ExperienceLevelFilterProps> = ({ value, onChange }) => {
  return (
    <FilterSection title="Experience Level" icon={Briefcase}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="internship">Internship</SelectItem>
          <SelectItem value="entry">Entry level</SelectItem>
          <SelectItem value="associate">Associate</SelectItem>
          <SelectItem value="mid-senior">Mid-Senior level</SelectItem>
          <SelectItem value="director">Director</SelectItem>
          <SelectItem value="executive">Executive</SelectItem>
        </SelectContent>
      </Select>
    </FilterSection>
  );
};

export default ExperienceLevelFilter;
