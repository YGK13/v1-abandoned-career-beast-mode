
import React from "react";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FilterSection from "./FilterSection";

interface DatePostedFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePostedFilter: React.FC<DatePostedFilterProps> = ({ value, onChange }) => {
  return (
    <FilterSection title="Date Posted" icon={Calendar}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Any time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Past 24 hours</SelectItem>
          <SelectItem value="3">Past 3 days</SelectItem>
          <SelectItem value="7">Past week</SelectItem>
          <SelectItem value="30">Past month</SelectItem>
        </SelectContent>
      </Select>
    </FilterSection>
  );
};

export default DatePostedFilter;
