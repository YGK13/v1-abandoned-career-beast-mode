
import React from "react";
import { Filter, ChevronDown, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MoreFiltersSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MoreFiltersSection: React.FC<MoreFiltersSectionProps> = ({ open, onOpenChange }) => {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium py-1">
        <span className="flex items-center gap-2">
          <Filter size={16} />
          More Filters
        </span>
        <ChevronDown size={16} className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-4">
        <div className="space-y-2">
          <h5 className="text-xs font-medium">Job Type</h5>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Briefcase size={12} className="mr-1" />
              Full-time
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Briefcase size={12} className="mr-1" />
              Contract
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Briefcase size={12} className="mr-1" />
              Part-time
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Briefcase size={12} className="mr-1" />
              Internship
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-xs font-medium">Easy Apply</h5>
          <div className="flex items-center space-x-2">
            <Checkbox id="easy-apply" />
            <Label htmlFor="easy-apply">Easy Apply jobs only</Label>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-xs font-medium">Sources</h5>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="source-linkedin" defaultChecked />
              <Label htmlFor="source-linkedin">LinkedIn</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="source-twitter" defaultChecked />
              <Label htmlFor="source-twitter">Twitter/X</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="source-niche" defaultChecked />
              <Label htmlFor="source-niche">Niche Industry Boards</Label>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MoreFiltersSection;
