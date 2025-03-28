
import { useState } from "react";
import { TipCategory, NotificationMethod, OnboardingSequence, NotificationType, TimePreference } from "./types";
import { useToast } from "@/hooks/use-toast";

export function useNotificationState() {
  const { toast } = useToast();
  
  const [tipCategories, setTipCategories] = useState<TipCategory[]>([
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
  
  const [notificationMethods, setNotificationMethods] = useState<NotificationMethod[]>([
    {
      id: "email",
      name: "Email",
      description: "Receive daily tips via email",
      enabled: true,
      timePreference: "morning"
    },
    {
      id: "sms",
      name: "SMS",
      description: "Receive daily tips via text message",
      enabled: false,
      timePreference: "morning"
    },
    {
      id: "app",
      name: "In-App",
      description: "See daily tips when you open the app",
      enabled: true,
      timePreference: "morning"
    }
  ]);
  
  const [onboardingSequence, setOnboardingSequence] = useState<OnboardingSequence>({
    enabled: true,
    daysRemaining: 15,
    lastSent: null
  });
  
  const toggleTipCategory = (id: NotificationType) => {
    setTipCategories(categories =>
      categories.map(category =>
        category.id === id
          ? { ...category, enabled: !category.enabled }
          : category
      )
    );
  };
  
  const toggleNotificationMethod = (id: string) => {
    setNotificationMethods(methods =>
      methods.map(method =>
        method.id === id
          ? { ...method, enabled: !method.enabled }
          : method
      )
    );
  };
  
  const updateNotificationTime = (id: string, timePreference: TimePreference) => {
    setNotificationMethods(methods =>
      methods.map(method =>
        method.id === id
          ? { ...method, timePreference }
          : method
      )
    );
  };
  
  const toggleOnboardingSequence = () => {
    setOnboardingSequence(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
    
    toggleTipCategory("onboarding");
  };
  
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
  
  const savePreferences = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your daily tip notification settings have been updated",
      variant: "default"
    });
  };
  
  return {
    tipCategories,
    notificationMethods,
    onboardingSequence,
    toggleTipCategory,
    toggleNotificationMethod,
    updateNotificationTime,
    toggleOnboardingSequence,
    resetOnboardingSequence,
    savePreferences
  };
}
