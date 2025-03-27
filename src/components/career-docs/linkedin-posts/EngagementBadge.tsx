
import React from "react";
import { Badge } from "@/components/ui/badge";

interface EngagementBadgeProps {
  engagement: string;
}

const EngagementBadge: React.FC<EngagementBadgeProps> = ({ engagement }) => {
  switch(engagement) {
    case 'high':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/30">High Engagement</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800/30">Medium Engagement</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/30">Low Engagement</Badge>;
    default:
      return null;
  }
};

export default EngagementBadge;
