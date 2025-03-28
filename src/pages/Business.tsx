
import React from "react";
import Layout from "@/components/Layout";
import BusinessResourcesDashboard from "@/components/business/BusinessResourcesDashboard";

const Business = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Business Resources</h1>
        <p className="text-muted-foreground mb-8">
          Essential tools and resources to build and grow your business
        </p>
        
        <BusinessResourcesDashboard />
      </div>
    </Layout>
  );
};

export default Business;
