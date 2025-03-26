
import React from "react";
import Layout from "@/components/Layout";
import PricingPlans from "@/components/pricing/PricingPlans";
import SatisfactionGuarantee from "@/components/pricing/SatisfactionGuarantee";

const Pricing: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground mt-1">
            Choose a plan that's right for your career journey
          </p>
        </header>

        <PricingPlans />
        <SatisfactionGuarantee />
      </div>
    </Layout>
  );
};

export default Pricing;
