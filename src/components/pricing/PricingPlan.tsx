
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

interface PlanFeature {
  text: string;
}

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: PlanFeature[];
  icon: React.ReactNode;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  hasTrial?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  description,
  features,
  icon,
  isPopular = false,
  isCurrentPlan = false,
  hasTrial = true,
  onClick,
  disabled = false,
}) => {
  return (
    <DashboardCard className={`flex flex-col border-2 h-full ${isPopular ? 'border-primary' : ''} relative`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-md rounded-tr-md">
          POPULAR
        </div>
      )}
      
      <div className="p-6 flex-1">
        <div className={`${isPopular ? 'bg-primary/10' : 'bg-muted/50'} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        
        <h2 className="font-bold text-2xl mb-2">{title}</h2>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        
        <p className="text-muted-foreground mb-6">
          {description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: feature.text }} />
            </li>
          ))}
        </ul>
        
        {hasTrial && (
          <div className="bg-primary/10 px-3 py-2 rounded-md text-sm mb-4">
            <p className="font-medium">7-day free trial</p>
            <p className="text-xs text-muted-foreground">Cancel anytime during trial period</p>
          </div>
        )}
      </div>
      
      <div className="p-6 pt-0 mt-auto">
        <Button 
          className="w-full"
          onClick={onClick}
          disabled={disabled || isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : "Select Plan"}
          {!isCurrentPlan && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </DashboardCard>
  );
};

export default PricingPlan;
