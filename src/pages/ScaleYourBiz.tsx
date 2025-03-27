
import React from "react";
import Layout from "@/components/Layout";
import EnterpriseToolsSection from "@/components/business/EnterpriseToolsSection";
import BusinessResourcesDashboard from "@/components/business/BusinessResourcesDashboard";
import GrowthStrategiesSection from "@/components/business/GrowthStrategiesSection";

const ScaleYourBiz = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Scale Your Biz</h1>
        <p className="text-muted-foreground mb-8">
          Premium tools and resources to accelerate your business growth
        </p>

        <div className="space-y-10">
          <BusinessResourcesDashboard />
          <GrowthStrategiesSection />
          <EnterpriseToolsSection />
        </div>
      </div>
    </Layout>
  );
};

export default ScaleYourBiz;
