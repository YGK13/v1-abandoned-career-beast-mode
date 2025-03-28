
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign } from "lucide-react";

const SatisfactionGuarantee: React.FC = () => {
  return (
    <DashboardCard className="mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6 p-4">
        <div className="bg-primary/10 rounded-full p-4">
          <BadgeDollarSign className="w-8 h-8 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">7-Day Satisfaction Guarantee</h3>
          <p className="text-muted-foreground">
            If you're not satisfied with our service, we offer a 7-day money-back guarantee on all subscriptions.
          </p>
        </div>
        
        <Button variant="link" className="shrink-0">
          Learn more
        </Button>
      </div>
    </DashboardCard>
  );
};

export default SatisfactionGuarantee;
