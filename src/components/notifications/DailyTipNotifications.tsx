
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Check, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types for our tips notification system
type NotificationType = "career" | "skills" | "networking" | "mindset" | "productivity";

interface TipCategory {
  id: NotificationType;
  name: string;
  description: string;
  enabled: boolean;
}

interface NotificationMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const DailyTipNotifications: React.FC = () => {
  const { toast } = useToast();
  
  // State for tip categories
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
    }
  ]);
  
  // State for notification methods
  const [notificationMethods, setNotificationMethods] = useState<NotificationMethod[]>([
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
          
          <Tabs defaultValue="categories">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="categories">Tip Categories</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Methods</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="space-y-4">
              {tipCategories.map(category => (
                <div 
                  key={category.id}
                  className="flex items-center justify-between rounded-md border p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <Switch
                    checked={category.enabled}
                    onCheckedChange={() => toggleTipCategory(category.id)}
                  />
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="delivery" className="space-y-4">
              {notificationMethods.map(method => (
                <div 
                  key={method.id}
                  className="flex items-center justify-between rounded-md border p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <Switch
                    checked={method.enabled}
                    onCheckedChange={() => toggleNotificationMethod(method.id)}
                  />
                </div>
              ))}
              
              <div className="rounded-md border p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Privacy Notice</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      We value your privacy. Your contact information is only used for sending 
                      the career tips you've requested and will never be shared with third parties.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You can opt out at any time by disabling all notification methods.
                    </p>
                  </div>
                </div>
              </div>
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
