
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, ThumbsUp, MessageSquare, Share } from "lucide-react";
import { PublishedPost } from "./PostAnalyticsTypes";
import { getTypeLabel } from "./PostSuggestionTypes";

interface PostHistoryItemProps {
  post: PublishedPost;
}

const PostHistoryItem: React.FC<PostHistoryItemProps> = ({ post }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 mb-2 justify-between">
            <Badge variant="outline">{getTypeLabel(post.type)}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Published: {formatDate(post.publishedDate)}</span>
            </div>
          </div>
          
          <p className="text-sm">{truncateContent(post.content)}</p>
          
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{post.analytics.views} views</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.analytics.likes} likes</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.analytics.comments} comments</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Share className="h-4 w-4 mr-1" />
              <span>{post.analytics.shares} shares</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostHistoryItem;
