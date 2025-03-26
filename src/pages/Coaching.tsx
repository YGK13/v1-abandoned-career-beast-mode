
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, TrendingUp, Users, Briefcase, Calendar, BookOpen, Lightbulb, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Mock data for daily tips
const dailyTips = [
  {
    id: 1,
    title: "Negotiation Strategy",
    description: "When negotiating salary, always have a specific number rather than a range. Research shows that mentioning a precise figure like $82,500 rather than $80,000-$85,000 signals that you've done your homework.",
    category: "Salary Negotiation",
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "Leadership Presence",
    description: "Develop 'executive presence' by speaking with confidence, maintaining good posture, and eliminating filler words like 'um' or 'like' from your speech.",
    category: "Leadership",
    icon: Users,
  },
  {
    id: 3,
    title: "Skill Development",
    description: "Allocate 5 hours per week for deliberate skill practice. Focused practice on key skills yields better results than sporadic learning across many areas.",
    category: "Learning",
    icon: BookOpen,
  },
];

// Mock data for development plans
const developmentPlans = [
  {
    id: 1,
    title: "Leadership Development",
    description: "A structured plan to develop team management and leadership skills",
    progress: 65,
    milestones: [
      { name: "Complete Leadership Fundamentals Course", completed: true },
      { name: "Lead 3 Cross-Functional Projects", completed: true },
      { name: "Mentor 2 Junior Team Members", completed: false },
      { name: "Obtain Leadership Certification", completed: false },
    ]
  },
  {
    id: 2,
    title: "Technical Growth Plan",
    description: "Advancing technical skills in software architecture",
    progress: 40,
    milestones: [
      { name: "Complete System Design Course", completed: true },
      { name: "Contribute to Open Source Project", completed: false },
      { name: "Design Enterprise Architecture", completed: false },
      { name: "Present at Technical Conference", completed: false },
    ]
  }
];

// Career resources data
const careerResources = [
  {
    title: "Salary Negotiations",
    description: "How to effectively negotiate your compensation package",
    links: [
      { text: "Research Industry Standards", url: "#" },
      { text: "Negotiation Scripts", url: "#" },
      { text: "Benefits Evaluation Guide", url: "#" },
    ],
    icon: TrendingUp,
  },
  {
    title: "Performance Reviews",
    description: "Strategies to excel in performance evaluations",
    links: [
      { text: "Self-Assessment Template", url: "#" },
      { text: "Achievement Documentation", url: "#" },
      { text: "Feedback Reception Guide", url: "#" },
    ],
    icon: Award,
  },
  {
    title: "Project Management",
    description: "Resources for effective project planning and execution",
    links: [
      { text: "Agile Methodology Guide", url: "#" },
      { text: "Stakeholder Management", url: "#" },
      { text: "Risk Assessment Framework", url: "#" },
    ],
    icon: Briefcase,
  },
  {
    title: "People Management",
    description: "Develop skills for leading teams effectively",
    links: [
      { text: "Team Motivation Strategies", url: "#" },
      { text: "Conflict Resolution Techniques", url: "#" },
      { text: "Performance Management Guide", url: "#" },
    ],
    icon: Users,
  },
];

const Coaching: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % dailyTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + dailyTips.length) % dailyTips.length);
  };

  const currentTip = dailyTips[currentTipIndex];
  const CurrentTipIcon = currentTip.icon;

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
        <Card className="mb-8 overflow-hidden border-primary/20">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Lightbulb size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold">Daily Career Tip</h3>
                    <Badge variant="secondary" className="mt-1">
                      {currentTip.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={prevTip}
                      className="h-8 w-8 p-0"
                    >
                      &larr;
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {currentTipIndex + 1}/{dailyTips.length}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={nextTip}
                      className="h-8 w-8 p-0"
                    >
                      &rarr;
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <CurrentTipIcon size={20} className="text-muted-foreground" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">{currentTip.title}</h4>
                <p className="text-muted-foreground">{currentTip.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="development" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="development">Development Plans</TabsTrigger>
            <TabsTrigger value="resources">Career Resources</TabsTrigger>
            <TabsTrigger value="calendar">Learning Calendar</TabsTrigger>
          </TabsList>
          
          {/* Development Plans Tab */}
          <TabsContent value="development">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {developmentPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      {plan.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${milestone.completed ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                            {milestone.completed && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span className={milestone.completed ? 'line-through text-muted-foreground' : 'text-foreground'}>
                            {milestone.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Update Progress</Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="border-dashed border-2 border-muted flex flex-col items-center justify-center p-6">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Create New Plan</h3>
                <p className="text-center text-muted-foreground mb-4">Set goals and track progress toward your career objectives</p>
                <Button>Create Development Plan</Button>
              </Card>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careerResources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <resource.icon size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <ul className="space-y-2">
                      {resource.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a 
                            href={link.url} 
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Learning Calendar</CardTitle>
                <CardDescription>Schedule your learning activities and track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="font-medium mb-4">Upcoming Learning Activities</h3>
                    <div className="space-y-4">
                      {[
                        { 
                          title: "Project Management Certification", 
                          date: "May 15, 2023", 
                          type: "Exam",
                          priority: "high"
                        },
                        { 
                          title: "Leadership Webinar Series", 
                          date: "May 10, 2023", 
                          type: "Webinar",
                          priority: "medium" 
                        },
                        { 
                          title: "Technical Writing Workshop", 
                          date: "May 22, 2023", 
                          type: "Workshop",
                          priority: "medium" 
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-md bg-muted/50">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                              <Calendar size={16} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{activity.title}</h4>
                              <Badge variant={
                                activity.priority === "high" ? "destructive" : 
                                activity.priority === "medium" ? "secondary" : "outline"
                              }>
                                {activity.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>{activity.date}</span>
                              <Separator orientation="vertical" className="h-3" />
                              <span>{activity.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View Full Calendar
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium mb-4">Completed Learning</h3>
                    <div className="space-y-4">
                      {[
                        { 
                          title: "Advanced Excel for Data Analysis", 
                          date: "April 28, 2023", 
                          type: "Course",
                          status: "Completed"
                        },
                        { 
                          title: "Effective Communication Skills", 
                          date: "April 15, 2023", 
                          type: "Workshop",
                          status: "Completed" 
                        },
                        { 
                          title: "Strategic Thinking Certificate", 
                          date: "March 30, 2023", 
                          type: "Certification",
                          status: "Completed" 
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-md bg-muted/50">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                              <BookOpen size={16} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{activity.title}</h4>
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                {activity.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>{activity.date}</span>
                              <Separator orientation="vertical" className="h-3" />
                              <span>{activity.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View Learning History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Career Path Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Career Path Analysis</CardTitle>
                <CardDescription>Based on your profile and industry trends</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Update Preferences
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Current Position</h3>
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Briefcase size={16} className="text-primary" />
                    </div>
                    <h4 className="font-medium">Senior Product Manager</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">TechCorp Inc., 3 years</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Product Strategy</Badge>
                    <Badge variant="outline">Team Leadership</Badge>
                    <Badge variant="outline">Agile</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Potential Next Steps</h3>
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <TrendingUp size={16} className="text-primary" />
                    </div>
                    <h4 className="font-medium">Director of Product</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Estimated timeline: 2-3 years</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Product Vision</Badge>
                    <Badge variant="secondary">Strategic Planning</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Skills to Develop</h3>
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Executive Leadership</span>
                        <span className="text-sm text-muted-foreground">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Strategic Planning</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Budget Management</span>
                        <span className="text-sm text-muted-foreground">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Coaching;
