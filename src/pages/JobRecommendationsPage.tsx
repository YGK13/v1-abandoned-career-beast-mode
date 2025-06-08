import React from 'react';
import JobList from '../components/jobs/JobList';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  shortDescription: string;
  postedDate: Date;
}

// Mock data for jobs
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer, Frontend',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    shortDescription: 'Join our innovative frontend team to build next-gen web applications using React and TypeScript.',
    postedDate: new Date(2023, 10, 15), // Example: Nov 15, 2023
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovate Ltd.',
    location: 'New York, NY',
    shortDescription: 'Lead the product strategy for our new SaaS platform. Strong market analysis skills required.',
    postedDate: new Date(2023, 10, 20), // Example: Nov 20, 2023
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Creative Designs Co.',
    location: 'Remote',
    shortDescription: 'Design intuitive and engaging user experiences for mobile and web. Portfolio required.',
    postedDate: new Date(2023, 11, 1), // Example: Dec 1, 2023
  },
];

const JobRecommendationsPage: React.FC = () => {
  // In a real app, this data would likely come from state, context, or an API call
  const jobs = mockJobs;

  return (
    <div>
      <h1>Job Recommendations</h1>
      <div style={{ margin: '20px 0', padding: '10px', background: '#f0f0f0' }}>
        <p>Filters & Sort Options (Coming Soon)</p>
        {/* Placeholder for filter and sort controls */}
      </div>
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobRecommendationsPage;
