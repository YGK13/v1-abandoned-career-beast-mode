
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PROpportunityCard from "@/components/promote/PROpportunityCard";
import PRIdeaGenerator from "@/components/promote/PRIdeaGenerator";
import LinkedInPostGenerator from "@/components/promote/LinkedInPostGenerator";
import { getPROpportunities, generateDailyPostIdea } from "@/data/prOpportunitiesData";

const PromoteYourself = () => {
  const [prOpportunities] = useState(() => getPROpportunities());
  const [dailyPostIdea] = useState(() => generateDailyPostIdea());
  
  // Mock data from "connected LinkedIn profile"
  const [profileData] = useState({
    industry: "Technology",
    expertise: ["Project Management", "Leadership", "Digital Transformation"],
    yearsExperience: 8
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Promote Yourself</h1>
            <p className="text-muted-foreground">
              Discover PR opportunities, generate content ideas, and enhance your professional visibility
            </p>
          </header>

          <Tabs defaultValue="opportunities" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="opportunities">PR Opportunities</TabsTrigger>
              <TabsTrigger value="ideas">PR Idea Generator</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn Post Generator</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities">
              <div className="grid grid-cols-1 gap-6 mb-6">
                {prOpportunities.map((opportunity) => (
                  <PROpportunityCard 
                    key={opportunity.id} 
                    opportunity={opportunity} 
                  />
                ))}
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg border mt-8">
                <h2 className="text-xl font-semibold mb-3">How to Maximize PR Opportunities</h2>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Respond promptly to opportunities that align with your expertise</li>
                  <li>Prepare a concise professional bio that highlights your unique perspective</li>
                  <li>Follow up professionally if you don't hear back initially</li>
                  <li>Share your published contributions across your professional networks</li>
                  <li>Keep a portfolio of your media appearances and contributions</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="ideas">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <PRIdeaGenerator 
                  industry={profileData.industry}
                  expertise={profileData.expertise}
                />
                
                <div className="bg-muted/30 p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-3">Effective Self-Promotion Strategies</h2>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li><strong>Be consistent</strong> - Regular content creation builds audience expectations</li>
                    <li><strong>Add value</strong> - Focus on sharing insights that help others, not just self-promotion</li>
                    <li><strong>Tell stories</strong> - Personal experiences are more memorable than abstract concepts</li>
                    <li><strong>Engage authentically</strong> - Respond to comments and build relationships</li>
                    <li><strong>Cross-promote</strong> - Share your content across multiple platforms</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="linkedin">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <LinkedInPostGenerator 
                  dailyPostIdea={dailyPostIdea}
                  industry={profileData.industry}
                />
                
                <div className="bg-muted/30 p-6 rounded-lg border mt-8">
                  <h2 className="text-xl font-semibold mb-3">LinkedIn Post Best Practices</h2>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li><strong>Start strong</strong> - The first 3 lines are visible before "see more"</li>
                    <li><strong>Use white space</strong> - Break up text for easier reading</li>
                    <li><strong>Include a call to action</strong> - Ask for comments, shares or opinions</li>
                    <li><strong>Add 3-5 relevant hashtags</strong> - Helps with discoverability</li>
                    <li><strong>Engage with comments</strong> - Respond to build relationships</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PromoteYourself;
