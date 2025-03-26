
import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

const CareerPromoSection: React.FC = () => {
  return (
    <DashboardCard
      className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Lightbulb size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">Ready to reach the next level?</h3>
          <p className="text-muted-foreground">Our AI analysis suggests focusing on leadership skills to prepare for your next career move.</p>
        </div>
        <Button className="flex-shrink-0">
          Get Personalized Plan
        </Button>
      </div>
    </DashboardCard>
  );
};

export default CareerPromoSection;
