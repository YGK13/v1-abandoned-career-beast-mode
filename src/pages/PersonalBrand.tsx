
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OpportunitiesSection from "@/components/personal-brand/OpportunitiesSection";
import MentionsSection from "@/components/personal-brand/MentionsSection";
import BrandBuildingTips from "@/components/personal-brand/BrandBuildingTips";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

const PersonalBrand = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">Personal Brand</h1>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Daily Updates
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              Build your thought leadership, monitor PR opportunities, and track media mentions
            </p>
          </header>

          <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-1">Your brand monitoring is active</h3>
                  <p className="text-muted-foreground">
                    We're tracking your online mentions in real-time and updating PR opportunities daily to help you grow your influence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="opportunities" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="opportunities">PR Opportunities</TabsTrigger>
              <TabsTrigger value="mentions">Media Mentions</TabsTrigger>
              <TabsTrigger value="tips">Brand Building Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities" className="mt-0">
              <OpportunitiesSection />
            </TabsContent>

            <TabsContent value="mentions" className="mt-0">
              <MentionsSection />
            </TabsContent>
            
            <TabsContent value="tips" className="mt-0">
              <BrandBuildingTips />
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About Personal Brand Management</CardTitle>
              <CardDescription>How we help you build and maintain your professional reputation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Your Personal Brand dashboard combines real-time monitoring of PR opportunities with comprehensive tracking of your media mentions, providing everything you need to build and maintain your professional reputation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">PR Opportunities Feature</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Aggregates opportunities from Qwoted, Featured, Help a B2B Writer, and more</li>
                      <li>Updated daily with the latest requests from journalists and media outlets</li>
                      <li>Personalized filtering to find the most relevant opportunities</li>
                      <li>Direct links to apply and submit your expertise</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Media Mentions Tracking</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Automatically scans the web for mentions of your name and brand</li>
                      <li>Tracks articles, podcasts, videos, and social media mentions</li>
                      <li>Highlights new mentions since your last visit</li>
                      <li>Creates a permanent portfolio of your media appearances</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalBrand;
