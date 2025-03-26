
import React from "react";
import { BadgeDollarSign, Briefcase } from "lucide-react";

export interface PricingPlanData {
  id: string;
  title: string;
  price: string;
  description: string;
  features: { text: string }[];
  icon: React.ReactNode;
  isPopular?: boolean;
}

export const pricingPlansData: PricingPlanData[] = [
  {
    id: "basic",
    title: "Basic",
    price: "$5",
    description: "Essential career tools and resources to get started",
    icon: <BadgeDollarSign className="w-7 h-7 text-muted-foreground" />,
    features: [
      { text: "Career dashboard" },
      { text: "Basic skills tracking" },
      { text: "Document management" },
      { text: "Life design tips" },
    ],
  },
  {
    id: "jobs",
    title: "Jobs Access",
    price: "$9.99",
    description: "Advanced job matching and application tools",
    icon: <Briefcase className="w-7 h-7 text-primary" />,
    isPopular: true,
    features: [
      { text: "Everything in Basic" },
      { text: "<strong>Full access to Jobs section</strong>" },
      { text: "AI job matching" },
      { text: "Auto-apply functionality" },
    ],
  },
  {
    id: "premium",
    title: "Premium",
    price: "$19.99",
    description: "Complete career support and advanced features",
    icon: <BadgeDollarSign className="w-7 h-7 text-muted-foreground" />,
    features: [
      { text: "Everything in Jobs Access" },
      { text: "Monthly group coaching sessions" },
      { text: "Premium newsletter access" },
      { text: "Priority support" },
    ],
  },
];
