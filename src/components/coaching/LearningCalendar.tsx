
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Types
type LearningActivity = {
  title: string;
  date: string;
  type: string;
  priority?: "high" | "medium" | "low";
  status?: "Completed";
};

interface LearningCalendarProps {
  upcomingActivities: LearningActivity[];
  completedActivities: LearningActivity[];
}

const LearningCalendar: React.FC<LearningCalendarProps> = ({ upcomingActivities, completedActivities }) => {
  return (
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
              {upcomingActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-md bg-muted/50">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{activity.title}</h4>
                      {activity.priority && (
                        <Badge variant={
                          activity.priority === "high" ? "destructive" : 
                          activity.priority === "medium" ? "secondary" : "outline"
                        }>
                          {activity.priority}
                        </Badge>
                      )}
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
              {completedActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-md bg-muted/50">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                      <BookOpen size={16} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{activity.title}</h4>
                      {activity.status && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {activity.status}
                        </Badge>
                      )}
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
  );
};

export default LearningCalendar;
