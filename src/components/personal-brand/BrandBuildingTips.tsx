
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const BrandBuildingTips: React.FC = () => {
  const tipCategories = [
    {
      title: "Building Your Thought Leadership",
      description: "Establish yourself as an authority in your field",
      tips: [
        "Identify 2-3 core topics that align with your expertise and goals",
        "Create a content calendar mixing educational, inspirational, and personal content",
        "Engage with industry conversations by commenting thoughtfully on trending topics",
        "Repurpose your best insights across multiple platforms for greater reach"
      ]
    },
    {
      title: "Maximizing PR Opportunities",
      description: "Get featured in publications that matter",
      tips: [
        "Set up daily alerts for relevant HARO and similar PR opportunity platforms",
        "Prepare templated bios and headshots in various formats for quick submissions",
        "Follow up on submissions with additional value if you don't hear back",
        "Build relationships with journalists by engaging with their work beyond pitches"
      ]
    },
    {
      title: "Tracking Your Brand Mentions",
      description: "Monitor and leverage your media appearances",
      tips: [
        "Set up Google Alerts for your name, company, and key topic areas",
        "Create a media portfolio highlighting your best features and quotes",
        "Respond to mentions by thanking publishers and sharing with your network",
        "Analyze which topics generate the most interest to refine your positioning"
      ]
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Personal Brand Building Tips</h2>
        <p className="text-muted-foreground">
          Expert strategies to elevate your professional visibility
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tipCategories.map((category, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandBuildingTips;
