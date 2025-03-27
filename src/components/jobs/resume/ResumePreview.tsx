
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Job } from "../data/types";

interface ResumePreviewProps {
  resumeData: {
    jobTitle: string;
    company: string;
    tailoredSkills: string[];
    resumeId: string;
    atsScore: number;
    keywords: string[];
  } | null;
  job: Job;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, job }) => {
  if (!resumeData) return null;
  
  return (
    <div className="mt-6 p-4 border rounded-lg bg-muted/20">
      <div className="flex justify-between mb-2">
        <h4 className="font-medium">Resume Preview</h4>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {resumeData.atsScore}% ATS Score
        </Badge>
      </div>
      
      <div className="text-sm space-y-2">
        <p><strong>Optimized for:</strong> {job.title} at {job.company}</p>
        <div>
          <p className="mb-1"><strong>Key Skills Highlighted:</strong></p>
          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
