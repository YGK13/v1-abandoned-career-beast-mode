
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface JobsHeaderProps {
  title?: string;
  subtitle?: string;
}

const JobsHeader: React.FC<JobsHeaderProps> = ({ 
  title = "Jobs", 
  subtitle = "Discover and track jobs tailored to your skills" 
}) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <Button variant="default" className="self-start md:self-auto flex items-center gap-1">
          <Zap size={16} />
          <span>Auto-apply Settings</span>
        </Button>
      </div>
    </header>
  );
};

export default JobsHeader;
