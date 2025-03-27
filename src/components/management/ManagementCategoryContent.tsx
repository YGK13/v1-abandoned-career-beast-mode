
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ManagementTipCard from "./ManagementTipCard";
import { ManagementCategory } from "@/data/managementTipsData";

interface ManagementCategoryContentProps {
  category: ManagementCategory;
  date: string;
}

const ManagementCategoryContent: React.FC<ManagementCategoryContentProps> = ({ category, date }) => {
  // Get a daily rotating tip based on the date
  const getTipOfTheDay = () => {
    // Parse the date to get day of the year (1-366)
    const dayOfYear = Math.floor((new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000) / 86400000);
    
    // Use the day of the year to rotate through tips
    // This ensures tips don't repeat too frequently
    return category.tips[dayOfYear % category.tips.length];
  };

  const dailyTip = getTipOfTheDay();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <category.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>
                Daily rotating best practices and actionable insights
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ManagementTipCard tip={dailyTip} />
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
  );
};

export default ManagementCategoryContent;
