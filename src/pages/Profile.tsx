
import React from "react";
import Layout from "@/components/Layout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import CareerSummary from "@/components/profile/CareerSummary";
import SkillsRadarChart from "@/components/profile/SkillsRadarChart";
import NextSteps from "@/components/profile/NextSteps";
import OpportunityCards from "@/components/profile/OpportunityCards";
import CareerTimeline from "@/components/profile/CareerTimeline";
import RecentActivity from "@/components/profile/RecentActivity";
import { useProfileData } from "@/hooks/useProfileData";
import LoadingState from "@/components/coaching/career-path/LoadingState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { data, isLoading, error } = useProfileData();

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <LoadingState />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-xl font-bold">Error loading profile data</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader 
          name={data.name}
          title={data.title}
          company={data.company}
          profileImage={data.profileImage}
          profileScore={data.profileScore}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <CareerSummary 
              currentSalary={data.currentSalary}
              targetSalary={data.targetSalary}
              nextReview={data.nextReview}
              yearsExperience={data.yearsExperience}
              industry={data.industry}
            />
            
            <Tabs defaultValue="timeline">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Career Timeline</TabsTrigger>
                <TabsTrigger value="skills">Skills Radar</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="timeline" className="p-4 bg-card rounded-md mt-2">
                <CareerTimeline milestones={data.careerMilestones} />
              </TabsContent>
              <TabsContent value="skills" className="p-4 bg-card rounded-md mt-2">
                <SkillsRadarChart skills={data.skills} />
              </TabsContent>
              <TabsContent value="activity" className="p-4 bg-card rounded-md mt-2">
                <RecentActivity activities={data.recentActivities} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <NextSteps actionItems={data.actionItems} />
            <OpportunityCards opportunities={data.opportunities} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
