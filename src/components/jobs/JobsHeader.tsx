
import React from "react";
import { Button } from "@/components/ui/button";
import { Zap, Settings } from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";

interface JobsHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenAutoApplySettings?: () => void;
}

const JobsHeader: React.FC<JobsHeaderProps> = ({ 
  title = "Jobs", 
  subtitle = "Discover and track jobs tailored to your skills",
  onOpenAutoApplySettings 
}) => {
  const { hasJobsAccess } = useSubscription();
  
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        {hasJobsAccess && (
          <Button 
            variant="default" 
            className="self-start md:self-auto flex items-center gap-1"
            onClick={onOpenAutoApplySettings}
          >
            <Zap size={16} />
            <span>Auto-apply Settings</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default JobsHeader;
