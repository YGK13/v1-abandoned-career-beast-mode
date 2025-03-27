
import React from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, Lightbulb, Workflow, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LinkedInNextSteps: React.FC = () => {
  const nextSteps = [
    {
      title: "Strategic Networking",
      description: "Connect with relevant industry professionals based on your profile",
      icon: Users,
      path: "/networking",
      highlight: true
    },
    {
      title: "Career Coaching",
      description: "Get personalized guidance from AI and professional coaches",
      icon: BookOpen,
      path: "/coaching",
      highlight: false
    },
    {
      title: "Build Your Brand",
      description: "Develop your personal brand and find PR opportunities",
      icon: Award,
      path: "/personal-brand",
      highlight: true
    },
    {
      title: "Skill Development",
      description: "Identify and develop key skills for career advancement",
      icon: Workflow,
      path: "/skills",
      highlight: false
    },
    {
      title: "Career Assets",
      description: "Manage your resume, cover letters and other career assets",
      icon: Lightbulb,
      path: "/career-docs",
      highlight: false
    }
  ];

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2">Continue Your Career Development</h3>
        <p className="text-muted-foreground mb-6">
          Optimize your LinkedIn profile, then take these next steps for holistic career growth
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nextSteps.map((step, index) => (
            <div 
              key={index} 
              className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                step.highlight 
                  ? "border-primary/30 bg-primary/5" 
                  : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md ${
                  step.highlight 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <step.icon size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{step.description}</p>
                  <Link to={step.path}>
                    <Button 
                      variant={step.highlight ? "default" : "outline"} 
                      size="sm" 
                      className="w-full text-xs"
                    >
                      {step.title === "Strategic Networking" ? "Find Connections" : 
                       step.title === "Career Coaching" ? "Get Coaching" :
                       step.title === "Build Your Brand" ? "Enhance Brand" :
                       step.title === "Skill Development" ? "Upskill" :
                       "View Documents"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedInNextSteps;
