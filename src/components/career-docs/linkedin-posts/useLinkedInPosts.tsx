
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostSuggestion } from "./PostSuggestionTypes";
import { usePublishedPosts } from "./usePublishedPosts";

// This hook is kept as a placeholder after LinkedIn integration removal
// It provides mock functionality to avoid breaking components that might rely on it

export const useLinkedInPosts = () => {
  const [suggestions, setSuggestions] = useState<PostSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { publishedPosts, fetchPublishedPosts, addPublishedPost } = usePublishedPosts();

  const generatePostSuggestions = async () => {
    setIsLoading(true);
    
    try {
      // LinkedIn integration has been removed
      // Return empty suggestions
      setSuggestions([]);
      toast({
        title: "LinkedIn integration unavailable",
        description: "LinkedIn integration has been removed from this application.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error generating post suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate post suggestions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const publishPost = async (content: string) => {
    toast({
      title: "LinkedIn integration unavailable",
      description: "LinkedIn integration has been removed from this application.",
      variant: "destructive",
    });
    return null;
  };

  return {
    suggestions,
    isLoading,
    generatePostSuggestions,
    publishPost,
    publishedPosts,
    fetchPublishedPosts
  };
};
