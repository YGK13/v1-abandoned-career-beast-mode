
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, CreditCard, Lock, FileText, CheckCircle2 } from "lucide-react";
import JobCard from "@/components/JobCard";
import { useSubscription } from "@/context/SubscriptionContext";
import DashboardCard from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { autoApplyToJob } from "@/components/jobs/data/jobsAPI";
import ResumeGenerator from "@/components/jobs/ResumeGenerator";

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
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [isGeneratingResume, setIsGeneratingResume] = React.useState(false);
  const [isApplying, setIsApplying] = React.useState(false);
  const [showResumeGenerator, setShowResumeGenerator] = React.useState(false);
  
  const handleApplyToJob = async (job: Job) => {
    setSelectedJob(job);
    setIsGeneratingResume(true);
    setShowResumeGenerator(true);
  };

  const handleAutoApply = async (job: Job, resumeData: any) => {
    setIsApplying(true);
    try {
      // Use the autoApplyToJob function from jobsAPI.ts
      const success = await autoApplyToJob(job, { resumeData });
      
      if (success) {
        toast({
          title: "Application Submitted",
          description: `Your tailored application to ${job.title} at ${job.company} was successfully submitted.`,
        });
      } else {
        toast({
          title: "Application Failed",
          description: "We couldn't submit your application. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      toast({
        title: "Application Error",
        description: "An unexpected error occurred while submitting your application.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
      setShowResumeGenerator(false);
      setIsGeneratingResume(false);
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Job Recommendations</h2>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Auto-Apply
          </Badge>
        </div>
        <Link to="/jobs">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span>All Jobs</span>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      
      <DashboardCard className="mb-4 bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">AI-Powered Auto-Apply</h3>
            <p className="text-sm text-muted-foreground">
              Our system generates a perfectly tailored resume for each job and automatically applies for you. Every resume is optimized for ATS with a 92% success rate.
            </p>
          </div>
          <Link to="/jobs">
            <Button variant="outline" size="sm">
              View Settings
            </Button>
          </Link>
        </div>
      </DashboardCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job, index) => (
          <div key={index} className="relative">
            {job.matchScore > 85 && (
              <div className="absolute -top-1 -right-1 z-10">
                <Badge className="bg-green-500 text-white border-0 flex gap-1 items-center">
                  <CheckCircle2 size={14} />
                  <span>Perfect Match</span>
                </Badge>
              </div>
            )}
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
              onClick={() => handleApplyToJob(job)}
            />
          </div>
        ))}
      </div>
      
      {showResumeGenerator && selectedJob && (
        <ResumeGenerator 
          job={selectedJob}
          isGenerating={isGeneratingResume}
          isApplying={isApplying}
          onApply={(resumeData) => handleAutoApply(selectedJob, resumeData)}
          onCancel={() => {
            setShowResumeGenerator(false);
            setIsGeneratingResume(false);
          }}
        />
      )}
    </div>
  );
};

export default JobRecommendationsSection;
