
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BillingToggleProps {
  billingPeriod: "monthly" | "annual";
  onBillingPeriodChange: (value: "monthly" | "annual") => void;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ 
  billingPeriod, 
  onBillingPeriodChange 
}) => {
  return (
    <div className="flex justify-center mb-6">
      <Tabs 
        defaultValue={billingPeriod} 
        onValueChange={(value) => onBillingPeriodChange(value as "monthly" | "annual")}
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Monthly</span>
          </TabsTrigger>
          <TabsTrigger value="annual" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Annual (Save 50%)</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BillingToggle;
