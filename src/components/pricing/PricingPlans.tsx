
import React from "react";
import PricingPlan from "./PricingPlan";
import { pricingPlansData } from "./pricingPlansData";
import { useSubscription } from "@/context/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const PricingPlans: React.FC = () => {
  const { tier, hasJobsAccess } = useSubscription();
  const navigate = useNavigate();

  // Navigate to checkout page for the selected plan
  const handleSelectPlan = (planType: string) => {
    if (planType === "jobs") {
      navigate("/checkout");
    } else if (planType === "premium") {
      // For now, just navigate to checkout when Premium is ready
      navigate("/checkout");
    } else {
      // Basic plan
      navigate("/");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {pricingPlansData.map((plan) => (
        <PricingPlan
          key={plan.id}
          title={plan.title}
          price={plan.price}
          description={plan.description}
          features={plan.features}
          icon={plan.icon}
          isPopular={plan.isPopular}
          isCurrentPlan={
            (plan.id === "basic" && tier === "basic") ||
            (plan.id === "jobs" && hasJobsAccess && tier !== "premium") ||
            (plan.id === "premium" && tier === "premium")
          }
          onClick={() => handleSelectPlan(plan.id)}
        />
      ))}
    </div>
  );
};

export default PricingPlans;
