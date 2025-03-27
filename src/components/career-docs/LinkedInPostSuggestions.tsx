
import React from "react";
import { Sparkles, RefreshCw, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PostSuggestion {
  id: string;
  content: string;
  type: 'industry' | 'trend' | 'opinion' | 'personal';
  engagement: 'low' | 'medium' | 'high';
}

const LinkedInPostSuggestions: React.FC = () => {
  const { toast } = useToast();
  
  // In a real implementation, these would be generated based on user data
  // and stored/fetched from an API
  const postSuggestions: PostSuggestion[] = [
    {
      id: "post1",
      content: "Just wrapped up a major product launch that increased our user retention by 32%. The key? Actually listening to customer feedback and implementing changes quickly. What's been your most successful product strategy?",
      type: "personal",
      engagement: "high"
    },
    {
      id: "post2",
      content: "AI isn't replacing product managers - it's transforming how we work. I've started using AI for user research synthesis and it's saving me 5+ hours weekly. Anyone else finding creative ways to leverage AI in their product process?",
      type: "trend",
      engagement: "high"
    },
    {
      id: "post3",
      content: "Controversial take: Most roadmaps are wishful thinking documents that rarely survive contact with reality. I've found two-week shipping cycles with clear goals much more effective than detailed 6-month plans. Thoughts?",
      type: "opinion",
      engagement: "medium"
    }
  ];

  const handleCopyPost = (post: string) => {
    navigator.clipboard.writeText(post);
    toast({
      title: "Post copied",
      description: "Ready to paste to LinkedIn",
    });
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'industry': return 'Industry News';
      case 'trend': return 'Trending Topic';
      case 'opinion': return 'Thought Leadership';
      case 'personal': return 'Personal Story';
      default: return type;
    }
  };

  const getEngagementBadge = (engagement: string) => {
    switch(engagement) {
      case 'high':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/30">High Engagement</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800/30">Medium Engagement</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/30">Low Engagement</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Generated LinkedIn Posts</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
        <CardDescription>
          One new post suggestion daily to boost your LinkedIn presence and engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {postSuggestions.map((post) => (
            <div key={post.id} className="border border-muted rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <Badge variant="outline">{getTypeLabel(post.type)}</Badge>
                {getEngagementBadge(post.engagement)}
              </div>
              <p className="text-sm leading-relaxed">{post.content}</p>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground"
                  onClick={() => handleCopyPost(post.content)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share to LinkedIn
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <p className="text-sm text-muted-foreground">Posts are generated based on your profile, documents, and industry trends</p>
        <Button variant="outline" size="sm">See All Suggestions</Button>
      </CardFooter>
    </Card>
  );
};

export default LinkedInPostSuggestions;
