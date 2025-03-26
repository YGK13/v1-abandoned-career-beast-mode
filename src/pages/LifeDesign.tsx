
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, Heart, Brain, MessageSquare, Coffee, PenTool, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import DailyLifeDesignTip from "@/components/lifedesign/DailyLifeDesignTip";
import ConversationSection from "@/components/lifedesign/ConversationSection";

const LifeDesign: React.FC = () => {
  // Mock data for the 4 conversations
  const conversations = [
    {
      id: 1,
      title: "Conversation with Self",
      description: "Building self-awareness and personal growth",
      icon: Heart,
      color: "bg-rose-100 text-rose-700",
      badgeColor: "bg-rose-100 border-rose-200 text-rose-700",
    },
    {
      id: 2,
      title: "Conversation with Others",
      description: "Improving communication and relationships",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
      badgeColor: "bg-blue-100 border-blue-200 text-blue-700",
    },
    {
      id: 3,
      title: "Conversation with Environment",
      description: "Creating optimal conditions for success",
      icon: Coffee,
      color: "bg-amber-100 text-amber-700",
      badgeColor: "bg-amber-100 border-amber-200 text-amber-700",
    },
    {
      id: 4,
      title: "Conversation with Work",
      description: "Mastering your craft and career",
      icon: PenTool,
      color: "bg-emerald-100 text-emerald-700",
      badgeColor: "bg-emerald-100 border-emerald-200 text-emerald-700",
    }
  ];

  // Sample tips from the book
  const allTips = [
    // Conversation with Self
    {
      id: 1,
      conversation: 1,
      quote: "Your identity is not fixed but constantly evolving through your choices.",
      tip: "Schedule 10 minutes each morning to reflect on your values and how they align with your daily actions.",
      category: "Identity",
      source: "Volume 1: Be Your Own Commander-in-Chief",
    },
    {
      id: 2,
      conversation: 1,
      quote: "Mental models are the lenses through which we interpret reality.",
      tip: "Identify one limiting belief you hold and challenge it by seeking evidence to the contrary.",
      category: "Mental Models",
      source: "Volume 1: Be Your Own Commander-in-Chief",
    },
    
    // Conversation with Others
    {
      id: 3,
      conversation: 2,
      quote: "Effective communication requires speaking the other person's language.",
      tip: "Before important conversations, take a moment to consider the other person's perspective and priorities.",
      category: "Communication",
      source: "Volume 2: Mastering Communication",
    },
    {
      id: 4,
      conversation: 2,
      quote: "Trust is built in small moments of vulnerability and reliability.",
      tip: "Identify one relationship to strengthen this week and schedule a meaningful interaction.",
      category: "Relationships",
      source: "Volume 2: Mastering Communication",
    },
    
    // Conversation with Environment
    {
      id: 5,
      conversation: 3,
      quote: "Your environment is either enhancing your energy or draining it.",
      tip: "Audit your workspace for distractions and remove or minimize the top three energy drains.",
      category: "Environment Design",
      source: "Volume 3: Optimal Environments",
    },
    {
      id: 6,
      conversation: 3,
      quote: "Health is the foundation upon which all other success is built.",
      tip: "Create a sleep ritual that includes 30 minutes of screen-free time before bed.",
      category: "Health",
      source: "Volume 3: Optimal Environments",
    },
    
    // Conversation with Work
    {
      id: 7,
      conversation: 4,
      quote: "Career capital comes from developing rare and valuable skills.",
      tip: "Identify one skill that would make you 10% more valuable in your field and create a learning plan.",
      category: "Skill Building",
      source: "Volume 4: Career Mastery",
    },
    {
      id: 8,
      conversation: 4,
      quote: "Purpose-driven work connects daily actions to meaningful impact.",
      tip: "Write down how your current projects connect to your broader purpose or the impact you want to have.",
      category: "Purpose",
      source: "Volume 4: Career Mastery",
    }
  ];

  // Generate weekly plan (one tip from each conversation per day)
  const generateWeeklyPlan = () => {
    const weeklyPlan = [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    days.forEach((day, dayIndex) => {
      const dayPlan = conversations.map(convo => {
        const conversationTips = allTips.filter(tip => tip.conversation === convo.id);
        const tipIndex = (dayIndex + convo.id) % conversationTips.length;
        return conversationTips[tipIndex];
      });
      
      weeklyPlan.push({
        day,
        tips: dayPlan
      });
    });
    
    return weeklyPlan;
  };

  const weeklyPlan = generateWeeklyPlan();
  
  // Get the current day's plan
  const today = new Date().getDay();
  const dayIndex = today >= 1 && today <= 5 ? today - 1 : 0; // Use Monday as default for weekend
  const todayPlan = weeklyPlan[dayIndex];
  
  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-bold">Life Design</h1>
              <p className="text-muted-foreground mt-1">
                Design a life of purpose across the four key conversations
              </p>
            </div>
            <Button variant="outline">
              <PenTool className="mr-2 h-4 w-4" />
              Customize Plan
            </Button>
          </div>
        </header>

        {/* Daily Tip Section */}
        <DailyLifeDesignTip tips={todayPlan.tips} day={todayPlan.day} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="weekly" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="library">Tip Library</TabsTrigger>
          </TabsList>
          
          {/* Weekly Plan Tab */}
          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Your Weekly Life Design Plan</CardTitle>
                <CardDescription>Daily focus areas across all four conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weeklyPlan.map((dayPlan, index) => (
                    <div key={index} className={`p-4 rounded-lg ${index === dayIndex ? 'bg-muted/80 border border-primary/30' : 'bg-muted/30'}`}>
                      <div className="flex items-center mb-3">
                        <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="font-medium">{dayPlan.day}</h3>
                        {index === dayIndex && (
                          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                            Today
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {dayPlan.tips.map((tip, tipIndex) => {
                          const convo = conversations.find(c => c.id === tip.conversation);
                          return (
                            <div key={tipIndex} className="flex gap-3 p-3 bg-background rounded border">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${convo?.color} flex items-center justify-center`}>
                                {convo && <convo.icon size={16} />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-sm">{tip.category}</h4>
                                  <Badge variant="outline" className={`text-xs ${convo?.badgeColor}`}>
                                    {convo?.title.split(' ').pop()}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 italic">"{tip.quote}"</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Export to Calendar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Conversations Tab */}
          <TabsContent value="conversations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conversations.map((conversation) => (
                <ConversationSection key={conversation.id} conversation={conversation} tips={allTips.filter(tip => tip.conversation === conversation.id)} />
              ))}
            </div>
          </TabsContent>
          
          {/* Library Tab */}
          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Life Design Tip Library</CardTitle>
                <CardDescription>Browse all tips from Be Your Own Commander-in-Chief</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allTips.map((tip) => {
                    const convo = conversations.find(c => c.id === tip.conversation);
                    return (
                      <div key={tip.id} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full ${convo?.color} flex items-center justify-center`}>
                            {convo && <convo.icon size={16} />}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-medium">{tip.category}</h4>
                              <Badge variant="outline" className={convo?.badgeColor}>
                                {convo?.title}
                              </Badge>
                            </div>
                            <p className="mt-2 text-sm italic">"{tip.quote}"</p>
                            <div className="mt-2 p-3 bg-muted/50 rounded-md">
                              <div className="flex items-center gap-2 mb-1">
                                <PenTool size={14} className="text-primary" />
                                <span className="text-sm font-medium">Daily Action</span>
                              </div>
                              <p className="text-sm">{tip.tip}</p>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">{tip.source}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Progress Tracking */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Life Design Progress</CardTitle>
                <CardDescription>Track your growth across all four conversations</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Update Progress
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${conversation.color} flex items-center justify-center`}>
                        <conversation.icon size={14} />
                      </div>
                      <span className="font-medium">{conversation.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {/* Random progress percentage between 30-70% */}
                      {30 + conversation.id * 10}%
                    </span>
                  </div>
                  <Progress value={30 + conversation.id * 10} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LifeDesign;
