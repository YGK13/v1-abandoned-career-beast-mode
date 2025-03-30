
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, ArrowRight } from "lucide-react";

const SatisfactionGuarantee: React.FC = () => {
  return (
    <DashboardCard className="mb-8 overflow-hidden border-0 shadow-featured">
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="bg-primary/10 rounded-full p-4 shrink-0">
            <BadgeDollarSign className="w-8 h-8 text-primary" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">7-Day Satisfaction Guarantee</h3>
            <p className="text-muted-foreground max-w-2xl">
              If you're not satisfied with our service, we offer a 7-day money-back guarantee on all subscriptions.
            </p>
          </div>
          
          <Button variant="ghost" className="group shrink-0 text-primary font-medium hover:bg-primary/10 transition-all duration-300">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SatisfactionGuarantee;
