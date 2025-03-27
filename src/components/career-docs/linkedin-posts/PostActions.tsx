
import React from "react";
import { Copy, Share2, ChevronUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

interface PostActionsProps {
  onCopy: () => void;
  postId: string;
  copiedPostId: string | null;
}

const PostActions: React.FC<PostActionsProps> = ({ onCopy, postId, copiedPostId }) => {
  return (
    <div className="flex flex-wrap justify-end gap-2 mt-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-muted-foreground h-8"
        onClick={onCopy}
      >
        {copiedPostId === postId ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </>
        )}
      </Button>
      <Button variant="default" size="sm" className="h-8">
        <Share2 className="h-4 w-4 mr-1" />
        Share to LinkedIn
      </Button>
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground h-8"
        >
          <ChevronUp className="h-4 w-4 mr-1" />
          Collapse
        </Button>
      </CollapsibleTrigger>
    </div>
  );
};

export default PostActions;
