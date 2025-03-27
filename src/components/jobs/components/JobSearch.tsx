
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800">
        Updated daily
      </Badge>
      <div className="relative w-full sm:w-72">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search jobs..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JobSearch;
