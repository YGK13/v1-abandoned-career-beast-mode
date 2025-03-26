
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ManagementTipCard from "./ManagementTipCard";
import { ManagementCategory } from "@/data/managementTipsData";

interface ManagementCategoryContentProps {
  category: ManagementCategory;
}

const ManagementCategoryContent: React.FC<ManagementCategoryContentProps> = ({ category }) => {
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
                Best practices and actionable insights
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {category.tips.map((tip) => (
              <ManagementTipCard key={tip.id} tip={tip} />
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
  );
};

export default ManagementCategoryContent;
