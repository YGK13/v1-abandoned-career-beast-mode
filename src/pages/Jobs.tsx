
import React, { useState } from "react";
import Layout from "@/components/Layout";
import JobsHeader from "@/components/jobs/JobsHeader";
import JobFilters from "@/components/jobs/JobFilters";
import JobListingSection from "@/components/jobs/JobListingSection";
import AutoApplySettings from "@/components/jobs/AutoApplySettings";
import { jobs, offMarketJobs, getApplicationStats } from "@/components/jobs/data";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, Building, Briefcase } from "lucide-react";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchThreshold, setMatchThreshold] = useState([70]);
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [isAutoApplyOpen, setIsAutoApplyOpen] = useState(false);
  
  const handleResetFilters = () => {
    setSearchQuery("");
    setMatchThreshold([70]);
    setOnlyRemote(false);
  };

  const appStats = getApplicationStats();

  return (
    <Layout>
      <div className="page-container">
        <JobsHeader onOpenAutoApplySettings={() => setIsAutoApplyOpen(true)} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0 w-full sm:w-36 space-y-4">
                <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
                  <h4 className="text-2xl font-bold text-primary mb-1">92%</h4>
                  <p className="text-xs text-muted-foreground text-center">Match with top job</p>
                </div>
                
                <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-1">{appStats.total}</h4>
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
                    <p className="text-xl font-bold">{appStats.saved}</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Check size={16} className="text-green-500" />
                      <h4 className="font-medium text-sm">Interviews</h4>
                    </div>
                    <p className="text-xl font-bold">{appStats.interviews}</p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Building size={16} className="text-blue-500" />
                      <h4 className="font-medium text-sm">Off-Market</h4>
                    </div>
                    <p className="text-xl font-bold">{offMarketJobs.length}</p>
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
          
          <JobFilters 
            matchThreshold={matchThreshold}
            onlyRemote={onlyRemote}
            onMatchThresholdChange={setMatchThreshold}
            onRemoteToggle={setOnlyRemote}
            onReset={handleResetFilters}
          />
        </div>
        
        <JobListingSection 
          jobs={jobs}
          offMarketJobs={offMarketJobs}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          matchThreshold={matchThreshold}
          onlyRemote={onlyRemote}
          onApply={(job) => console.log("Apply to job:", job)}
          onResetFilters={handleResetFilters}
        />
        
        <AutoApplySettings
          open={isAutoApplyOpen}
          onOpenChange={setIsAutoApplyOpen}
        />
      </div>
    </Layout>
  );
};

export default Jobs;
