
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import OnboardingModal from "@/components/onboarding/OnboardingModal";
import { 
  CreditCard, 
  DollarSign, 
  ArrowLeft,
  Shield 
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { checkoutJobs } = useSubscription();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleCheckout = async (provider: "stripe" | "paypal") => {
    setIsProcessing(true);
    await checkoutJobs(provider);
    setIsProcessing(false);
    // Show onboarding modal after successful subscription
    setShowOnboarding(true);
  };

  return (
    <Layout>
      <div className="page-container max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/pricing")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pricing
        </Button>

        <header className="mb-8">
          <h1 className="text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-1">
            Complete your subscription to Jobs Access
          </p>
        </header>

        <DashboardCard className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            
            <div className="flex justify-between py-2 border-b">
              <span>Jobs Access Plan</span>
              <span className="font-semibold">$9.99/month</span>
            </div>
            
            <div className="flex justify-between py-2 border-b text-green-600">
              <span>7-day free trial</span>
              <span>-$9.99</span>
            </div>
            
            <div className="flex justify-between py-2 mt-2 text-lg font-bold">
              <span>Total today</span>
              <span>$0.00</span>
            </div>
            
            <div className="mt-4 bg-primary/10 p-3 rounded-md text-sm">
              <p>You won't be charged until your free trial ends. You can cancel anytime before the trial ends.</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
            
            <div className="grid gap-4">
              <Button 
                size="lg"
                onClick={() => handleCheckout("stripe")}
                disabled={isProcessing}
                className="h-auto py-6 justify-start text-left"
              >
                <CreditCard className="mr-3 h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Pay with Credit Card</span>
                  <span className="text-xs text-primary-foreground/80">Secure payment via Stripe</span>
                </div>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => handleCheckout("paypal")}
                disabled={isProcessing}
                className="h-auto py-6 justify-start text-left"
              >
                <DollarSign className="mr-3 h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Pay with PayPal</span>
                  <span className="text-xs text-muted-foreground">Fast and secure payment</span>
                </div>
              </Button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>All transactions are secure and encrypted</span>
            </div>
          </div>
        </DashboardCard>
        
        {/* Onboarding modal shown after successful checkout */}
        <OnboardingModal 
          isOpen={showOnboarding} 
          onOpenChange={setShowOnboarding} 
        />
      </div>
    </Layout>
  );
};

export default Checkout;
