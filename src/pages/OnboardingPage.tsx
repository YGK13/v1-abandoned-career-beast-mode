
import React, { useState } from "react";
import Layout from "@/components/Layout";
import OnboardingProcess from "@/components/onboarding/OnboardingProcess";
import OnboardingEmailPreview from "@/components/onboarding/OnboardingEmailPreview";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyTipNotifications from "@/components/notifications/DailyTipNotifications";

const OnboardingPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <Layout>
      <div className="page-container max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Client Onboarding</h1>
          <p className="text-muted-foreground mt-2">
            Our comprehensive 15-day onboarding process helps new subscribers get maximum value
            from their subscription.
          </p>
          <div className="mt-4">
            <Button onClick={() => setShowModal(true)}>
              Preview Onboarding Modal
            </Button>
          </div>
        </header>
        
        <Tabs defaultValue="process" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="process">Onboarding Process</TabsTrigger>
            <TabsTrigger value="emails">Email Sequence</TabsTrigger>
            <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="process">
            <OnboardingProcess />
          </TabsContent>
          
          <TabsContent value="emails">
            <OnboardingEmailPreview />
          </TabsContent>
          
          <TabsContent value="notifications">
            <DailyTipNotifications />
          </TabsContent>
        </Tabs>
        
        <OnboardingModal isOpen={showModal} onOpenChange={setShowModal} />
      </div>
    </Layout>
  );
};

export default OnboardingPage;
