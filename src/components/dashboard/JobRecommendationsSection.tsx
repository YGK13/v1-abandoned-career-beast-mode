
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, CreditCard, Lock } from "lucide-react";
import JobCard from "@/components/JobCard";
import { useSubscription } from "@/context/SubscriptionContext";
import DashboardCard from "@/components/DashboardCard";

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
  const { hasJobsAccess } = useSubscription();
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Job Recommendations</h2>
        <Link to={hasJobsAccess ? "/jobs" : "/pricing"}>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span>{hasJobsAccess ? "All Jobs" : "Unlock Jobs"}</span>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      
      {hasJobsAccess ? (
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
      ) : (
        <DashboardCard className="border-dashed border-2 bg-muted/20">
          <div className="flex flex-col items-center text-center p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            
            <h3 className="text-lg font-medium mb-2">Premium Job Recommendations</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Unlock personalized job recommendations with a Jobs subscription. 
              Get AI-powered job matching tailored to your skills and experience.
            </p>
            
            <Link to="/pricing">
              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                View Pricing Options
              </Button>
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full opacity-50">
              {jobs.slice(0, 2).map((job, index) => (
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
        </DashboardCard>
      )}
    </div>
  );
};

export default JobRecommendationsSection;
