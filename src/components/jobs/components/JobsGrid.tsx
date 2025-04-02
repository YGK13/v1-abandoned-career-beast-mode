
import React, { useState } from "react";
import { Job } from "../data/types";
import JobCard from "@/components/JobCard";
import JobBadges from "./JobBadges";
import SourceLabel from "./SourceLabel";
import LinkedInReferrals from "./LinkedInReferrals";
import { getConnectionsForCompany } from "../data/linkedInConnectionsData";

interface JobsGridProps {
  jobs: Job[];
  onApply?: (job: Job) => void;
}

const JobsGrid: React.FC<JobsGridProps> = ({ jobs, onApply }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Function to determine if a job is fresh (≤ 7 days)
  const isFreshJob = (postedDate: string) => {
    if (!postedDate) return false;
    if (postedDate.includes('just now') || postedDate.includes('hour')) return true;
    if (postedDate.includes('day')) {
      const days = parseInt(postedDate.split(' ')[0]);
      return days <= 7;
    }
    return false;
  };

  // Toggle showing connections for a specific job
  const handleJobClick = (job: Job) => {
    setSelectedJob(selectedJob?.id === job.id ? null : job);
    if (onApply) onApply(job);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job, index) => (
        <div key={job.id || index} className="relative">
          <JobBadges 
            job={job} 
            isFresh={isFreshJob(job.postedDate)} 
          />
          <SourceLabel source={job.source || 'general'} />
          
          <JobCard
            title={job.title}
            company={job.company}
            location={job.location}
            salary={job.salary}
            postedDate={job.postedDate}
            matchScore={job.matchScore}
            skills={job.skills}
            isRecommended={job.isRecommended}
            onClick={() => handleJobClick(job)}
          />
          
          {selectedJob?.id === job.id && (
            <LinkedInReferrals 
              job={job} 
              connections={getConnectionsForCompany(job.company)} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default JobsGrid;
