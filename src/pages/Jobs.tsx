
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import JobsHeader from "@/components/jobs/JobsHeader";
import JobFilters from "@/components/jobs/JobFilters";
import JobListingSection from "@/components/jobs/JobListingSection";
import AutoApplySettings from "@/components/jobs/AutoApplySettings";
import { jobs, offMarketJobs, getApplicationStats } from "@/components/jobs/data";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, Building, Briefcase, Target, Award, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchThreshold, setMatchThreshold] = useState([70]);
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [isAutoApplyOpen, setIsAutoApplyOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset error state when component mounts
    setError(null);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery("");
    setMatchThreshold([70]);
    setOnlyRemote(false);
  };

  // Safely get application stats with error handling
  const getStats = () => {
    try {
      return getApplicationStats();
    } catch (error) {
      console.error("Error getting application stats:", error);
      setError("Failed to load application statistics");
      return {
        total: 0,
        applied: 0,
        interviews: 0,
        offers: 0,
        saved: 0
      };
    }
  };

  const appStats = getStats();

  // Handle errors during job rendering
  if (error) {
    return (
      <Layout>
        <div className="page-container">
          <JobsHeader />
          <DashboardCard>
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium text-destructive mb-2">Error Loading Jobs</h3>
              <p className="text-muted-foreground">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
              >
                Reload Page
              </button>
            </div>
          </DashboardCard>
        </div>
      </Layout>
    );
  }

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
          
          <DashboardCard>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Application Progress</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applied</span>
                    <span className="font-medium">{appStats.applied}/{appStats.total || 1}</span>
                  </div>
                  <Progress value={appStats.total ? (appStats.applied/appStats.total) * 100 : 0} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interviews</span>
                    <span className="font-medium">{appStats.interviews}/{appStats.total || 1}</span>
                  </div>
                  <Progress value={appStats.total ? (appStats.interviews/appStats.total) * 100 : 0} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Offers</span>
                    <span className="font-medium">{appStats.offers}/{appStats.total || 1}</span>
                  </div>
                  <Progress value={appStats.total ? (appStats.offers/appStats.total) * 100 : 0} className="h-2" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-2">Top Job Locations</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>San Francisco (12)</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>New York (8)</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>Remote (15)</span>
                  </Badge>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <JobFilters 
              matchThreshold={matchThreshold}
              onlyRemote={onlyRemote}
              onMatchThresholdChange={setMatchThreshold}
              onRemoteToggle={setOnlyRemote}
              onReset={handleResetFilters}
            />
          </div>
          
          <div className="md:col-span-3">
            <JobListingSection 
              jobs={jobs || []}
              offMarketJobs={offMarketJobs || []}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              matchThreshold={matchThreshold}
              onlyRemote={onlyRemote}
              onApply={(job) => console.log("Apply to job:", job)}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
        
        <AutoApplySettings
          open={isAutoApplyOpen}
          onOpenChange={setIsAutoApplyOpen}
        />
      </div>
    </Layout>
  );
};

export default Jobs;
