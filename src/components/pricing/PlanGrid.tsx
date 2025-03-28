
import React from "react";
import PricingPlan from "./PricingPlan";
import { PricingPlanData } from "./pricingPlansData";

interface PlanGridProps {
  plans: PricingPlanData[];
  currentTier: string;
  hasJobsAccess: boolean;
  billingPeriod: "monthly" | "annual";
  onSelectPlan: (planType: string) => void;
}

const PlanGrid: React.FC<PlanGridProps> = ({
  plans,
  currentTier,
  hasJobsAccess,
  billingPeriod,
  onSelectPlan
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {plans.map((plan) => (
        <PricingPlan
          key={plan.id}
          title={plan.title}
          price={billingPeriod === "annual" && plan.annualPrice ? plan.annualPrice : plan.price}
          description={plan.description}
          features={plan.features}
          icon={plan.icon}
          isPopular={plan.isPopular}
          isCurrentPlan={
            (plan.id.startsWith("basic") && currentTier === "basic") ||
            (plan.id.startsWith("jobs") && hasJobsAccess && currentTier !== "premium") ||
            (plan.id.startsWith("premium") && currentTier === "premium")
          }
          hasTrial={billingPeriod === "monthly"}
          onClick={() => onSelectPlan(plan.id)}
          billingLabel={billingPeriod === "annual" ? "/month, billed annually" : "/month"}
        />
      ))}
    </div>
  );
};

export default PlanGrid;
