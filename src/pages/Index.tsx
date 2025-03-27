
import React from "react";
import Layout from "@/components/Layout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CareerHealthSection from "@/components/dashboard/CareerHealthSection";
import ActionItemsSection from "@/components/dashboard/ActionItemsSection";
import JobRecommendationsSection from "@/components/dashboard/JobRecommendationsSection";
import ProgressSection from "@/components/dashboard/ProgressSection";
import { Job } from "@/components/jobs/data/types";
import { Clock, Briefcase, Lightbulb, Globe, FileText } from "lucide-react";

const Index = () => {
  // Mock data
  const [careerScore, setCareerScore] = React.useState(76);
  
  const actionItems = [
    {
      title: "Update your LinkedIn profile",
      description: "Optimize your profile to increase visibility to recruiters",
      priority: "high" as const,
      icon: <Globe size={16} />,
      cta: "Update LinkedIn",
      link: "/linkedin"
    },
    {
      title: "Add your professional bio",
      description: "Create a bio to use across platforms and applications",
      priority: "medium" as const,
      icon: <FileText size={16} />,
      cta: "Create Bio",
      link: "/career-docs"
    },
    {
      title: "Explore monetization options",
      description: "Discover 15+ platforms to monetize your expertise",
      priority: "medium" as const,
      icon: <Lightbulb size={16} />,
      cta: "View Platforms",
      link: "/monetize-expertise"
    },
    {
      title: "Review latest job matches",
      description: "5 new jobs matching your profile were found this week",
      priority: "high" as const,
      icon: <Briefcase size={16} />,
      cta: "See Jobs",
      link: "/jobs"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CareerHealthSection careerScore={careerScore} />
          <ActionItemsSection actionItems={actionItems} />
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
