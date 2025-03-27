
import React from "react";
import { Clock, Users, BarChart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PostMetadataProps {
  bestTimeToPost: string;
  audienceInsight: string;
}

const PostMetadata: React.FC<PostMetadataProps> = ({ bestTimeToPost, audienceInsight }) => {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
      <div className="flex items-center">
        <Users className="h-3 w-3 mr-1" />
        <span>{audienceInsight}</span>
      </div>
      <Separator orientation="vertical" className="h-3" />
      <div className="flex items-center">
        <BarChart className="h-3 w-3 mr-1" />
        <span>Expected reach: 2-3x your average</span>
      </div>
      <Separator orientation="vertical" className="h-3" />
      <div className="flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        <span>Best time: {bestTimeToPost}</span>
      </div>
    </div>
  );
};

export default PostMetadata;
