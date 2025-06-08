import React from 'react';
import { Job } from '../../pages/JobRecommendationsPage'; // Assuming Job interface is exported
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <p>No job recommendations available at the moment.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
