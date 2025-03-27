
import React from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import LinkedInPostSuggestionsList from "./linkedin-posts/LinkedInPostSuggestionsList";
import { useLinkedInPosts } from "./linkedin-posts/useLinkedInPosts";

const LinkedInPostSuggestions: React.FC = () => {
  const { refreshPosts } = useLinkedInPosts();

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Generated LinkedIn Posts</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={refreshPosts}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
        <CardDescription>
          High-quality post suggestions to boost your LinkedIn presence and engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LinkedInPostSuggestionsList />
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <p className="text-sm text-muted-foreground">Posts are generated based on your profile, documents, and industry trends</p>
        <Button variant="outline" size="sm">See All Suggestions</Button>
      </CardFooter>
    </Card>
  );
};

export default LinkedInPostSuggestions;
