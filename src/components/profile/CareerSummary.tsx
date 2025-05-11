
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, DollarSign, TrendingUp } from "lucide-react";

interface CareerSummaryProps {
  currentSalary: number;
  targetSalary: number;
  nextReview: string;
  yearsExperience: number;
  industry: string;
}

const CareerSummary: React.FC<CareerSummaryProps> = ({
  currentSalary,
  targetSalary,
  nextReview,
  yearsExperience,
  industry
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const growthPercentage = ((targetSalary - currentSalary) / currentSalary) * 100;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-primary" />
              <span className="text-sm font-medium">Current Salary</span>
            </div>
            <p className="text-xl font-semibold">{formatCurrency(currentSalary)}</p>
            <p className="text-xs text-muted-foreground">Per year</p>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-primary" />
              <span className="text-sm font-medium">Target Salary</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <p className="text-xl font-semibold">{formatCurrency(targetSalary)}</p>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm dark:bg-emerald-950/30">
                +{growthPercentage.toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Growth potential</p>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-primary" />
              <span className="text-sm font-medium">Next Review</span>
            </div>
            <p className="text-xl font-semibold">{nextReview}</p>
            <p className="text-xs text-muted-foreground">Performance & compensation</p>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase size={16} className="text-primary" />
              <span className="text-sm font-medium">Experience</span>
            </div>
            <p className="text-xl font-semibold">{yearsExperience} years</p>
            <p className="text-xs text-muted-foreground">{industry}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerSummary;
