
import React from "react";
import Layout from "@/components/Layout";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Check,
  DollarSign,
  BadgeDollarSign,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { hasJobsAccess, checkoutJobs } = useSubscription();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="page-container">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground mt-1">
            Choose a plan that's right for your career journey
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Free Plan */}
          <DashboardCard className="flex flex-col border-2 h-full">
            <div className="p-6 flex-1">
              <div className="bg-muted/50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <BadgeDollarSign className="w-7 h-7 text-muted-foreground" />
              </div>
              
              <h2 className="font-bold text-2xl mb-2">Free</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Basic career tools and resources to get started
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Career dashboard</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Basic skills tracking</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Document management</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Life design tips</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 pt-0 mt-auto">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/")}
              >
                Current Plan
              </Button>
            </div>
          </DashboardCard>

          {/* Jobs Plan */}
          <DashboardCard className="flex flex-col border-2 border-primary h-full relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-md rounded-tr-md">
              POPULAR
            </div>
            
            <div className="p-6 flex-1">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              
              <h2 className="font-bold text-2xl mb-2">Jobs Access</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Advanced job matching and application tools
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span><strong>Full access to Jobs section</strong></span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>AI job matching</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Auto-apply functionality</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 pt-0 space-y-3 mt-auto">
              {hasJobsAccess ? (
                <Button className="w-full" onClick={() => navigate("/jobs")}>
                  Access Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button 
                    className="w-full" 
                    onClick={() => checkoutJobs("stripe")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe with Stripe
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => checkoutJobs("paypal")}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Pay with PayPal
                  </Button>
                </>
              )}
            </div>
          </DashboardCard>

          {/* Premium Plan - For future expansion */}
          <DashboardCard className="flex flex-col border-2 h-full opacity-75">
            <div className="p-6 flex-1">
              <div className="bg-muted/50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-7 h-7 text-muted-foreground" />
              </div>
              
              <h2 className="font-bold text-2xl mb-2">Premium</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">$19.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Complete career support and advanced features
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Everything in Jobs Access</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>1:1 Coaching sessions</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Resume review</span>
                </li>
                <li className="flex">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 pt-0 mt-auto">
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4">
            <div className="bg-primary/10 rounded-full p-4">
              <BadgeDollarSign className="w-8 h-8 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-muted-foreground">
                If you're not satisfied with our service, we offer a 14-day money-back guarantee on all subscriptions.
              </p>
            </div>
            
            <Button variant="link" className="shrink-0">
              Learn more
            </Button>
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
};

export default Pricing;
