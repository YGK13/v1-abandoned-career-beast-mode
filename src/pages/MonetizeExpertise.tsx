
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpertPlatformCard from "@/components/monetize/ExpertPlatformCard";
import DailyPlatformTip from "@/components/monetize/DailyPlatformTip";
import { expertPlatforms } from "@/data/expertPlatformsData";
import { Platform } from "@/components/monetize/DailyPlatformTip";

const MonetizeExpertise = () => {
  // Convert the first expertPlatform to a Platform type
  const platformTip: Platform = {
    id: expertPlatforms[0]?.id || "daily-tip",
    name: expertPlatforms[0]?.name || "Expert Platform",
    description: expertPlatforms[0]?.description || "Tips to grow your online presence",
    url: expertPlatforms[0]?.url || "#",
    logo: expertPlatforms[0]?.logo || "/placeholder.svg"
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Monetize Your Expertise</h1>
        <p className="text-muted-foreground mb-8">
          Platforms and strategies to turn your knowledge into income streams
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="platforms" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="platforms">Expert Platforms</TabsTrigger>
                <TabsTrigger value="courses">Create Courses</TabsTrigger>
                <TabsTrigger value="consulting">Consulting</TabsTrigger>
              </TabsList>
              
              <TabsContent value="platforms" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {expertPlatforms.map((platform: any) => (
                    <ExpertPlatformCard key={platform.id} platform={platform} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="courses">
                <div className="bg-muted/30 border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Course Creation Guide</h3>
                  <p className="mb-4">
                    Creating and selling online courses is one of the most scalable ways to monetize your expertise.
                  </p>
                  
                  {/* Placeholder for course creation content */}
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">1. Choose Your Course Topic</h4>
                      <p className="text-sm text-muted-foreground">Select a topic you're knowledgeable about and that has market demand.</p>
                    </div>
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">2. Plan Your Curriculum</h4>
                      <p className="text-sm text-muted-foreground">Structure your knowledge into modules and lessons that follow a logical progression.</p>
                    </div>
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">3. Create Engaging Content</h4>
                      <p className="text-sm text-muted-foreground">Develop videos, slides, worksheets, and other materials to engage different learning styles.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="consulting">
                <div className="bg-muted/30 border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Consulting Services Blueprint</h3>
                  <p className="mb-4">
                    Offer your expertise directly to clients through consulting services.
                  </p>
                  
                  {/* Placeholder for consulting content */}
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">1. Define Your Consulting Offering</h4>
                      <p className="text-sm text-muted-foreground">Clearly articulate what problems you solve and the value you provide to clients.</p>
                    </div>
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">2. Set Your Pricing Strategy</h4>
                      <p className="text-sm text-muted-foreground">Determine hourly rates, package pricing, or retainer models that reflect your value.</p>
                    </div>
                    <div className="border rounded-md p-4 bg-background">
                      <h4 className="font-medium">3. Create Client Acquisition Systems</h4>
                      <p className="text-sm text-muted-foreground">Develop a repeatable process for finding and converting prospects into clients.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <DailyPlatformTip 
              platform={platformTip}
              date={new Date().toISOString()}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonetizeExpertise;
