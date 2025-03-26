
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import JobCard from "@/components/JobCard";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  postedDate: string;
  matchScore: number;
  skills: string[];
  isRecommended: boolean;
}

interface JobRecommendationsSectionProps {
  jobs: Job[];
}

const JobRecommendationsSection: React.FC<JobRecommendationsSectionProps> = ({ jobs }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Job Recommendations</h2>
        <Link to="/jobs">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span>All Jobs</span>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job, index) => (
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
    </div>
  );
};

export default JobRecommendationsSection;
