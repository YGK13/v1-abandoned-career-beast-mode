
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, LinkedinIcon, FileUp, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ size?: number; className?: string }>;
  completed?: boolean;
  action?: {
    label: string;
    path: string;
  };
}

const CareerSyncRoadmap: React.FC = () => {
  const steps: RoadmapStep[] = [
    {
      id: "linkedin",
      title: "Sync LinkedIn Profile",
      description: "Import your work history, skills, and education from LinkedIn",
      icon: LinkedinIcon,
      completed: false,
      action: {
        label: "Connect LinkedIn",
        path: "/linkedin"
      }
    },
    {
      id: "documents",
      title: "Upload Key Documents",
      description: "Add your resumes, certificates, and performance reviews",
      icon: FileUp,
      completed: false,
    },
    {
      id: "verification",
      title: "Verify Your Information",
      description: "Ensure all your career information is accurate and complete",
      icon: FileCheck,
      completed: false,
    }
  ];

  return (
    <DashboardCard className="mb-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Career Data Roadmap</h3>
          <Link to="/linkedin">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <span>LinkedIn Profile</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <p className="text-muted-foreground">
          Complete these steps to maximize the effectiveness of Career BEAST MODE
        </p>
        
        <div className="mt-6 space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step.completed 
                  ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                  : "bg-primary/10 text-primary"
              }`}>
                <step.icon size={20} />
              </div>
              
              <div className="flex-1 mt-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{step.title}</h4>
                  {step.completed && <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                
                {step.action && (
                  <Link to={step.action.path} className="inline-block mt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-sm">
                      {step.action.label}
                    </Button>
                  </Link>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="h-full ml-5 border-l border-dashed border-muted-foreground/20 pb-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default CareerSyncRoadmap;
