
import React from "react";
import Layout from "@/components/Layout";
import FormLLCSection from "@/components/business/FormLLCSection";
import BusinessBankingSection from "@/components/business/BusinessBankingSection";
import BusinessAddressSection from "@/components/business/BusinessAddressSection";
import PremiumResourcesSection from "@/components/business/PremiumResourcesSection";
import BusinessRoadmap from "@/components/business/BusinessRoadmap";

const BuildBusiness = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Start Your Biz</h1>
        <p className="text-muted-foreground mb-8">
          Essential resources to establish and grow your business
        </p>

        <BusinessRoadmap />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <FormLLCSection />
          <BusinessBankingSection />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <BusinessAddressSection />
          <PremiumResourcesSection />
        </div>
      </div>
    </Layout>
  );
};

export default BuildBusiness;
