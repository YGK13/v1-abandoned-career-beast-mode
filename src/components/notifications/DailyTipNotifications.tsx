
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { useNotificationState } from "./useNotificationState";
import StatusBanner from "./StatusBanner";
import OnboardingBanner from "./OnboardingBanner";
import CategoryList from "./CategoryList";
import DeliveryMethodList from "./DeliveryMethodList";

const DailyTipNotifications: React.FC = () => {
  const {
    tipCategories,
    notificationMethods,
    onboardingSequence,
    toggleTipCategory,
    toggleNotificationMethod,
    updateNotificationTime,
    toggleOnboardingSequence,
    resetOnboardingSequence,
    savePreferences
  } = useNotificationState();
  
  return (
    <Card>
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Daily Career Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <StatusBanner />
          
          <OnboardingBanner 
            onboardingSequence={onboardingSequence}
            onToggle={toggleOnboardingSequence}
            onReset={resetOnboardingSequence}
          />
          
          <Tabs defaultValue="categories">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="categories">Tip Categories</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Methods</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="space-y-4">
              <CategoryList 
                categories={tipCategories}
                onToggle={toggleTipCategory}
              />
            </TabsContent>
            
            <TabsContent value="delivery" className="space-y-4">
              <DeliveryMethodList
                methods={notificationMethods}
                onToggle={toggleNotificationMethod}
                onTimeChange={updateNotificationTime}
              />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end pt-2">
            <Button onClick={savePreferences}>
              Save Preferences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyTipNotifications;
