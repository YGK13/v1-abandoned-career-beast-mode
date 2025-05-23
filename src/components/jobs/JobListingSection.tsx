
import React from "react";
import { Job } from "./data/types";
import JobSearch from "./components/JobSearch";
import JobCategoryTabs, { JobCategory } from "./components/JobCategoryTabs";
import EmptyJobsState from "./components/EmptyJobsState";
import JobsGrid from "./components/JobsGrid";
import OffMarketBanner from "./OffMarketBanner";

interface JobListingSectionProps {
  jobs: Job[];
  offMarketJobs: Job[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchThreshold: number[];
  onlyRemote: boolean;
  onApply?: (job: Job) => void;
  onResetFilters?: () => void;
}

const JobListingSection: React.FC<JobListingSectionProps> = ({
  jobs = [],
  offMarketJobs = [],
  searchQuery = "",
  onSearchChange,
  matchThreshold = [70],
  onlyRemote = false,
  onApply,
  onResetFilters
}) => {
  const jobCategories: JobCategory[] = [
    { id: "all", name: "All Jobs" },
    { id: "recommended", name: "Recommended" },
    { id: "offmarket", name: "Off-Market Exec" },
    { id: "applied", name: "Applied" },
    { id: "saved", name: "Saved" },
  ];

  // Add default values to prevent errors with undefined properties
  const safeJobs = jobs?.map((job, index) => ({
    ...job,
    id: job.id || `job-${index}`,
    status: job.status || 'all',
    source: job.source || 'general',
    skills: job.skills || []
  })) || [];
  
  const safeOffMarketJobs = offMarketJobs?.map((job, index) => ({
    ...job,
    id: job.id || `offmarket-${index}`,
    status: job.status || 'offmarket',
    source: job.source || 'offmarket',
    skills: job.skills || []
  })) || [];

  const allJobs = [...safeJobs, ...safeOffMarketJobs];

  const filteredJobs = (category: string) => {
    try {
      let filtered = allJobs;
      
      if (category !== "all") {
        filtered = filtered.filter(job => job.status === category);
      }
      
      if (searchQuery) {
        filtered = filtered.filter(job => 
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      filtered = filtered.filter(job => job.matchScore >= matchThreshold[0]);
      
      if (onlyRemote) {
        filtered = filtered.filter(job => job.location?.toLowerCase().includes("remote"));
      }
      
      return filtered;
    } catch (error) {
      console.error("Error filtering jobs:", error);
      return [];
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Job Listings</h2>
        <JobSearch 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange} 
        />
      </div>
      
      <JobCategoryTabs categories={jobCategories}>
        {(categoryId) => {
          try {
            const jobsToShow = filteredJobs(categoryId);
            
            return (
              <>
                {jobsToShow.length > 0 ? (
                  <JobsGrid 
                    jobs={jobsToShow} 
                    onApply={onApply} 
                  />
                ) : (
                  <EmptyJobsState 
                    searchQuery={searchQuery} 
                    onResetFilters={onResetFilters} 
                  />
                )}

                {categoryId === "offmarket" && jobsToShow.length > 0 && (
                  <OffMarketBanner />
                )}
              </>
            );
          } catch (error) {
            console.error("Error rendering job category:", error);
            return <div className="p-8 text-center text-muted-foreground">There was an error loading jobs. Please try again.</div>;
          }
        }}
      </JobCategoryTabs>
    </>
  );
};

export default JobListingSection;
