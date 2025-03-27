
import React from "react";
import Layout from "@/components/Layout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CareerHealthSection from "@/components/dashboard/CareerHealthSection";
import ActionItemsSection from "@/components/dashboard/ActionItemsSection";
import LifeDesignSection from "@/components/dashboard/LifeDesignSection";
import JobRecommendationsSection from "@/components/dashboard/JobRecommendationsSection";
import ProgressSection from "@/components/dashboard/ProgressSection";
import { Job } from "@/components/jobs/data/types";

const Index = () => {
  // Mock data
  const [careerScore, setCareerScore] = React.useState(76);
  
  const actionItems = [
    {
      title: "Update your LinkedIn profile",
      description: "Your profile hasn't been updated in 3 months",
      priority: "high" as const,
    },
    {
      title: "Take the Product Strategy assessment",
      description: "Validate your skills with a certification",
      priority: "medium" as const,
    },
    {
      title: "Connect resume to ATS",
      description: "Improve application tracking",
      priority: "medium" as const,
    },
    {
      title: "Calculate your market salary",
      description: "See where you stand in the market",
      priority: "high" as const,
    }
  ];

  // Recommended jobs data
  const recommendedJobs: Job[] = [
    {
      title: "Senior Product Manager",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      postedDate: "2 days ago",
      matchScore: 92,
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Analytics"],
      isRecommended: true,
      status: "recommended",
      source: "LinkedIn",
      applicationStatus: "not_applied"
    },
    {
      title: "Product Marketing Lead",
      company: "InnovateLabs",
      location: "Remote",
      salary: "$110K - $135K",
      postedDate: "1 week ago",
      matchScore: 87,
      skills: ["Marketing Strategy", "Product Launches", "Analytics", "Content Strategy"],
      isRecommended: true,
      status: "recommended",
      source: "AngelList",
      applicationStatus: "not_applied"
    }
  ];

  return (
    <Layout>
      <div className="page-container">
        <DashboardHeader />

        {/* Career Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CareerHealthSection careerScore={careerScore} />
          <ActionItemsSection actionItems={actionItems} />
          <LifeDesignSection />
        </div>
        
        {/* Progress-based Dashboard */}
        <ProgressSection />
        
        {/* Job Recommendations */}
        <JobRecommendationsSection jobs={recommendedJobs} />
      </div>
    </Layout>
  );
};

export default Index;
