
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CopyIcon, LinkedinIcon, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LinkedInPostGeneratorProps {
  dailyPostIdea: string;
  industry?: string;
}

const LinkedInPostGenerator: React.FC<LinkedInPostGeneratorProps> = ({ dailyPostIdea, industry = "Technology" }) => {
  const [generatedPost, setGeneratedPost] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Sample generated posts based on industry
  const samplePosts: Record<string, string[]> = {
    "Technology": [
      "I've been reflecting on how AI is transforming our work landscape. Instead of fearing replacement, I'm finding that professionals who embrace AI as a collaborative tool are seeing remarkable productivity gains.\n\nThree ways I've integrated AI into my workflow this month:\n\n1. Using it to draft initial communications that I then personalize\n2. Analyzing data patterns that would have taken hours manually\n3. Generating creative alternatives when I'm stuck on a problem\n\nThe key isn't to let AI do your job, but to let it handle the routine aspects so you can focus on the uniquely human elements: strategy, relationship-building, and creative problem-solving.\n\nHow are you incorporating AI into your professional toolkit? Let's share strategies that are working!\n\n#AIInnovation #FutureOfWork #ProductivityHacks #ProfessionalDevelopment",
      "Just wrapped up a fascinating project where we implemented a microservices architecture that reduced our deployment failures by 72%.\n\nThe biggest lesson wasn't technical—it was about communication. Breaking down silos between development and operations teams created a shared language and accountability structure that transformed our delivery pipeline.\n\nTakeaways worth sharing:\n\n• Cross-functional standups create immediate alignment\n• Shared metrics drive collaborative behavior\n• Documentation isn't overhead—it's an investment\n\nWhat communication practices have transformed your technical implementations?\n\n#SoftwareEngineering #DevOps #TechLeadership #ContinuousDelivery"
    ],
    "Finance": [
      "Market volatility creates both challenges and opportunities. After analyzing last quarter's performance across my client portfolios, I've noticed a fascinating pattern emerging in sustainable investments.\n\nCompanies with strong ESG frameworks are demonstrating greater resilience during economic uncertainty—not just in reputation, but in tangible financial performance.\n\nThree factors seem to be driving this trend:\n\n1. Better risk management practices\n2. More loyal customer base\n3. Greater operational efficiency\n\nI'm curious: are you seeing similar patterns in your investment observations?\n\n#SustainableInvesting #FinancialAnalysis #ESGInvesting #MarketTrends",
      "Financial literacy remains one of the most important skills we don't formally teach. Today I had the privilege of speaking to 50 high school students about fundamentals of personal finance.\n\nWhat struck me most was how engaged they became when discussing compound interest—not as an abstract concept, but as a tangible tool for their future.\n\nIf you're in finance, I encourage you to find opportunities to share your knowledge. It's one of the most rewarding ways to use your expertise.\n\n#FinancialLiteracy #PersonalFinance #GivingBack #FinancialEducation"
    ],
    "Healthcare": [
      "Patient experience isn't separate from clinical outcomes—it's intrinsically linked to them.\n\nOur recent initiative to redesign our patient intake process didn't just improve satisfaction scores by 35%, it also led to more accurate diagnoses through better information gathering.\n\nThe key insight: treating empathetic communication as a clinical skill rather than a "soft" skill.\n\nBy training our team to listen for both explicit and implicit information, we're catching concerns earlier and building stronger therapeutic relationships.\n\nWhat patient experience innovations are you seeing make a difference in clinical outcomes?\n\n#PatientExperience #HealthcareInnovation #ClinicalExcellence #HealthcareLeadership",
      "The integration of AI in diagnostic imaging is transforming how we detect early-stage conditions. I've been piloting a system that serves as a "second set of eyes" for radiologists, and the results are promising.\n\nWhat's fascinating isn't just the algorithm's accuracy, but how it's changing the workflow of our specialists:\n\n• Less time spent on routine scans\n• More attention to complex cases\n• Reduced cognitive fatigue at end of shifts\n\nThe future isn't AI replacing diagnosticians—it's augmented intelligence elevating the entire field.\n\n#MedicalTechnology #DiagnosticImaging #HealthTech #AIinHealthcare"
    ]
  };

  const generatePost = () => {
    setIsGenerating(true);
    
    // Simulate post generation with a delay
    setTimeout(() => {
      const industryPosts = samplePosts[industry] || samplePosts["Technology"];
      const randomIndex = Math.floor(Math.random() * industryPosts.length);
      setGeneratedPost(industryPosts[randomIndex]);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost);
      toast({
        title: "Copied to clipboard",
        description: "Your LinkedIn post has been copied to clipboard",
        duration: 3000,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkedinIcon className="h-5 w-5 text-blue-600" />
          LinkedIn Post Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Today's Post Idea:</h3>
          <p className="text-muted-foreground p-3 bg-muted rounded-md text-sm">{dailyPostIdea}</p>
        </div>

        {generatedPost ? (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Generated Post:</h3>
            <Textarea 
              value={generatedPost} 
              onChange={(e) => setGeneratedPost(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <Button onClick={generatePost} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate LinkedIn Post"
              )}
            </Button>
          </div>
        )}
      </CardContent>
      {generatedPost && (
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={generatePost} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </>
            )}
          </Button>
          <Button variant="secondary" onClick={copyToClipboard}>
            <CopyIcon className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LinkedInPostGenerator;
