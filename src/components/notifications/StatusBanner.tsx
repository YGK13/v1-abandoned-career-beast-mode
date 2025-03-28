
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check } from "lucide-react";

const StatusBanner: React.FC = () => {
  return (
    <div className="rounded-md border p-4 bg-primary/5">
      <div className="flex items-start gap-3">
        <Calendar className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium">15-Minute Daily Career Boost</h3>
          <p className="text-sm text-muted-foreground">
            Receive actionable tips each day that take just 15 minutes to implement but can 
            significantly impact your career growth over time.
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          <Check className="h-3 w-3 mr-1" /> Active
        </Badge>
      </div>
    </div>
  );
};

export default StatusBanner;
