
import React from "react";
import Layout from "@/components/Layout";
import PricingPlans from "@/components/pricing/PricingPlans";
import SatisfactionGuarantee from "@/components/pricing/SatisfactionGuarantee";
import { CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">Choose Your Career Growth Plan</h1>
          <p className="text-muted-foreground mt-3">
            Invest in your future with our powerful career development ecosystem
          </p>
        </header>

        <div className="mb-8 bg-primary/5 rounded-lg p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 mb-4">
            <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Client Onboarding Process</h3>
              <p className="text-sm text-muted-foreground">
                All new subscribers receive our comprehensive 15-day onboarding sequence
                to help you get the most value from your subscription.
              </p>
              <Button 
                variant="link" 
                className="px-0 text-sm h-auto" 
                onClick={() => navigate("/onboarding")}
              >
                Preview our onboarding process
              </Button>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-3">All Plans Include:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Career health dashboard</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Skills tracking & visualization</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Document storage & organization</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Personalized career insights</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>15-day guided onboarding</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>7-day satisfaction guarantee</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Daily career growth tips</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        <PricingPlans />
        <SatisfactionGuarantee />
      </div>
    </Layout>
  );
};

export default Pricing;
