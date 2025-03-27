
import React, { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Briefcase, Calendar, Building, Filter, Clock, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [datePosted, setDatePosted] = useState("7");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [showCompanyFilters, setShowCompanyFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <DashboardCard title="Job Filters">
      <div className="space-y-6">
        {/* Date Posted Filter - LinkedIn Style */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Calendar size={16} />
            Date Posted
          </h4>
          <Select value={datePosted} onValueChange={setDatePosted}>
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
        </div>

        {/* Experience Level - LinkedIn Style */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Briefcase size={16} />
            Experience Level
          </h4>
          <Select value={experienceLevel} onValueChange={setExperienceLevel}>
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
        </div>

        {/* Remote Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <MapPin size={16} />
            Remote Options
          </h4>
          <div className="flex items-center space-x-2">
            <Switch
              id="remote-only"
              checked={onlyRemote}
              onCheckedChange={onRemoteToggle}
            />
            <Label htmlFor="remote-only">Remote jobs only</Label>
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <MapPin size={16} />
            Location
          </h4>
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
        </div>

        {/* Company Filter - Collapsible */}
        <Collapsible open={showCompanyFilters} onOpenChange={setShowCompanyFilters}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium py-1">
            <span className="flex items-center gap-2">
              <Building size={16} />
              Company
            </span>
            <ChevronDown size={16} className={`transform transition-transform ${showCompanyFilters ? 'rotate-180' : ''}`} />
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
        
        {/* Match Threshold with LinkedIn-style slider */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Filter size={16} />
            Match Threshold
          </h4>
          <div className="pt-2 pb-1">
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

        {/* Additional Filters - Collapsible */}
        <Collapsible open={showMoreFilters} onOpenChange={setShowMoreFilters}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium py-1">
            <span className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </span>
            <ChevronDown size={16} className={`transform transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
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
        
        <Button variant="outline" className="w-full" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </DashboardCard>
  );
};

export default JobFilters;
