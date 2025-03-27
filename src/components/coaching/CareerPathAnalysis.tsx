
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CareerPathAnalysis: React.FC = () => {
  return (
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
  );
};

export default CareerPathAnalysis;
