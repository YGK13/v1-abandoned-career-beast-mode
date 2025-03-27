
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, Check } from "lucide-react";
import { Job } from "../data/types";

interface JobBadgesProps {
  job: Job;
  isFresh: boolean;
}

export const JobBadges: React.FC<JobBadgesProps> = ({ job, isFresh }) => {
  // Function to render application status badge
  const renderApplicationStatus = () => {
    if (!job.applicationStatus || job.applicationStatus === "not_applied") return null;
    
    switch (job.applicationStatus) {
      case "applied":
        return (
          <Badge className="absolute top-3 left-3 z-10 bg-green-500 text-white border-0 flex items-center gap-1">
            <Check size={12} />
            Applied
          </Badge>
        );
      case "interview":
        return (
          <Badge className="absolute top-3 left-3 z-10 bg-blue-500 text-white border-0 flex items-center gap-1">
            <Check size={12} />
            Interview
          </Badge>
        );
      case "offer":
        return (
          <Badge className="absolute top-3 left-3 z-10 bg-purple-500 text-white border-0 flex items-center gap-1">
            <Check size={12} />
            Offer
          </Badge>
        );
      default:
        return null;
    }
  };

  // Render easy apply badge
  const renderEasyApply = () => {
    if (job.easyApply) {
      return (
        <Badge className="absolute bottom-3 left-3 z-10 bg-amber-500 text-white border-0 flex items-center gap-1">
          <Zap size={12} />
          Easy Apply
        </Badge>
      );
    }
    return null;
  };

  return (
    <>
      {isFresh && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-green-500 text-white border-0">Fresh</Badge>
        </div>
      )}
      {renderApplicationStatus()}
      {renderEasyApply()}
    </>
  );
};

export default JobBadges;
