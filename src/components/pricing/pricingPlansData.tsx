
import React from "react";
import { BadgeDollarSign, Briefcase, Award } from "lucide-react";

export interface PricingPlanData {
  id: string;
  title: string;
  price: string;
  annualPrice?: string;
  description: string;
  features: { text: string }[];
  icon: React.ReactNode;
  isPopular?: boolean;
  billingPeriod?: "monthly" | "annual";
}

export const pricingPlansData: PricingPlanData[] = [
  {
    id: "basic-monthly",
    title: "Career Essentials",
    price: "$19.99",
    description: "Essential career tools and resources for career growth",
    icon: <BadgeDollarSign className="w-7 h-7 text-muted-foreground" />,
    features: [
      { text: "Complete career dashboard" },
      { text: "Skills tracking & development" },
      { text: "Career asset management" },
      { text: "Basic LinkedIn integration" },
      { text: "Life design fundamentals" },
      { text: "Mental models access" },
      { text: "Daily career tips" },
    ],
    billingPeriod: "monthly"
  },
  {
    id: "basic-annual",
    title: "Career Essentials",
    price: "$119.94",
    annualPrice: "$9.99",
    description: "Essential career tools and resources for career growth",
    icon: <BadgeDollarSign className="w-7 h-7 text-muted-foreground" />,
    features: [
      { text: "Complete career dashboard" },
      { text: "Skills tracking & development" },
      { text: "Career asset management" },
      { text: "Basic LinkedIn integration" },
      { text: "Life design fundamentals" },
      { text: "Mental models access" },
      { text: "Daily career tips" },
      { text: "<strong>SAVE 50% with annual billing</strong>" },
    ],
    billingPeriod: "annual"
  },
  {
    id: "jobs-monthly",
    title: "Career Accelerator",
    price: "$49.99",
    description: "Advanced job matching and automated career growth tools",
    icon: <Briefcase className="w-7 h-7 text-primary" />,
    isPopular: true,
    features: [
      { text: "Everything in Career Essentials" },
      { text: "<strong>Full access to Jobs section</strong>" },
      { text: "<strong>AI job matching & auto-applying</strong>" },
      { text: "AI career coaching" },
      { text: "LinkedIn profile optimization" },
      { text: "ATS-optimized resume generation" },
      { text: "Internal referral system" },
    ],
    billingPeriod: "monthly"
  },
  {
    id: "jobs-annual",
    title: "Career Accelerator",
    price: "$299.94",
    annualPrice: "$24.99",
    description: "Advanced job matching and automated career growth tools",
    icon: <Briefcase className="w-7 h-7 text-primary" />,
    isPopular: true,
    features: [
      { text: "Everything in Career Essentials" },
      { text: "<strong>Full access to Jobs section</strong>" },
      { text: "<strong>AI job matching & auto-applying</strong>" },
      { text: "AI career coaching" },
      { text: "LinkedIn profile optimization" },
      { text: "ATS-optimized resume generation" },
      { text: "Internal referral system" },
      { text: "<strong>SAVE 50% with annual billing</strong>" },
    ],
    billingPeriod: "annual"
  },
  {
    id: "premium-monthly",
    title: "Career Mastery",
    price: "$69.99",
    description: "Complete career ecosystem with executive-level support",
    icon: <Award className="w-7 h-7 text-yellow-500" />,
    features: [
      { text: "Everything in Career Accelerator" },
      { text: "Monthly live group coaching sessions" },
      { text: "Executive networking access" },
      { text: "Personal brand amplification" },
      { text: "Monetize expertise platform" },
      { text: "Business building resources" },
      { text: "Priority internal referrals" },
    ],
    billingPeriod: "monthly"
  },
  {
    id: "premium-annual",
    title: "Career Mastery",
    price: "$419.94",
    annualPrice: "$34.99",
    description: "Complete career ecosystem with executive-level support",
    icon: <Award className="w-7 h-7 text-yellow-500" />,
    features: [
      { text: "Everything in Career Accelerator" },
      { text: "Monthly live group coaching sessions" },
      { text: "Executive networking access" },
      { text: "Personal brand amplification" },
      { text: "Monetize expertise platform" },
      { text: "Business building resources" },
      { text: "Priority internal referrals" },
      { text: "<strong>SAVE 50% with annual billing</strong>" },
    ],
    billingPeriod: "annual"
  },
];

// Filter helper function to get plans by billing period
export const getPlansbyBillingPeriod = (period: "monthly" | "annual") => {
  return pricingPlansData.filter(plan => plan.billingPeriod === period);
};
