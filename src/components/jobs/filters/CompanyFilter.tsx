
import React from "react";
import { Building, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CompanyFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompanyFilter: React.FC<CompanyFilterProps> = ({ open, onOpenChange }) => {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium py-1">
        <span className="flex items-center gap-2">
          <Building size={16} />
          Company
        </span>
        <ChevronDown size={16} className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-2">
        <Input placeholder="Add company" />
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="company-verified" />
            <Label htmlFor="company-verified">Verified employers only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="company-followed" />
            <Label htmlFor="company-followed">Companies you follow</Label>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CompanyFilter;
