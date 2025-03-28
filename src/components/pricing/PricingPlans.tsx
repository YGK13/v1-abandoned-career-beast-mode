
import React, { useState } from "react";
import PricingPlan from "./PricingPlan";
import { pricingPlansData, getPlansbyBillingPeriod } from "./pricingPlansData";
import { useSubscription } from "@/context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock } from "lucide-react";

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
      <div className="flex justify-center mb-6">
        <Tabs defaultValue="monthly" onValueChange={(value) => setBillingPeriod(value as "monthly" | "annual")}>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {plansToShow.map((plan) => (
          <PricingPlan
            key={plan.id}
            title={plan.title}
            price={billingPeriod === "annual" && plan.annualPrice ? plan.annualPrice : plan.price}
            description={plan.description}
            features={plan.features}
            icon={plan.icon}
            isPopular={plan.isPopular}
            isCurrentPlan={
              (plan.id.startsWith("basic") && tier === "basic") ||
              (plan.id.startsWith("jobs") && hasJobsAccess && tier !== "premium") ||
              (plan.id.startsWith("premium") && tier === "premium")
            }
            hasTrial={billingPeriod === "monthly"}
            onClick={() => handleSelectPlan(plan.id)}
            billingLabel={billingPeriod === "annual" ? "/month, billed annually" : "/month"}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
