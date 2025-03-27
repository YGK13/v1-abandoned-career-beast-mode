
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FilterSection from "./FilterSection";

const LocationFilter: React.FC = () => {
  return (
    <FilterSection title="Location" icon={MapPin}>
      <div className="flex flex-col gap-2">
        <Input placeholder="Add location" />
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            <MapPin size={12} className="mr-1" />
            San Francisco
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            <MapPin size={12} className="mr-1" />
            New York
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            <MapPin size={12} className="mr-1" />
            Remote
          </Badge>
        </div>
      </div>
    </FilterSection>
  );
};

export default LocationFilter;
