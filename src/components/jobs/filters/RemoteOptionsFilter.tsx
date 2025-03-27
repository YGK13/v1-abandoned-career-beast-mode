
import React from "react";
import { MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import FilterSection from "./FilterSection";

interface RemoteOptionsFilterProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const RemoteOptionsFilter: React.FC<RemoteOptionsFilterProps> = ({ checked, onChange }) => {
  return (
    <FilterSection title="Remote Options" icon={MapPin}>
      <div className="flex items-center space-x-2">
        <Switch
          id="remote-only"
          checked={checked}
          onCheckedChange={onChange}
        />
        <Label htmlFor="remote-only">Remote jobs only</Label>
      </div>
    </FilterSection>
  );
};

export default RemoteOptionsFilter;
