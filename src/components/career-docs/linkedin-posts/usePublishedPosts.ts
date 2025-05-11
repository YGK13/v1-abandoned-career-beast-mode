
// Placeholder file after LinkedIn integration removal
// This file provides mock functionality to avoid build errors

import { useState } from "react";

export interface PublishedPost {
  id: string;
  content: string;
  publishedAt: string;
  likes: number;
  comments: number;
}

export const usePublishedPosts = () => {
  const [publishedPosts, setPublishedPosts] = useState<PublishedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // This hook is kept as a placeholder after LinkedIn integration removal
  // It returns empty data since LinkedIn functionality has been removed

  return {
    publishedPosts,
    isLoading,
    error,
    fetchPublishedPosts: () => {
      console.log('LinkedIn integration has been removed');
      return Promise.resolve([]);
    },
    addPublishedPost: () => {
      console.log('LinkedIn integration has been removed');
      return Promise.resolve(null);
    }
  };
};
