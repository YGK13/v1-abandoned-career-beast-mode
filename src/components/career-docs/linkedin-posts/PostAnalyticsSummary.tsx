
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ThumbsUp, MessageSquare, Share } from "lucide-react";
import { PostAnalytics, TimeRange } from "./PostAnalyticsTypes";

interface PostAnalyticsSummaryProps {
  metrics: PostAnalytics;
  timeRange: TimeRange;
}

const formatNumber = (num: number): string => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
};

const getTimeRangeLabel = (timeRange: TimeRange): string => {
  switch (timeRange) {
    case 'week': return 'Past Week';
    case 'month': return 'Past Month';
    case 'quarter': return 'Past 3 Months';
    case 'year': return 'Past Year';
  }
};

const PostAnalyticsSummary: React.FC<PostAnalyticsSummaryProps> = ({ metrics, timeRange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{getTimeRangeLabel(timeRange)} Views</p>
              <h4 className="text-2xl font-semibold">{formatNumber(metrics.views)}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
              <ThumbsUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{getTimeRangeLabel(timeRange)} Likes</p>
              <h4 className="text-2xl font-semibold">{formatNumber(metrics.likes)}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
              <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{getTimeRangeLabel(timeRange)} Comments</p>
              <h4 className="text-2xl font-semibold">{formatNumber(metrics.comments)}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900">
              <Share className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{getTimeRangeLabel(timeRange)} Shares</p>
              <h4 className="text-2xl font-semibold">{formatNumber(metrics.shares)}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostAnalyticsSummary;
