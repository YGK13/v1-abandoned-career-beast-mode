
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Newspaper, Radio, Video, MessageCircle } from "lucide-react";
import { MediaMention } from "@/data/personalBrandData";
import { formatDistanceToNow } from "date-fns";

interface MentionCardProps {
  mention: MediaMention;
}

const MentionCard: React.FC<MentionCardProps> = ({ mention }) => {
  const { title, url, publicationName, publicationLogo, date, type, snippet, isNew } = mention;
  
  // Format the date
  const mentionDate = new Date(date);
  const timeAgo = formatDistanceToNow(mentionDate, { addSuffix: true });
  
  // Get the appropriate icon based on mention type
  const getIcon = () => {
    switch(type) {
      case "Article": return <Newspaper className="h-4 w-4" />;
      case "Podcast": return <Radio className="h-4 w-4" />;
      case "Video": return <Video className="h-4 w-4" />;
      case "Social": return <MessageCircle className="h-4 w-4" />;
      default: return <Newspaper className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative">
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-primary text-white">
            New
          </Badge>
        )}
      </div>
      
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="w-10 h-10 overflow-hidden rounded-md flex-shrink-0">
          {publicationLogo ? (
            <img 
              src={publicationLogo} 
              alt={publicationName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              {getIcon()}
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal">
              {type}
            </Badge>
            <span className="text-sm text-muted-foreground">{timeAgo}</span>
          </div>
          <h3 className="font-medium text-sm mt-1">{publicationName}</h3>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <h4 className="font-semibold text-base mb-2">{title}</h4>
        
        {snippet && (
          <div className="text-sm text-muted-foreground">
            <p className="line-clamp-3">"{snippet}"</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2"
          >
            View Full Mention <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentionCard;
