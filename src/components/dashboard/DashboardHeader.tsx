
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Award } from "lucide-react";

const DashboardHeader: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold">Career Dashboard</h1>
          <p className="text-muted-foreground mt-1">Your central hub for career growth and professional development</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Upload Resume</span>
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <Award size={16} />
            <span>Skills Assessment</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
        <h3 className="font-medium mb-2">Welcome to your professional command center</h3>
        <p className="text-muted-foreground text-sm">
          Track your career progress, manage your personal brand, expand your skills, find new opportunities, and 
          build your business - all from one centralized dashboard. Use the tools below to advance your professional growth.
        </p>
      </div>
    </header>
  );
};

export default DashboardHeader;
