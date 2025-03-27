
import React, { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import DatePostedFilter from "./filters/DatePostedFilter";
import ExperienceLevelFilter from "./filters/ExperienceLevelFilter";
import RemoteOptionsFilter from "./filters/RemoteOptionsFilter";
import LocationFilter from "./filters/LocationFilter";
import CompanyFilter from "./filters/CompanyFilter";
import MatchThresholdFilter from "./filters/MatchThresholdFilter";
import MoreFiltersSection from "./filters/MoreFiltersSection";

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
        <DatePostedFilter 
          value={datePosted} 
          onChange={setDatePosted} 
        />

        <ExperienceLevelFilter 
          value={experienceLevel} 
          onChange={setExperienceLevel} 
        />

        <RemoteOptionsFilter 
          checked={onlyRemote} 
          onChange={onRemoteToggle} 
        />

        <LocationFilter />

        <CompanyFilter 
          open={showCompanyFilters} 
          onOpenChange={setShowCompanyFilters} 
        />
        
        <MatchThresholdFilter 
          value={matchThreshold} 
          onChange={onMatchThresholdChange} 
        />

        <MoreFiltersSection 
          open={showMoreFilters} 
          onOpenChange={setShowMoreFilters} 
        />
        
        <Button variant="outline" className="w-full" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </DashboardCard>
  );
};

export default JobFilters;
