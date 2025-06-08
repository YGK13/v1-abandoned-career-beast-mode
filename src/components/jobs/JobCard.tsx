import React from 'react';
import { Job } from '../../pages/JobRecommendationsPage'; // Assuming Job interface is exported here

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '15px 0', borderRadius: '8px' }}>
      <h3>{job.title}</h3>
      <p><strong>{job.company}</strong> - {job.location}</p>
      <p>{job.shortDescription}</p>
      <p><small>Posted: {job.postedDate.toLocaleDateString()}</small></p>
      <button onClick={() => alert('View details for: ' + job.title)}>View Details</button>
      <button onClick={() => alert('Apply for: ' + job.title)} style={{ marginLeft: '10px' }}>Apply Now</button>
    </div>
  );
};

export default JobCard;
