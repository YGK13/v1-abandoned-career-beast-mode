import React from "react";
import { Linkedin, Users, Image, Award, MessageSquare, Globe } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const LinkedInProfile: React.FC = () => {
  // Mock data - would be dynamically loaded from the user's synced profile
  const profileStrength = 72;
  const profileTips = [
    {
      title: "Professional Headline",
      description: "Your headline should be descriptive and include keywords relevant to your industry.",
      icon: Award,
      status: "good",
      suggestion: "Add 2-3 more industry-specific keywords to increase visibility."
    },
    {
      title: "Profile Photo",
      description: "A professional headshot increases profile views by up to 14x.",
      icon: Image,
      status: "warning",
      suggestion: "Update your photo - it appears to be more than 2 years old."
    },
    {
      title: "About Section",
      description: "Your summary should tell your professional story concisely.",
      icon: MessageSquare,
      status: "warning",
      suggestion: "Your summary is too short. Aim for 3-5 paragraphs highlighting achievements."
    },
    {
      title: "Network Connections",
      description: "A strong network increases your visibility and opportunities.",
      icon: Users,
      status: "good",
      suggestion: "Consider reaching out to 5-10 new connections in your target industry weekly."
    },
    {
      title: "Content Engagement",
      description: "Regular engagement helps maintain visibility in your network.",
      icon: Globe,
      status: "danger",
      suggestion: "You haven't posted or commented in 3+ months. Plan to engage at least weekly."
    }
  ];

  return (
    <DashboardCard className="mb-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#0a66c2]/20 flex items-center justify-center">
            <Linkedin size={24} className="text-[#0a66c2]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">LinkedIn Profile Assessment</h3>
            <p className="text-sm text-muted-foreground">Based on your synced profile data</p>
          </div>
          <Button variant="outline" size="sm">
            Sync Profile
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Progress value={profileStrength} variant="circular" size="md" />
          <p className="text-xs text-muted-foreground mt-2">
            Your profile is <span className="font-medium">performing better than 64%</span> of profiles in your industry
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Personalized Improvement Suggestions</h4>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {profileTips.map((tip, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  tip.status === 'good' 
                    ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30' 
                    : tip.status === 'warning'
                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800/30'
                    : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800/30'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tip.status === 'good' 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : tip.status === 'warning'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <tip.icon size={16} className={
                      tip.status === 'good' 
                        ? 'text-green-600 dark:text-green-400' 
                        : tip.status === 'warning'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    } />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">{tip.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                  </div>
                </div>
                <div className="mt-3 pl-11">
                  <p className="text-xs font-medium">Suggestion:</p>
                  <p className="text-xs">{tip.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Additional Best Practices</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-xs text-primary font-medium">1</span>
              </div>
              <span>Use a custom URL that includes your name for better searchability</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-xs text-primary font-medium">2</span>
              </div>
              <span>Include metrics and quantifiable achievements in your experience section</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-xs text-primary font-medium">3</span>
              </div>
              <span>Request recommendations from colleagues and clients to build credibility</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-xs text-primary font-medium">4</span>
              </div>
              <span>Follow relevant industry influencers and companies to stay informed</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="text-xs text-primary font-medium">5</span>
              </div>
              <span>Share industry articles with your own insights to demonstrate expertise</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button>
            Optimize My Profile
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default LinkedInProfile;
