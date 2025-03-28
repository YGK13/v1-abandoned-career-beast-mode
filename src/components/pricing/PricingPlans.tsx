
import React, { useState } from "react";
import { useSubscription } from "@/context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { getPlansbyBillingPeriod } from "./pricingPlansData";
import BillingToggle from "./BillingToggle";
import PlanGrid from "./PlanGrid";

const PricingPlans: React.FC = () => {
  const { tier, hasJobsAccess } = useSubscription();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  // Navigate to checkout page for the selected plan
  const handleSelectPlan = (planType: string) => {
    if (planType.startsWith("jobs")) {
      navigate("/checkout");
    } else if (planType.startsWith("premium")) {
      // For now, just navigate to checkout when Premium is ready
      navigate("/checkout");
    } else {
      // Basic plan
      navigate("/");
    }
  };

  // Filter plans based on billing period
  const plansToShow = getPlansbyBillingPeriod(billingPeriod);

  return (
    <div className="space-y-6">
      <BillingToggle 
        billingPeriod={billingPeriod}
        onBillingPeriodChange={setBillingPeriod}
      />
      
      <PlanGrid 
        plans={plansToShow}
        currentTier={tier}
        hasJobsAccess={hasJobsAccess}
        billingPeriod={billingPeriod}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
};

export default PricingPlans;
