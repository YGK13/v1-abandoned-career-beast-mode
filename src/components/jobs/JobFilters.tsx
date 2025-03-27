
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, Briefcase } from "lucide-react";

interface JobFiltersProps {
  matchThreshold: number[];
  onlyRemote: boolean;
  onMatchThresholdChange: (value: number[]) => void;
  onRemoteToggle: (value: boolean) => void;
  onReset: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  matchThreshold,
  onlyRemote,
  onMatchThresholdChange,
  onRemoteToggle,
  onReset
}) => {
  return (
    <DashboardCard title="Job Filters">
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Match Threshold</h4>
          <div className="pt-4 pb-2">
            <Slider
              value={matchThreshold}
              onValueChange={onMatchThresholdChange}
              max={100}
              step={5}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{matchThreshold}% match or higher</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="remote-only"
            checked={onlyRemote}
            onCheckedChange={onRemoteToggle}
          />
          <Label htmlFor="remote-only">Remote jobs only</Label>
        </div>
        
        <LocationFilters />
        <JobTypeFilters />
        
        <Button variant="outline" className="w-full" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </DashboardCard>
  );
};

const LocationFilters: React.FC = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Popular Locations</h4>
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
  );
};

const JobTypeFilters: React.FC = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Job Types</h4>
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
          <Briefcase size={12} className="mr-1" />
          Full-time
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
          <Briefcase size={12} className="mr-1" />
          Contract
        </Badge>
      </div>
    </div>
  );
};

export default JobFilters;
