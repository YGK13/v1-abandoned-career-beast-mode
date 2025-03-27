
import { jobs } from './jobsData';
import { offMarketJobs } from './offMarketJobsData';

// Function to get application statistics
export const getApplicationStats = () => {
  const allJobs = [...jobs, ...offMarketJobs];
  
  return {
    total: allJobs.length,
    applied: allJobs.filter(job => job.applicationStatus === "applied" || 
                             job.applicationStatus === "interview" || 
                             job.applicationStatus === "offer").length,
    interviews: allJobs.filter(job => job.applicationStatus === "interview" || 
                               job.applicationStatus === "offer").length,
    offers: allJobs.filter(job => job.applicationStatus === "offer").length,
    saved: allJobs.filter(job => job.status === "saved").length,
    easyApply: allJobs.filter(job => job.easyApply).length,
  };
};
