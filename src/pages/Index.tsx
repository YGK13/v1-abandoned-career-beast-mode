
import React, { useState } from "react";
import Layout from "@/components/Layout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CareerHealthSection from "@/components/dashboard/CareerHealthSection";
import ActionItemsSection from "@/components/dashboard/ActionItemsSection";
import FeaturedSkillsSection from "@/components/dashboard/FeaturedSkillsSection";
import UpcomingEventsSection from "@/components/dashboard/UpcomingEventsSection";
import JobRecommendationsSection from "@/components/dashboard/JobRecommendationsSection";
import CareerPromoSection from "@/components/dashboard/CareerPromoSection";
import LifeDesignSection from "@/components/dashboard/LifeDesignSection";

const Index = () => {
  // Mock data
  const [careerScore, setCareerScore] = useState(76);
  const [featuredSkills] = useState([
    { name: "Project Management", level: 85, category: "Leadership", trend: "up" as const, isInDemand: true },
    { name: "Data Analysis", level: 72, category: "Technical", trend: "up" as const, isInDemand: true },
    { name: "Public Speaking", level: 65, category: "Soft Skills", trend: "stable" as const, isInDemand: false },
  ]);
  const [recommendedJobs] = useState([
    {
      title: "Senior Product Manager",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      postedDate: "2 days ago",
      matchScore: 92,
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Analytics"],
      isRecommended: true
    },
    {
      title: "Product Marketing Lead",
      company: "InnovateLabs",
      location: "Remote",
      salary: "$110K - $135K",
      postedDate: "1 week ago",
      matchScore: 87,
      skills: ["Marketing Strategy", "Product Launches", "Analytics", "Content Strategy"],
      isRecommended: true
    }
  ]);
  
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
    }
  ];

  const upcomingEvents = [
    {
      title: "Quarterly Performance Review",
      date: "Jun 15, 2023",
      time: "10:00 AM",
    },
    {
      title: "Product Management Conference",
      date: "Jul 8-10, 2023",
      time: "All day",
    }
  ];

  return (
    <Layout>
      <div className="page-container">
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CareerHealthSection careerScore={careerScore} />
          <ActionItemsSection actionItems={actionItems} />
          <LifeDesignSection />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FeaturedSkillsSection skills={featuredSkills} />
          <UpcomingEventsSection events={upcomingEvents} />
        </div>
        
        <JobRecommendationsSection jobs={recommendedJobs} />
        
        <CareerPromoSection />
      </div>
    </Layout>
  );
};

export default Index;
