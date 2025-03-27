
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";

interface PRIdeaGeneratorProps {
  industry?: string;
  expertise?: string[];
}

const PRIdeaGenerator: React.FC<PRIdeaGeneratorProps> = ({ 
  industry = "Technology",
  expertise = ["Project Management", "Leadership", "Digital Transformation"] 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);

  // Sample PR ideas based on industry and expertise
  const sampleIdeas: Record<string, string[]> = {
    "Technology": [
      "Pitch a guest article to TechCrunch about how your approach to project management has evolved with remote work challenges",
      "Create a short video series on LinkedIn showing 3-minute leadership lessons from your experience in tech transformations",
      "Offer to speak at the upcoming Digital Transformation Summit about a successful case study from your work",
      "Start a weekly LinkedIn newsletter called 'Tech Leadership Digest' featuring insights from your experience",
      "Pitch yourself as a guest for the 'Tech People Leadership' podcast sharing your framework for successful digital transitions"
    ],
    "Finance": [
      "Create an educational series on LinkedIn about financial literacy tips based on your expertise",
      "Offer commentary to financial news outlets about market trends related to your specific focus area",
      "Develop a one-page financial planning template that you share with your network to demonstrate your expertise",
      "Pitch a guest post to Financial Times about how your approach to investment strategy differs from conventional wisdom",
      "Create a series of infographics explaining complex financial concepts in simple terms to showcase your communication skills"
    ],
    "Healthcare": [
      "Create a series of short videos explaining how healthcare leadership differs from other industries and share your unique insights",
      "Pitch a guest article to Healthcare IT News about technology implementation challenges you've overcome",
      "Partner with a healthcare influencer to co-create content that highlights your complementary expertise",
      "Offer to speak at healthcare conferences about patient experience improvements you've implemented",
      "Create a visual case study of a successful transformation project you led and share it across platforms"
    ]
  };

  const generateIdeas = () => {
    setIsGenerating(true);
    
    // Simulate idea generation with a delay
    setTimeout(() => {
      const industryIdeas = sampleIdeas[industry] || sampleIdeas["Technology"];
      
      // Get 3 random unique ideas
      const randomIdeas: string[] = [];
      const ideaIndices = new Set<number>();
      
      while (ideaIndices.size < 3 && ideaIndices.size < industryIdeas.length) {
        const randomIndex = Math.floor(Math.random() * industryIdeas.length);
        if (!ideaIndices.has(randomIndex)) {
          ideaIndices.add(randomIndex);
          randomIdeas.push(industryIdeas[randomIndex]);
        }
      }
      
      setGeneratedIdeas(randomIdeas);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          Personal PR Idea Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Based on your profile:</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Industry:</span> {industry}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Areas of expertise:</span> {expertise.join(", ")}
            </div>
          </div>
        </div>

        {generatedIdeas.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-3">Your Personalized PR Ideas:</h3>
            <ul className="space-y-3">
              {generatedIdeas.map((idea, index) => (
                <li key={index} className="p-3 bg-muted rounded-md text-sm">
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <Button onClick={generateIdeas} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating ideas...
                </>
              ) : (
                "Generate PR Ideas"
              )}
            </Button>
          </div>
        )}
      </CardContent>
      {generatedIdeas.length > 0 && (
        <CardFooter className="border-t pt-4">
          <Button variant="outline" onClick={generateIdeas} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating new ideas...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Ideas
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PRIdeaGenerator;
