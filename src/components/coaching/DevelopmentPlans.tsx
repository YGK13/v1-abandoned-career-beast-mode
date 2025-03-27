
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Types
export type Milestone = {
  name: string;
  completed: boolean;
};

export type DevelopmentPlan = {
  id: number;
  title: string;
  description: string;
  progress: number;
  milestones: Milestone[];
};

interface DevelopmentPlansProps {
  plans: DevelopmentPlan[];
}

const DevelopmentPlans: React.FC<DevelopmentPlansProps> = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {plans.map((plan) => (
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
  );
};

export default DevelopmentPlans;
