
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

interface EmptyJobsStateProps {
  searchQuery: string;
  onResetFilters?: () => void;
}

const EmptyJobsState: React.FC<EmptyJobsStateProps> = ({ searchQuery, onResetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Briefcase size={24} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No jobs found</h3>
      <p className="text-muted-foreground mt-1 max-w-md">
        {searchQuery ? 
          `No jobs matching "${searchQuery}" with current filters.` : 
          "No jobs match your current filter criteria."}
      </p>
      {onResetFilters && (
        <Button variant="outline" className="mt-4" onClick={onResetFilters}>
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default EmptyJobsState;
