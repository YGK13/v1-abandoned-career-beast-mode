
import React from "react";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PublishedPost } from "./PostAnalyticsTypes";

interface PostAnalyticsChartProps {
  publishedPosts: PublishedPost[];
}

const PostAnalyticsChart: React.FC<PostAnalyticsChartProps> = ({ publishedPosts }) => {
  // Sort posts by date (oldest to newest)
  const sortedPosts = [...publishedPosts].sort((a, b) => 
    new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
  );

  // Prepare chart data
  const chartData = sortedPosts.map(post => {
    const date = new Date(post.publishedDate);
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      Views: post.analytics.views,
      Likes: post.analytics.likes,
      Comments: post.analytics.comments,
      Shares: post.analytics.shares,
    };
  });

  return (
    <Card className="p-4 h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Views" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
          <Area type="monotone" dataKey="Likes" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
          <Area type="monotone" dataKey="Comments" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
          <Area type="monotone" dataKey="Shares" stroke="#ff8042" fill="#ff8042" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PostAnalyticsChart;
