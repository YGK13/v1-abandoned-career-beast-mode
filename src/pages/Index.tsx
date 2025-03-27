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
import { Award, Briefcase, FileText, User, Users, Calendar, Trophy, Target, Network, GraduationCap } from "lucide-react";
import { Job } from "@/components/jobs/data/types";

const Index = () => {
  // Mock data
  const [careerScore, setCareerScore] = useState(76);
  const [featuredSkills] = useState([
    { name: "Project Management", level: 85, category: "Leadership", trend: "up" as const, isInDemand: true },
    { name: "Data Analysis", level: 72, category: "Technical", trend: "up" as const, isInDemand: true },
    { name: "Public Speaking", level: 65, category: "Soft Skills", trend: "stable" as const, isInDemand: false },
  ]);
  const [recommendedJobs] = useState<Job[]>([
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
    },
    {
      title: "Calculate your market salary",
      description: "See where you stand in the market",
      priority: "high" as const,
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

  // Promotion sections array - updated to reflect new menu order
  const promoSections = [
    {
      icon: Target,
      title: "Accelerate Salary & Title Growth",
      description: "Use data-driven strategies and proven timelines to maximize your compensation and advance your career.",
      buttonText: "Salary Calculator",
      buttonLink: "/salary-title",
      highlight: true
    },
    {
      icon: Award,
      title: "Enhance Your Skills",
      description: "Analyze your current skills, identify gaps, and create development plans tailored to your goals.",
      buttonText: "View Skills",
      buttonLink: "/skills"
    },
    {
      icon: GraduationCap,
      title: "Get Career Coaching",
      description: "Access personalized guidance and mentorship to navigate your professional journey effectively.",
      buttonText: "Start Coaching",
      buttonLink: "/coaching"
    },
    {
      icon: Network,
      title: "Expand Your Network",
      description: "Connect with industry professionals and join relevant groups to strengthen your network.",
      buttonText: "Network Now",
      buttonLink: "/networking"
    },
    {
      icon: User,
      title: "Build Your Personal Brand",
      description: "Track PR opportunities and monitor media mentions to boost your professional visibility.",
      buttonText: "Manage Your Brand",
      buttonLink: "/personal-brand"
    },
    {
      icon: Trophy,
      title: "Monetize Your Expertise",
      description: "Discover platforms and strategies to turn your knowledge into income streams.",
      buttonText: "Explore Options",
      buttonLink: "/monetize-expertise"
    },
    {
      icon: Briefcase,
      title: "Find Your Dream Job",
      description: "Browse job opportunities tailored to your skills and career goals with our job matching system.",
      buttonText: "View Jobs",
      buttonLink: "/jobs"
    },
    {
      icon: FileText,
      title: "Organize Your Career Assets",
      description: "Centralize resumes, certifications, and professional documents in one secure location.",
      buttonText: "Access Career Docs",
      buttonLink: "/career-docs"
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
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promoSections.map((section, index) => (
              <CareerPromoSection
                key={index}
                icon={section.icon}
                title={section.title}
                description={section.description}
                buttonText={section.buttonText}
                buttonLink={section.buttonLink}
                highlight={section.highlight}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
