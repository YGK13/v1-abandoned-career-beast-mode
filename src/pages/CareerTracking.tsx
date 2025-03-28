
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccomplishmentTracker from "@/components/tracking/AccomplishmentTracker";
import DailyTipNotifications from "@/components/notifications/DailyTipNotifications";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Trophy, Calendar, Bell, Target } from "lucide-react";

const CareerTracking: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Career Tracking</h1>
            <p className="text-muted-foreground">
              Track your career progress and get daily actionable tips
            </p>
          </div>
        </div>

        <Tabs defaultValue="accomplishments" className="w-full mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="accomplishments" className="flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              <span>Accomplishments</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span>Daily Tips</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="accomplishments">
            <AccomplishmentTracker />
          </TabsContent>
          
          <TabsContent value="notifications">
            <DailyTipNotifications />
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Career Progress Reports
                </CardTitle>
                <CardDescription>
                  Comprehensive analytics of your career journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Weekly Wrap-Up</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get a summarized view of your weekly accomplishments every Friday.
                      See what you've achieved and what's still pending.
                    </p>
                    <div className="flex justify-between items-center pt-2 text-sm">
                      <span>Next report: Friday</span>
                      <span className="text-primary">Automated</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Monthly Achievement Summary</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A detailed analysis of your monthly progress with charts and insights on
                      your growth areas and accomplishments.
                    </p>
                    <div className="flex justify-between items-center pt-2 text-sm">
                      <span>Next report: End of month</span>
                      <span className="text-primary">Automated</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Quarterly Performance Analysis</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Deep dive into your quarterly achievements with trend analysis
                      and personalized growth recommendations.
                    </p>
                    <div className="flex justify-between items-center pt-2 text-sm">
                      <span>Next report: End of quarter</span>
                      <span className="text-primary">Automated</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Annual Career Wrap</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A Spotify Wrap-style year in review of your career achievements,
                      skills gained, and growth journey.
                    </p>
                    <div className="flex justify-between items-center pt-2 text-sm">
                      <span>Next report: December</span>
                      <span className="text-primary">Automated</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-md">
                  <p className="text-center text-sm text-muted-foreground">
                    All reports are automatically generated based on your tracked accomplishments
                    and can be delivered to your email or viewed in this dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CareerTracking;
