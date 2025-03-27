
import React from "react";
import { Job } from "../JobsData";
import JobCard from "@/components/JobCard";
import JobBadges from "./JobBadges";
import SourceLabel from "./SourceLabel";

interface JobsGridProps {
  jobs: Job[];
  onApply?: (job: Job) => void;
}

const JobsGrid: React.FC<JobsGridProps> = ({ jobs, onApply }) => {
  // Function to determine if a job is fresh (≤ 7 days)
  const isFreshJob = (postedDate: string) => {
    if (postedDate.includes('just now') || postedDate.includes('hour')) return true;
    if (postedDate.includes('day')) {
      const days = parseInt(postedDate.split(' ')[0]);
      return days <= 7;
    }
    return false;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job, index) => (
        <div key={index} className="relative">
          <JobBadges 
            job={job} 
            isFresh={isFreshJob(job.postedDate)} 
          />
          <SourceLabel source={job.source} />
          
          <JobCard
            title={job.title}
            company={job.company}
            location={job.location}
            salary={job.salary}
            postedDate={job.postedDate}
            matchScore={job.matchScore}
            skills={job.skills}
            isRecommended={job.isRecommended}
            onClick={() => onApply && onApply(job)}
          />
        </div>
      ))}
    </div>
  );
};

export default JobsGrid;
