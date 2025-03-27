
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2, Send } from "lucide-react";

interface PostActionsProps {
  postId: string;
  content: string;
  type: string;
  copiedPostId: string | null;
  onCopy: () => void;
  onPublish: (content: string, type: string) => void;
}

const PostActions: React.FC<PostActionsProps> = ({ 
  postId, 
  content,
  type,
  copiedPostId, 
  onCopy, 
  onPublish 
}) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={onCopy}
      >
        {copiedPostId === postId ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </>
        )}
      </Button>
      
      <Button 
        variant="default" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={() => onPublish(content, type)}
      >
        <Send className="h-4 w-4" />
        <span>Publish to LinkedIn</span>
      </Button>
    </div>
  );
};

export default PostActions;
