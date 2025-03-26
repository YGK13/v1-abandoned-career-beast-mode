
import React from "react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaywallProps {
  title?: string;
  description?: string;
}

const Paywall: React.FC<PaywallProps> = ({
  title = "Premium Content",
  description = "This content requires a subscription to access.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto my-16">
      <DashboardCard className="text-center p-8">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>

        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        
        <p className="text-muted-foreground mb-6">
          {description}
        </p>
        
        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={() => navigate("/pricing")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            View Subscription Options
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate("/")}
          >
            Return to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default Paywall;
