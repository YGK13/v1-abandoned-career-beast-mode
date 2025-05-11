
import React from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, FileText, Award, Users, Lightbulb } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "job" | "document" | "skill" | "network" | "learning";
  title: string;
  description: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase size={14} />;
      case "document":
        return <FileText size={14} />;
      case "skill":
        return <Award size={14} />;
      case "network":
        return <Users size={14} />;
      case "learning":
        return <Lightbulb size={14} />;
      default:
        return <FileText size={14} />;
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "document":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
      case "skill":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "network":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "learning":
        return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div>
      <h3 className="font-medium mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map(activity => (
          <div key={activity.id} className="p-3 bg-muted/40 rounded-md">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${getActivityBg(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center p-6 bg-muted/20 rounded-md">
          <p className="text-muted-foreground">No recent activity to display</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
