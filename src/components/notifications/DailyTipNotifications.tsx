
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TipCategory as TipCategoryType, NotificationMethod as NotificationMethodType, OnboardingSequence, NotificationType } from "./types";
import TipCategory from "./TipCategory";
import NotificationMethod from "./NotificationMethod";
import OnboardingBanner from "./OnboardingBanner";
import PrivacyNotice from "./PrivacyNotice";

const DailyTipNotifications: React.FC = () => {
  const { toast } = useToast();
  
  // State for tip categories
  const [tipCategories, setTipCategories] = useState<TipCategoryType[]>([
    {
      id: "career",
      name: "Career Growth",
      description: "Tips for advancing your career path and professional development",
      enabled: true
    },
    {
      id: "skills",
      name: "Skills Building",
      description: "Tips to develop both technical and soft skills",
      enabled: true
    },
    {
      id: "networking",
      name: "Networking",
      description: "Tips for building and maintaining professional relationships",
      enabled: false
    },
    {
      id: "mindset",
      name: "Mindset & Motivation",
      description: "Tips to stay motivated and maintain a growth mindset",
      enabled: true
    },
    {
      id: "productivity",
      name: "Productivity",
      description: "Tips to increase efficiency and manage your workflow better",
      enabled: false
    },
    {
      id: "onboarding",
      name: "15-Day Onboarding",
      description: "Special onboarding sequence for new subscribers (first 15 days)",
      enabled: true
    }
  ]);
  
  // State for notification methods
  const [notificationMethods, setNotificationMethods] = useState<NotificationMethodType[]>([
    {
      id: "email",
      name: "Email",
      description: "Receive daily tips via email at 8:00 AM",
      enabled: true
    },
    {
      id: "sms",
      name: "SMS",
      description: "Receive daily tips via text message at 8:00 AM",
      enabled: false
    },
    {
      id: "app",
      name: "In-App",
      description: "See daily tips when you open the app",
      enabled: true
    }
  ]);
  
  // State for onboarding sequence 
  const [onboardingSequence, setOnboardingSequence] = useState<OnboardingSequence>({
    enabled: true,
    daysRemaining: 15,
    lastSent: null
  });
  
  // Toggle tip category
  const toggleTipCategory = (id: NotificationType) => {
    setTipCategories(categories =>
      categories.map(category =>
        category.id === id
          ? { ...category, enabled: !category.enabled }
          : category
      )
    );
  };
  
  // Toggle notification method
  const toggleNotificationMethod = (id: string) => {
    setNotificationMethods(methods =>
      methods.map(method =>
        method.id === id
          ? { ...method, enabled: !method.enabled }
          : method
      )
    );
  };
  
  // Toggle onboarding sequence
  const toggleOnboardingSequence = () => {
    setOnboardingSequence(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
    
    // Also toggle the onboarding category
    toggleTipCategory("onboarding");
  };
  
  // Reset onboarding sequence (for demo purposes)
  const resetOnboardingSequence = () => {
    setOnboardingSequence({
      enabled: true,
      daysRemaining: 15,
      lastSent: null
    });
    
    toast({
      title: "Onboarding sequence reset",
      description: "Your 15-day onboarding sequence has been reset",
      variant: "default"
    });
  };
  
  // Save notification preferences
  const savePreferences = () => {
    // In a real app, this would make an API call to save user preferences
    toast({
      title: "Notification preferences saved",
      description: "Your daily tip notification settings have been updated",
      variant: "default"
    });
  };
  
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
          <div className="rounded-md border p-4 bg-primary/5">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium">15-Minute Daily Career Boost</h3>
                <p className="text-sm text-muted-foreground">
                  Receive actionable tips each day that take just 15 minutes to implement but can 
                  significantly impact your career growth over time.
                </p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                <Check className="h-3 w-3 mr-1" /> Active
              </Badge>
            </div>
          </div>
          
          {/* Onboarding Sequence Banner */}
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
              {tipCategories.map(category => (
                <TipCategory 
                  key={category.id}
                  category={category}
                  onToggle={() => toggleTipCategory(category.id)}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="delivery" className="space-y-4">
              {notificationMethods.map(method => (
                <NotificationMethod
                  key={method.id}
                  method={method}
                  onToggle={() => toggleNotificationMethod(method.id)}
                />
              ))}
              
              <PrivacyNotice />
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
