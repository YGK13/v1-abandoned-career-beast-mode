
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, MessageSquare, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface TipCategory {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

const DailyTipNotifications: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = useState<boolean>(false);
  const [smsEnabled, setSmsEnabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [categories, setCategories] = useState<TipCategory[]>([
    { 
      id: "networking", 
      name: "Networking", 
      enabled: true, 
      description: "Tips for building and maintaining your professional network"
    },
    { 
      id: "skills", 
      name: "Skill Development", 
      enabled: true, 
      description: "Quick actions to improve your professional skills"
    },
    { 
      id: "branding", 
      name: "Personal Brand", 
      enabled: true, 
      description: "Ways to enhance your professional reputation"
    },
    { 
      id: "job-search", 
      name: "Job Search", 
      enabled: false, 
      description: "Strategies for finding and securing your next role"
    },
    { 
      id: "productivity", 
      name: "Productivity", 
      enabled: true, 
      description: "Methods to maximize your efficiency and output"
    }
  ]);
  const [preferredTime, setPreferredTime] = useState<string>("08:00");
  const [frequency, setFrequency] = useState<string>("daily");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const { toast } = useToast();

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('tipNotificationSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setEmailEnabled(settings.emailEnabled || false);
      setSmsEnabled(settings.smsEnabled || false);
      setEmail(settings.email || "");
      setPhoneNumber(settings.phoneNumber || "");
      if (settings.categories) setCategories(settings.categories);
      setPreferredTime(settings.preferredTime || "08:00");
      setFrequency(settings.frequency || "daily");
      setIsSubscribed(settings.isSubscribed || false);
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    const settings = {
      emailEnabled,
      smsEnabled,
      email,
      phoneNumber,
      categories,
      preferredTime,
      frequency,
      isSubscribed
    };
    localStorage.setItem('tipNotificationSettings', JSON.stringify(settings));
  }, [emailEnabled, smsEnabled, email, phoneNumber, categories, preferredTime, frequency, isSubscribed]);

  const toggleCategory = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, enabled: !cat.enabled } : cat
    ));
  };

  const handleSubscribe = () => {
    // Validate inputs
    if (emailEnabled && !validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (smsEnabled && !validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }

    if (!emailEnabled && !smsEnabled) {
      toast({
        title: "No notification method selected",
        description: "Please enable either email or SMS notifications.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call an API to subscribe the user
    setTimeout(() => {
      setIsSubscribed(true);
      toast({
        title: "Successfully Subscribed!",
        description: `You will receive ${frequency} career tips at ${format(new Date(`2022-01-01T${preferredTime}`), 'h:mm a')}.`,
        variant: "success"
      });
    }, 1000);
  };

  const handleUnsubscribe = () => {
    // In a real app, this would call an API to unsubscribe the user
    setTimeout(() => {
      setIsSubscribed(false);
      toast({
        title: "Unsubscribed",
        description: "You have been unsubscribed from daily tips.",
        variant: "default"
      });
    }, 1000);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    return /^\+?[0-9]{10,15}$/.test(phoneNumber.replace(/\s+/g, ''));
  };

  const previewTip = () => {
    const tips = [
      "Connect with one new person in your industry today. Spend just 5 minutes crafting a personalized connection request.",
      "Block 15 minutes to learn one new feature of a tool you use daily. Small improvements compound over time.",
      "Update one section of your LinkedIn profile with recent accomplishments. This keeps your brand current.",
      "Create a 'success file' to collect positive feedback. Spend 5 minutes adding recent wins and testimonials.",
      "Try the 'two-minute rule' today: if a task takes less than two minutes, do it immediately rather than scheduling it for later."
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    toast({
      title: "Today's Career Tip",
      description: randomTip,
      variant: "default",
      duration: 5000
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Beast Mode Career Tips
        </CardTitle>
        <CardDescription>
          Receive daily 15-minute actions to accelerate your career growth
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
            <TabsTrigger value="categories">Tip Categories</TabsTrigger>
            <TabsTrigger value="preview">Preview Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Delivery Methods</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailEnabled}
                    onCheckedChange={setEmailEnabled}
                  />
                </div>
                
                {emailEnabled && (
                  <div className="pl-6 border-l-2 border-muted space-y-2">
                    <Label htmlFor="email-input">Email Address</Label>
                    <Input 
                      id="email-input"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="sms-notifications" className="flex-1">SMS Notifications</Label>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={smsEnabled}
                    onCheckedChange={setSmsEnabled}
                  />
                </div>
                
                {smsEnabled && (
                  <div className="pl-6 border-l-2 border-muted space-y-2">
                    <Label htmlFor="phone-input">Phone Number</Label>
                    <Input 
                      id="phone-input"
                      type="tel"
                      placeholder="+1 (123) 456-7890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Standard messaging rates may apply
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Timing Preferences</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="preferred-time">Preferred Time</Label>
                  </div>
                  <Input 
                    id="preferred-time"
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tips will be delivered at approximately this time in your local timezone
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <select
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="daily">Daily (Monday-Friday)</option>
                    <option value="weekdays">Weekdays only</option>
                    <option value="monday-wednesday-friday">Monday, Wednesday, Friday</option>
                    <option value="weekly">Weekly (Monday)</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Choose Categories You're Interested In</h3>
              <p className="text-sm text-muted-foreground">
                Your daily tips will be selected from these categories
              </p>
              
              <div className="space-y-3">
                {categories.map(category => (
                  <div key={category.id} className="flex items-start space-x-3 p-3 border rounded-md">
                    <Switch 
                      id={`category-${category.id}`} 
                      checked={category.enabled}
                      onCheckedChange={() => toggleCategory(category.id)}
                      className="mt-1"
                    />
                    <div>
                      <Label 
                        htmlFor={`category-${category.id}`}
                        className="font-medium"
                      >
                        {category.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Sample Daily Tip</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div className="flex items-center">
                    <div className="bg-primary/10 text-primary p-2 rounded-full">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Today's Career Action (15 min)</p>
                      <p className="text-xs text-muted-foreground">Networking Category</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    Identify one person in your network you haven't spoken to in over 3 months. 
                    Send them a brief message with a specific question related to their expertise. 
                    This keeps your connections warm and can lead to unexpected opportunities.
                  </p>
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Delivered at {format(new Date(`2022-01-01T${preferredTime}`), 'h:mm a')} | 
                    <button className="text-primary ml-1 hover:underline">
                      Mark as completed
                    </button>
                  </div>
                </div>
                
                <Button variant="outline" onClick={previewTip} className="w-full mt-4">
                  Show me another random tip
                </Button>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">What to Expect</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Quick, actionable tips you can implement in 15 minutes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Delivered at your preferred time and frequency</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Varied categories to help with all aspects of career growth</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Ability to track completed tips and measure progress</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-400">This is a demo</p>
                    <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                      In a production environment, these notifications would be sent through an integrated email 
                      and SMS service. User preferences would be stored in a database.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 border-t pt-6">
        <div className="text-sm">
          {isSubscribed ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Currently subscribed</span>
            </div>
          ) : (
            <p className="text-muted-foreground">Not currently subscribed</p>
          )}
        </div>
        
        {isSubscribed ? (
          <Button variant="outline" onClick={handleUnsubscribe}>
            Unsubscribe
          </Button>
        ) : (
          <Button onClick={handleSubscribe}>
            <Bell className="mr-2 h-4 w-4" />
            Subscribe to Career Tips
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyTipNotifications;
