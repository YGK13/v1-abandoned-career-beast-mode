
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiCareerCoach from "@/components/coaching/AiCareerCoach";
import DailyCareerTip from "@/components/coaching/DailyCareerTip";
import DevelopmentPlans from "@/components/coaching/DevelopmentPlans";
import CareerResources from "@/components/coaching/CareerResources";
import LearningCalendar from "@/components/coaching/LearningCalendar";
import CareerPathAnalysis from "@/components/coaching/CareerPathAnalysis";
import { 
  dailyTips, 
  developmentPlans, 
  careerResources, 
  upcomingLearningActivities, 
  completedLearningActivities 
} from "@/data/coachingData";

const Coaching: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Career Coaching</h1>
              <p className="text-muted-foreground mt-1">
                Personalized guidance for your professional growth
              </p>
            </div>
          </div>
        </header>

        {/* Daily Tip Section */}
        <DailyCareerTip tips={dailyTips} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="aicoach" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="aicoach">AI Coach</TabsTrigger>
            <TabsTrigger value="development">Development Plans</TabsTrigger>
            <TabsTrigger value="resources">Career Resources</TabsTrigger>
            <TabsTrigger value="calendar">Learning Calendar</TabsTrigger>
          </TabsList>
          
          {/* AI Coach Tab */}
          <TabsContent value="aicoach">
            <AiCareerCoach />
          </TabsContent>
          
          {/* Development Plans Tab */}
          <TabsContent value="development">
            <DevelopmentPlans plans={developmentPlans} />
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <CareerResources resources={careerResources} />
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <LearningCalendar 
              upcomingActivities={upcomingLearningActivities}
              completedActivities={completedLearningActivities}
            />
          </TabsContent>
        </Tabs>

        {/* Career Path Section */}
        <CareerPathAnalysis />
      </div>
    </Layout>
  );
};

export default Coaching;
