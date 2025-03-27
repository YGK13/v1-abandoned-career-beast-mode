
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, CheckCircle, RefreshCw } from "lucide-react";
import ExpertPlatformCard from "@/components/monetize/ExpertPlatformCard";
import DailyPlatformTip from "@/components/monetize/DailyPlatformTip";
import BioGenerator from "@/components/monetize/BioGenerator";
import { 
  getRandomPlatform, 
  getInitialPlatforms, 
  getAllPlatforms, 
  getRecentlyVerifiedPlatforms 
} from "@/data/expertPlatformsData";
import { Badge } from "@/components/ui/badge";

const MonetizeExpertise = () => {
  const [date] = useState(() => new Date().toLocaleDateString());
  const [dailyPlatform] = useState(() => getRandomPlatform());
  const [initialPlatforms] = useState(() => getInitialPlatforms());
  const [allPlatforms] = useState(() => getAllPlatforms());
  const [recentlyVerifiedPlatforms, setRecentlyVerifiedPlatforms] = useState(() => getRecentlyVerifiedPlatforms());
  const [lastVerified] = useState(() => new Date().toLocaleDateString());

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Monetize Your Expertise</h1>
            <p className="text-muted-foreground">
              Discover platforms where you can leverage your professional expertise for consulting opportunities
            </p>
            <div className="flex items-center mt-3">
              <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs">All platforms verified active as of {lastVerified}</span>
              </Badge>
              <Button variant="ghost" size="sm" className="text-xs ml-2 h-7">
                <RefreshCw className="h-3 w-3 mr-1" /> Refresh Verification
              </Button>
            </div>
          </header>

          <DailyPlatformTip platform={dailyPlatform} date={date} />

          <Tabs defaultValue="featured" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="featured">Featured Platforms</TabsTrigger>
              <TabsTrigger value="recently-verified">Recently Verified</TabsTrigger>
              <TabsTrigger value="all">All Platforms</TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {initialPlatforms.map((platform) => (
                  <ExpertPlatformCard 
                    key={platform.id} 
                    platform={platform} 
                    featured={platform.id === initialPlatforms[0].id}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline" asChild>
                  <Link to="#" className="flex items-center gap-1" onClick={(e) => {
                    e.preventDefault();
                    const tabElement = document.querySelector('[data-value="all"]');
                    if (tabElement instanceof HTMLElement) {
                      tabElement.click();
                    }
                  }}>
                    View all platforms <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recently-verified">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyVerifiedPlatforms.map((platform) => (
                  <ExpertPlatformCard 
                    key={platform.id} 
                    platform={platform} 
                    featured={platform.id === dailyPlatform.id}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPlatforms.map((platform) => (
                  <ExpertPlatformCard 
                    key={platform.id} 
                    platform={platform} 
                    featured={platform.id === dailyPlatform.id}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Bio Generator */}
          <BioGenerator />
          
          <div className="bg-muted/30 p-6 rounded-lg border mt-12">
            <h2 className="text-xl font-semibold mb-3">How to Maximize Your Expert Consulting Opportunities</h2>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Create a compelling profile that highlights specific accomplishments and expertise</li>
              <li>Develop a clear rate structure based on industry standards and your experience level</li>
              <li>Prepare concise talking points on your areas of specialization</li>
              <li>Be responsive to consultation requests to build your reputation</li>
              <li>Start with 2-3 platforms and expand once you've established a track record</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonetizeExpertise;
