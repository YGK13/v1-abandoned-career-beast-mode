
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Calendar, BookOpen, Rocket, Target, BarChart3 } from "lucide-react";

interface OnboardingEmailDay {
  day: number;
  title: string;
  subject: string;
  content: string;
  featureHighlight: string;
  actionItem: string;
  icon: React.ReactNode;
}

const OnboardingEmailPreview: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  
  const onboardingSequence: OnboardingEmailDay[] = [
    {
      day: 1,
      title: "Welcome to Your Career Growth Platform",
      subject: "Your 15-Day Journey Begins: Day 1",
      content: "Welcome to your career growth platform! Today, we'll help you set up your profile and navigate the dashboard. This is the first step in your 15-day journey to career mastery.",
      featureHighlight: "Profile Setup & Dashboard Tour",
      actionItem: "Complete your profile with current skills and goals",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      day: 2,
      title: "Document Your Career Assets",
      subject: "Organize Your Career Documents: Day 2",
      content: "Today we're focusing on organizing your career documents. Upload your resume, portfolio items, and any certificates to build your career asset library.",
      featureHighlight: "Document Storage System",
      actionItem: "Upload your current resume and portfolio items",
      icon: <Mail className="h-5 w-5" />
    },
    {
      day: 3,
      title: "Track Your Skills Development",
      subject: "Skills Tracking Fundamentals: Day 3",
      content: "On day 3, we'll explore the skills tracking system. Learn how to visualize your skill growth and identify areas for development.",
      featureHighlight: "Skills Visualization Tools",
      actionItem: "Map your current skills and set development goals",
      icon: <Target className="h-5 w-5" />
    },
    {
      day: 4,
      title: "Setting Meaningful Career Goals",
      subject: "Career Goal Setting Workshop: Day 4",
      content: "Today's focus is on setting SMART career goals. We'll walk through how to create measurable objectives that align with your vision.",
      featureHighlight: "Goal Setting Framework",
      actionItem: "Set 3 short-term and 1 long-term career goal",
      icon: <Target className="h-5 w-5" />
    },
    {
      day: 5,
      title: "Building Your Network Strategy",
      subject: "Strategic Networking Approaches: Day 5",
      content: "On day 5, we explore strategic networking. Learn how to identify and connect with key professionals in your industry.",
      featureHighlight: "Networking Tools and Templates",
      actionItem: "Identify 5 new connections to make this month",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      day: 6,
      title: "Optimizing Your Personal Brand",
      subject: "Personal Brand Enhancement: Day 6",
      content: "Today we focus on your personal brand. Discover how to craft a compelling professional narrative across platforms.",
      featureHighlight: "Brand Assessment Tools",
      actionItem: "Update your LinkedIn headline and summary",
      icon: <Rocket className="h-5 w-5" />
    },
    {
      day: 7,
      title: "Weekly Reflection & Progress Review",
      subject: "Your First Week Progress Review: Day 7",
      content: "Congratulations on completing your first week! Today we'll review your progress and reflect on insights gained so far.",
      featureHighlight: "Progress Tracking Dashboard",
      actionItem: "Complete your first weekly reflection",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      day: 8,
      title: "Job Search Optimization",
      subject: "Supercharge Your Job Search: Day 8",
      content: "For day 8, we're optimizing your job search strategy. Learn how to use filters and alerts to find the perfect opportunities.",
      featureHighlight: "Job Search Filters and Alerts",
      actionItem: "Set up 3 custom job search alerts",
      icon: <Mail className="h-5 w-5" />
    },
    {
      day: 9,
      title: "Resume Tailoring Techniques",
      subject: "AI-Powered Resume Tailoring: Day 9",
      content: "Today's focus is on tailoring your resume for specific roles. Our AI tools help you match your experience to job requirements.",
      featureHighlight: "Resume AI Assistant",
      actionItem: "Create one tailored resume for a target role",
      icon: <Rocket className="h-5 w-5" />
    },
    {
      day: 10,
      title: "Interview Preparation Strategies",
      subject: "Interview Mastery Fundamentals: Day 10",
      content: "On day 10, we're preparing for interviews. Explore techniques for communicating your value and handling tough questions.",
      featureHighlight: "Interview Simulator",
      actionItem: "Practice responses to 5 common interview questions",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      day: 11,
      title: "Salary Negotiation Fundamentals",
      subject: "Negotiate With Confidence: Day 11",
      content: "Today we cover salary negotiation basics. Learn research techniques and practice articulating your value proposition.",
      featureHighlight: "Compensation Research Tools",
      actionItem: "Research salary ranges for your target role",
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      day: 12,
      title: "Building Daily Career Habits",
      subject: "Daily Career Growth Habits: Day 12",
      content: "For day 12, we're establishing daily career growth habits. Small consistent actions lead to significant progress over time.",
      featureHighlight: "Habit Tracking System",
      actionItem: "Set up 2 daily career growth micro-habits",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      day: 13,
      title: "Continuous Learning Pathways",
      subject: "Your Learning Development Plan: Day 13",
      content: "Today's focus is on continuous learning. Discover resources for skill development in your specific field.",
      featureHighlight: "Learning Resource Library",
      actionItem: "Bookmark 3 learning resources for your priority skills",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      day: 14,
      title: "Accomplishment Tracking System",
      subject: "Tracking Career Wins: Day 14",
      content: "On day 14, we explore accomplishment tracking. Learn to document your achievements for performance reviews and interviews.",
      featureHighlight: "Accomplishment Journal",
      actionItem: "Record 5 recent professional accomplishments",
      icon: <Target className="h-5 w-5" />
    },
    {
      day: 15,
      title: "Your Career Growth Roadmap",
      subject: "Congratulations: Your Career Roadmap: Day 15",
      content: "Congratulations on completing your 15-day onboarding! Today we'll help you create a personalized roadmap for continued career growth.",
      featureHighlight: "Career Roadmap Generator",
      actionItem: "Create your 90-day career growth plan",
      icon: <Rocket className="h-5 w-5" />
    }
  ];
  
  const selectedEmail = onboardingSequence.find(email => email.day === selectedDay) || onboardingSequence[0];
  
  return (
    <Card className="mb-8">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          15-Day Onboarding Sequence Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="email">
          <TabsList className="mb-4">
            <TabsTrigger value="email">Email Preview</TabsTrigger>
            <TabsTrigger value="sequence">Full Sequence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">Day {selectedEmail.day}</Badge>
                  <h3 className="text-lg font-semibold">{selectedEmail.subject}</h3>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="text-sm text-primary" 
                    onClick={() => setSelectedDay(prev => Math.max(1, prev - 1))}
                    disabled={selectedDay === 1}
                  >
                    Previous
                  </button>
                  <button 
                    className="text-sm text-primary" 
                    onClick={() => setSelectedDay(prev => Math.min(15, prev + 1))}
                    disabled={selectedDay === 15}
                  >
                    Next
                  </button>
                </div>
              </div>
              
              <div className="bg-white border rounded-md p-5">
                <h2 className="text-xl font-bold mb-4">{selectedEmail.title}</h2>
                <p className="mb-6">{selectedEmail.content}</p>
                
                <div className="bg-primary/5 p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-1">Today's Feature Highlight</h4>
                  <p className="text-sm">{selectedEmail.featureHighlight}</p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-2">Your 15-Minute Action Item</h4>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 rounded-full p-1">
                      {selectedEmail.icon}
                    </div>
                    <p>{selectedEmail.actionItem}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sequence">
            <div className="space-y-3 max-h-96 overflow-y-auto p-2">
              {onboardingSequence.map(day => (
                <div 
                  key={day.day}
                  className={`p-3 border rounded-md cursor-pointer hover:bg-muted/10 transition-colors ${
                    selectedDay === day.day ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedDay(day.day)}
                >
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="flex-shrink-0 mt-1">Day {day.day}</Badge>
                    <div>
                      <h4 className="font-medium">{day.title}</h4>
                      <p className="text-sm text-muted-foreground">{day.actionItem}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OnboardingEmailPreview;
