
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface Tip {
  id: number;
  conversation: number;
  quote: string;
  tip: string;
  category: string;
  source: string;
}

interface Conversation {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  badgeColor: string;
}

interface ConversationSectionProps {
  conversation: Conversation;
  tips: Tip[];
}

const ConversationSection: React.FC<ConversationSectionProps> = ({ conversation, tips }) => {
  const ConversationIcon = conversation.icon;

  return (
    <Card>
      <CardHeader className={conversation.color.replace("text-", "")}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
            <ConversationIcon size={18} className={conversation.color.split(" ")[1]} />
          </div>
          <div>
            <CardTitle>{conversation.title}</CardTitle>
            <CardDescription className="text-gray-700">{conversation.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {tips.slice(0, 2).map((tip) => (
            <div key={tip.id} className="p-3 border rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className={conversation.badgeColor}>
                  {tip.category}
                </Badge>
              </div>
              <p className="text-sm italic mb-2">"{tip.quote}"</p>
              <div className="bg-muted/50 p-2 rounded text-sm">
                {tip.tip}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View All Tips
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConversationSection;
