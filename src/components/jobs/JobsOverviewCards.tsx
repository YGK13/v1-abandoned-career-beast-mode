import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Check, Building, MapPin, Briefcase } from "lucide-react";

const JobsOverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <DashboardCard className="md:col-span-2">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0 w-full sm:w-36 space-y-4">
            <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
              <h4 className="text-2xl font-bold text-primary mb-1">92%</h4>
              <p className="text-xs text-muted-foreground text-center">Match with top job</p>
            </div>
            
            <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
              <h4 className="text-2xl font-bold mb-1">11</h4>
              <p className="text-xs text-muted-foreground text-center">Job matches found</p>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-semibold">Job Application Status</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={16} className="text-muted-foreground" />
                  <h4 className="font-medium text-sm">Pending</h4>
                </div>
                <p className="text-xl font-bold">2</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Check size={16} className="text-green-500" />
                  <h4 className="font-medium text-sm">Interviews</h4>
                </div>
                <p className="text-xl font-bold">1</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Building size={16} className="text-blue-500" />
                  <h4 className="font-medium text-sm">Off-Market</h4>
                </div>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Top matching skills</h4>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">Product Strategy</Badge>
                <Badge variant="secondary">Data Analysis</Badge>
                <Badge variant="secondary">Leadership</Badge>
                <Badge variant="secondary">Agile</Badge>
                <Badge variant="secondary">UX Research</Badge>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <JobFiltersCard />
    </div>
  );
};

const JobFiltersCard: React.FC = () => {
  const [matchThreshold, setMatchThreshold] = React.useState([70]);
  const [onlyRemote, setOnlyRemote] = React.useState(false);
  
  return (
    <DashboardCard title="Job Filters">
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Match Threshold</h4>
          <div className="pt-4 pb-2">
            <Slider
              value={matchThreshold}
              onValueChange={setMatchThreshold}
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
            onCheckedChange={setOnlyRemote}
          />
          <Label htmlFor="remote-only">Remote jobs only</Label>
        </div>
        
        <LocationFilters />
        <JobTypeFilters />
        
        <Button variant="outline" className="w-full">
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

export default JobsOverviewCards;
