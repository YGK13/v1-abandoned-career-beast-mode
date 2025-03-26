
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

type SubscriptionStatus = "active" | "inactive" | "loading";
type SubscriptionTier = "basic" | "jobs" | "premium";

interface SubscriptionContextType {
  status: SubscriptionStatus;
  tier: SubscriptionTier;
  isSubscribed: boolean;
  hasJobsAccess: boolean;
  checkoutJobs: (provider: "stripe" | "paypal") => void;
  refreshSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<SubscriptionStatus>("loading");
  const [tier, setTier] = useState<SubscriptionTier>("basic");

  const hasJobsAccess = tier === "jobs" || tier === "premium";
  const isSubscribed = tier !== "basic";

  useEffect(() => {
    // Check local storage for subscription status
    refreshSubscription();
  }, []);

  const refreshSubscription = () => {
    // Simulate loading from storage or API
    setStatus("loading");
    
    // In a real app, this would fetch from your API
    setTimeout(() => {
      const savedTier = localStorage.getItem("subscription_tier") as SubscriptionTier | null;
      if (savedTier) {
        setTier(savedTier);
        setStatus("active");
      } else {
        setTier("basic");
        setStatus("inactive");
      }
    }, 500);
  };

  const mockPaymentProcess = (provider: string) => {
    // In a real implementation, this would redirect to Stripe/PayPal
    return new Promise<boolean>((resolve) => {
      toast({
        title: `Processing ${provider} payment...`,
        description: "This is a simulation. In a real app, you would be redirected to the payment provider.",
      });
      
      // Simulate successful payment after delay
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  };

  const checkoutJobs = async (provider: "stripe" | "paypal") => {
    setStatus("loading");
    
    try {
      // In a real implementation, this would redirect to the payment provider
      const success = await mockPaymentProcess(provider);
      
      if (success) {
        // Save to localStorage for demo purposes
        localStorage.setItem("subscription_tier", "jobs");
        setTier("jobs");
        setStatus("active");
        toast({
          title: "Subscription activated!",
          description: "You now have access to the Jobs section with a 7-day free trial.",
        });
      }
    } catch (error) {
      setStatus("inactive");
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment.",
        variant: "destructive",
      });
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        status,
        tier,
        isSubscribed,
        hasJobsAccess,
        checkoutJobs,
        refreshSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
