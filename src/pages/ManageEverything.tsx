
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Clock,
  Battery,
  FolderKanban,
  Presentation,
  BadgeCheck,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";

// Mock data - In a real app, this would come from an API
const managementTips = {
  people: {
    title: "Managing People",
    icon: Users,
    tips: [
      {
        id: 1,
        title: "Build Trust Through Transparency",
        description: "Regular one-on-ones with clear agendas and follow-ups build trust and alignment.",
        source: "The Manager's Path",
      },
      {
        id: 2,
        title: "Delegate Effectively",
        description: "Use the RACI matrix to clearly define roles and responsibilities in projects.",
        source: "High Output Management",
      },
    ],
  },
  time: {
    title: "Time Management",
    icon: Clock,
    tips: [
      {
        id: 1,
        title: "Time Blocking",
        description: "Dedicate specific blocks of time to focused work, meetings, and breaks.",
        source: "Deep Work",
      },
      {
        id: 2,
        title: "The Two-Minute Rule",
        description: "If a task takes less than two minutes, do it immediately rather than scheduling it.",
        source: "Getting Things Done",
      },
    ],
  },
  energy: {
    title: "Energy Management",
    icon: Battery,
    tips: [
      {
        id: 1,
        title: "Strategic Breaks",
        description: "Take regular breaks using the Pomodoro Technique to maintain high energy levels.",
        source: "Peak Performance",
      },
      {
        id: 2,
        title: "Energy Audit",
        description: "Track your energy levels throughout the day to identify your peak performance times.",
        source: "The Power of Full Engagement",
      },
    ],
  },
  projects: {
    title: "Project Management",
    icon: FolderKanban,
    tips: [
      {
        id: 1,
        title: "Clear Success Metrics",
        description: "Define SMART goals and KPIs at the start of each project.",
        source: "Project Management Body of Knowledge",
      },
      {
        id: 2,
        title: "Risk Management",
        description: "Maintain a risk register and review it weekly with stakeholders.",
        source: "Agile Project Management",
      },
    ],
  },
  programs: {
    title: "Program Management",
    icon: Presentation,
    tips: [
      {
        id: 1,
        title: "Strategic Alignment",
        description: "Ensure all projects within the program align with organizational objectives.",
        source: "Program Management for Improved Business Results",
      },
      {
        id: 2,
        title: "Stakeholder Communication",
        description: "Create a structured communication plan for different stakeholder groups.",
        source: "The Standard for Program Management",
      },
    ],
  },
};

const ManageEverything = () => {
  const [date] = useState(() => new Date().toLocaleDateString());

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Manage Everything</h1>
            <p className="text-muted-foreground">
              Daily rotating tips and resources for effective management across all dimensions
            </p>
          </header>

          <Alert className="mb-8">
            <RefreshCcw className="h-4 w-4" />
            <AlertTitle>Daily Updates</AlertTitle>
            <AlertDescription>
              Tips and resources are refreshed daily. Last updated: {date}
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="people" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
            </TabsList>

            {Object.entries(managementTips).map(([key, section]) => (
              <TabsContent key={key} value={key}>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <section.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{section.title}</CardTitle>
                          <CardDescription>
                            Best practices and actionable insights
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {section.tips.map((tip) => (
                          <div
                            key={tip.id}
                            className="p-4 rounded-lg border bg-muted/50"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">{tip.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {tip.description}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">
                                    Source: {tip.source}
                                  </Badge>
                                </div>
                              </div>
                              <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = '/coaching'}
                  >
                    Get Personalized Coaching
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ManageEverything;
