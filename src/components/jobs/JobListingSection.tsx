
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import JobCard from "@/components/JobCard";
import { Search, Briefcase } from "lucide-react";
import OffMarketBanner from "./OffMarketBanner";

interface JobCategory {
  id: string;
  name: string;
}

interface Job {
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  matchScore: number;
  skills: string[];
  isRecommended: boolean;
  status: string;
}

interface JobListingSectionProps {
  jobs: Job[];
  offMarketJobs: Job[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchThreshold: number[];
  onlyRemote: boolean;
}

const JobListingSection: React.FC<JobListingSectionProps> = ({
  jobs,
  offMarketJobs,
  searchQuery,
  onSearchChange,
  matchThreshold,
  onlyRemote
}) => {
  const jobCategories: JobCategory[] = [
    { id: "all", name: "All Jobs" },
    { id: "recommended", name: "Recommended" },
    { id: "offmarket", name: "Off-Market Exec" },
    { id: "applied", name: "Applied" },
    { id: "saved", name: "Saved" },
  ];

  const allJobs = [...jobs, ...offMarketJobs];

  const filteredJobs = (category: string) => {
    let filtered = allJobs;
    
    if (category !== "all") {
      filtered = filtered.filter(job => job.status === category);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = filtered.filter(job => job.matchScore >= matchThreshold[0]);
    
    if (onlyRemote) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes("remote"));
    }
    
    return filtered;
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Job Listings</h2>
        
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="w-full sm:w-auto mb-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {jobCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {jobCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs(category.id).map((job, index) => (
                <JobCard
                  key={index}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  salary={job.salary}
                  postedDate={job.postedDate}
                  matchScore={job.matchScore}
                  skills={job.skills}
                  isRecommended={job.isRecommended}
                />
              ))}
            </div>
            
            {filteredJobs(category.id).length === 0 && (
              <EmptyJobsState searchQuery={searchQuery} />
            )}

            {category.id === "offmarket" && filteredJobs(category.id).length > 0 && (
              <OffMarketBanner />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

const EmptyJobsState: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Briefcase size={24} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No jobs found</h3>
      <p className="text-muted-foreground mt-1 max-w-md">
        {searchQuery ? 
          `No jobs matching "${searchQuery}" with current filters.` : 
          "No jobs match your current filter criteria."}
      </p>
      <Button variant="outline" className="mt-4">
        Reset Filters
      </Button>
    </div>
  );
};

export default JobListingSection;
