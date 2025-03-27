
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart } from "lucide-react";
import { usePublishedPosts } from "./usePublishedPosts";
import PostAnalyticsSummary from "./PostAnalyticsSummary";
import PostAnalyticsChart from "./PostAnalyticsChart";
import PostHistoryItem from "./PostHistoryItem";
import { TimeRange } from "./PostAnalyticsTypes";

const LinkedInPostHistory: React.FC = () => {
  const { 
    filteredPosts, 
    totalMetrics, 
    selectedTimeRange, 
    setSelectedTimeRange 
  } = usePublishedPosts();

  const handleTimeRangeChange = (value: string) => {
    setSelectedTimeRange(value as TimeRange);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            <CardTitle>LinkedIn Post Analytics</CardTitle>
          </div>
          <Select 
            value={selectedTimeRange} 
            onValueChange={handleTimeRangeChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past 3 Months</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Track the performance of your published LinkedIn posts
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <PostAnalyticsSummary metrics={totalMetrics} timeRange={selectedTimeRange} />
        
        <Tabs defaultValue="analytics" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">Post History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <PostAnalyticsChart publishedPosts={filteredPosts} />
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostHistoryItem key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No posts published during this time period.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LinkedInPostHistory;
