
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

interface PostContentProps {
  content: string;
  expanded?: boolean;
}

const PostContent: React.FC<PostContentProps> = ({ content, expanded }) => {
  return (
    <div className="relative">
      <p className={`text-sm leading-relaxed ${!expanded && 'line-clamp-3'}`}>
        {content}
      </p>
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${expanded ? 'hidden' : 'flex'} items-center gap-1 bg-gradient-to-t from-background via-background to-transparent pt-6 px-4`}
        >
          <span>Read more</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
    </div>
  );
};

export default PostContent;
