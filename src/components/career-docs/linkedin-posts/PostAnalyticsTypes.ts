
export interface PostAnalytics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
}

export interface PublishedPost {
  id: string;
  content: string;
  type: string;
  publishedDate: string;
  analytics: PostAnalytics;
}

export type TimeRange = 'week' | 'month' | 'quarter' | 'year';
