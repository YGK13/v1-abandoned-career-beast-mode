
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkedInPostGeneratorProps {
  dailyPostIdea: string;
  industry: string;
}

const LinkedInPostGenerator: React.FC<LinkedInPostGeneratorProps> = ({ dailyPostIdea, industry }) => {
  const { toast } = useToast();
  const [generatedPost, setGeneratedPost] = useState<string>("");
  
  // Sample posts mapped to daily ideas
  const samplePosts = {
    "Share a career milestone and what you learned": 
      "I'm excited to share that I just hit 5 years in the tech industry! Looking back, here are three lessons that transformed my approach to product development:\n\n1. Listen to users, not just stakeholders\n2. Data should inform decisions, not make them\n3. The best solutions are often the simplest ones\n\nWhat career lessons have transformed your work? I'd love to hear your insights in the comments below.\n\n#CareerMilestones #ProductDevelopment #LessonsLearned",
    
    "Post about a challenge you overcame": 
      "When our team lost a major client last year, it felt like a major setback. However, it forced us to:\n\n- Reevaluate our client onboarding process\n- Create more robust communication channels\n- Develop clearer expectations documents\n\nThat work led to our strongest quarter ever, with client retention now at 96%.\n\nSometimes setbacks are actually setups for greater success. What challenge became an opportunity for you?\n\n#BusinessLessons #Resilience #GrowthMindset",
    
    "Share industry insights from a recent event": 
      "Just returned from the Annual Tech Summit where three trends were on everyone's mind:\n\n1. AI integration is no longer optional - companies without an AI strategy are already behind\n\n2. Privacy regulations are creating new innovation opportunities, not just compliance challenges\n\n3. Remote-first culture is evolving into hybrid collaboration ecosystems\n\nWhat industry shifts are you preparing for this year?\n\n#TechTrends #IndustryInsights #FutureOfWork",
    
    "Offer a professional tip": 
      "A simple productivity technique that transformed my workday:\n\nThe 90-minute focus block.\n\nResearch shows our brains naturally cycle from higher to lower alertness. By working in 90-minute intervals followed by 15-minute breaks, I've increased my output while reducing burnout.\n\nHow it works for me:\n- No notifications\n- One specific task\n- Physical transition during breaks (quick walk, stretch)\n\nWhat's your go-to productivity method?\n\n#ProductivityTips #WorkSmarter #FocusTechniques",
    
    "Ask a thoughtful industry question": 
      "I've been thinking about how AI will transform roles in our industry.\n\nWhile many focus on jobs being eliminated, I'm more interested in how existing roles will be augmented.\n\nFor example, I see content strategists spending less time on distribution logistics and more on narrative development - ultimately delivering more value.\n\nHow do you see your role evolving alongside AI in the next 2-3 years?\n\n#FutureOfWork #AIandCareers #IndustryEvolution"
  };
  
  const generateNewPost = () => {
    // In a real app, this would call an API
    // For this demo, we'll just pick a sample post that corresponds to the daily idea
    setGeneratedPost(samplePosts[dailyPostIdea as keyof typeof samplePosts] || 
      "Generated LinkedIn post based on your industry and expertise...");
    
    toast({
      title: "New post generated",
      description: "Your LinkedIn post has been refreshed with new content.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    toast({
      title: "Copied to clipboard",
      description: "Your LinkedIn post has been copied to clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>LinkedIn Post Generator</CardTitle>
        <CardDescription>
          Create professional, engaging content based on today's idea
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 mb-4 bg-muted rounded-lg border">
          <h3 className="font-medium mb-2">Today's Post Idea:</h3>
          <p className="italic">{dailyPostIdea}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Tailored for: {industry} professionals
          </p>
        </div>
        
        <Textarea
          placeholder="Your generated LinkedIn post will appear here..."
          className="min-h-[200px] mb-4"
          value={generatedPost}
          onChange={(e) => setGeneratedPost(e.target.value)}
        />
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={generateNewPost}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Generate Post
          </Button>
          
          <Button
            variant="outline"
            onClick={copyToClipboard}
            className="flex items-center gap-1"
            disabled={!generatedPost}
          >
            <Copy className="h-4 w-4" />
            Copy to Clipboard
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Pro tip: Customize the generated post with your personal experiences for better engagement.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LinkedInPostGenerator;
