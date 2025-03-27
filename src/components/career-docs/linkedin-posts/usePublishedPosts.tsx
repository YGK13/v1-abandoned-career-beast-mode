
import { useState } from "react";
import { PublishedPost, TimeRange } from "./PostAnalyticsTypes";
import { useToast } from "@/hooks/use-toast";

// Mock data for published posts
const defaultPublishedPosts: PublishedPost[] = [
  {
    id: "pub1",
    content: "After 5 years implementing product strategies across various industries, I've noticed a consistent pattern: companies that prioritize user research before roadmap planning see 32% higher user retention rates on average.",
    type: "personal",
    publishedDate: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
    analytics: {
      views: 2457,
      likes: 87,
      comments: 14,
      shares: 23,
      impressions: 3842
    }
  },
  {
    id: "pub2",
    content: "The AI revolution in product management isn't replacing PMs - it's creating a new category of \"AI-augmented product managers\" who leverage these tools strategically.",
    type: "trend",
    publishedDate: new Date(Date.now() - 86400000 * 32).toISOString(), // 32 days ago
    analytics: {
      views: 4121,
      likes: 156,
      comments: 28,
      shares: 42,
      impressions: 6234
    }
  },
  {
    id: "pub3",
    content: "Unpopular opinion: Most product roadmaps are fantasy documents that create more problems than they solve.",
    type: "opinion",
    publishedDate: new Date(Date.now() - 86400000 * 45).toISOString(), // 45 days ago
    analytics: {
      views: 1823,
      likes: 76,
      comments: 32,
      shares: 18,
      impressions: 2765
    }
  }
];

export const usePublishedPosts = () => {
  const { toast } = useToast();
  const [publishedPosts, setPublishedPosts] = useState<PublishedPost[]>(defaultPublishedPosts);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('month');

  const getFilteredPosts = (): PublishedPost[] => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (selectedTimeRange) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return publishedPosts.filter(post => 
      new Date(post.publishedDate) >= cutoffDate
    );
  };

  const getTotalMetrics = () => {
    const filteredPosts = getFilteredPosts();
    return filteredPosts.reduce((totals, post) => {
      return {
        views: totals.views + post.analytics.views,
        likes: totals.likes + post.analytics.likes,
        comments: totals.comments + post.analytics.comments,
        shares: totals.shares + post.analytics.shares,
        impressions: totals.impressions + post.analytics.impressions
      };
    }, { views: 0, likes: 0, comments: 0, shares: 0, impressions: 0 });
  };

  const publishPost = (content: string, type: string) => {
    const newPost: PublishedPost = {
      id: `pub${publishedPosts.length + 1}`,
      content,
      type,
      publishedDate: new Date().toISOString(),
      analytics: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        impressions: 0
      }
    };
    
    setPublishedPosts([newPost, ...publishedPosts]);
    toast({
      title: "Post published to LinkedIn",
      description: "Your post has been successfully published.",
    });
  };

  return {
    publishedPosts,
    filteredPosts: getFilteredPosts(),
    totalMetrics: getTotalMetrics(),
    selectedTimeRange,
    setSelectedTimeRange,
    publishPost
  };
};
