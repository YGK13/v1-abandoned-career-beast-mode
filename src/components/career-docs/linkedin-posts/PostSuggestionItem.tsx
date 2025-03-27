
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Clock } from "lucide-react";
import { PostSuggestion, getTypeLabel } from "./PostSuggestionTypes";
import EngagementBadge from "./EngagementBadge";
import PostContent from "./PostContent";
import PostMetadata from "./PostMetadata";
import PostActions from "./PostActions";

interface PostSuggestionItemProps {
  post: PostSuggestion;
  copiedPostId: string | null;
  onToggleExpand: (id: string) => void;
  onCopyPost: (post: string, id: string) => void;
}

const PostSuggestionItem: React.FC<PostSuggestionItemProps> = ({ 
  post, 
  copiedPostId, 
  onToggleExpand, 
  onCopyPost 
}) => {
  return (
    <Collapsible 
      open={post.expanded}
      onOpenChange={() => onToggleExpand(post.id)}
      className="border border-muted rounded-lg p-4 space-y-3"
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{getTypeLabel(post.type)}</Badge>
          <EngagementBadge engagement={post.engagement} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>Best time: {post.bestTimeToPost}</span>
          </div>
        </div>
      </div>
      
      <PostContent content={post.content} expanded={post.expanded} />
      
      <CollapsibleContent>
        <div className="pt-2">
          <PostMetadata 
            bestTimeToPost={post.bestTimeToPost} 
            audienceInsight={post.audienceInsight} 
          />
          
          <PostActions 
            postId={post.id} 
            copiedPostId={copiedPostId} 
            onCopy={() => onCopyPost(post.content, post.id)} 
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PostSuggestionItem;
