
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchProfile } from "@/hooks/useProfileFetch";

interface ProfileData {
  name: string;
  title: string;
  company: string;
  profileImage?: string;
  profileScore: number;
  currentSalary: number;
  targetSalary: number;
  nextReview: string;
  yearsExperience: number;
  industry: string;
  skills: Skill[];
  careerMilestones: CareerMilestone[];
  actionItems: ActionItem[];
  opportunities: Opportunity[];
  recentActivities: Activity[];
}

interface Skill {
  name: string;
  level: number;
  category: string;
  isHighDemand: boolean;
}

interface CareerMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "promotion" | "job" | "education" | "achievement" | "skill";
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  type: "skill" | "network" | "review" | "document";
  link: string;
  dueDate?: string;
}

interface Opportunity {
  type: "career" | "network" | "monetize" | "business";
  title: string;
  description: string;
  recommendation: string;
  link: string;
}

interface Activity {
  id: string;
  type: "job" | "document" | "skill" | "network" | "learning";
  title: string;
  description: string;
  timestamp: string;
}

export const useProfileData = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setIsLoading(true);
        
        // Get current authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError("No authenticated user found");
          setIsLoading(false);
          return;
        }

        // Fetch the user's profile data
        const profileData = await fetchProfile(user.id);

        if (!profileData) {
          // For demo purposes, return mock data
          setData(getMockProfileData());
        } else {
          // Use real profile data when available and merge with mock data
          // for fields that don't exist yet in the database
          setData({
            ...getMockProfileData(),
            name: profileData.full_name || getMockProfileData().name,
            // Add other fields from real profile as needed
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading profile data:", err);
        setError("Failed to load profile data. Please try again later.");
        setIsLoading(false);
        
        toast({
          title: "Error loading profile",
          description: "There was a problem loading your profile data.",
          variant: "destructive",
        });
      }
    };

    loadProfileData();
  }, [toast]);

  return {
    data: data || getMockProfileData(),
    isLoading,
    error,
  };
};

// Mock data for development purposes
const getMockProfileData = (): ProfileData => {
  return {
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    profileScore: 78,
    currentSalary: 115000,
    targetSalary: 145000,
    nextReview: "Dec 15, 2025",
    yearsExperience: 7,
    industry: "Technology",
    skills: [
      { name: "Product Strategy", level: 85, category: "Product", isHighDemand: true },
      { name: "User Experience", level: 72, category: "Design", isHighDemand: true },
      { name: "Market Research", level: 65, category: "Product", isHighDemand: false },
      { name: "Product Analytics", level: 80, category: "Analytics", isHighDemand: true },
      { name: "Cross-functional Leadership", level: 78, category: "Leadership", isHighDemand: true },
      { name: "Agile Methodologies", level: 88, category: "Process", isHighDemand: false },
      { name: "Roadmap Planning", level: 92, category: "Product", isHighDemand: true },
      { name: "Stakeholder Management", level: 75, category: "Leadership", isHighDemand: true },
    ],
    careerMilestones: [
      {
        id: "1",
        date: "2025-01-15",
        title: "Promoted to Senior Product Manager",
        description: "Recognized for exceptional performance and product leadership.",
        type: "promotion"
      },
      {
        id: "2",
        date: "2023-06-10",
        title: "Product Manager at TechCorp",
        description: "Led the development of the company's flagship mobile application.",
        type: "job"
      },
      {
        id: "3",
        date: "2022-03-05",
        title: "Product Certification",
        description: "Completed Advanced Product Management certification.",
        type: "education"
      },
      {
        id: "4",
        date: "2021-08-20",
        title: "Associate Product Manager at StartupX",
        description: "Managed product features resulting in 32% user growth.",
        type: "job"
      },
      {
        id: "5",
        date: "2020-05-15",
        title: "MBA - Product Management Focus",
        description: "Graduated with honors from State University.",
        type: "education"
      }
    ],
    actionItems: [
      {
        id: "a1",
        title: "Update your LinkedIn profile",
        description: "Your profile needs updating with recent accomplishments",
        priority: "high",
        type: "document",
        link: "/personal-brand"
      },
      {
        id: "a2",
        title: "Improve data analytics skills",
        description: "This skill gap could impact your next promotion opportunity",
        priority: "medium",
        type: "skill",
        link: "/skills"
      },
      {
        id: "a3",
        title: "Connect with industry leaders",
        description: "Expand your network with 3 product leaders this month",
        priority: "medium",
        type: "network",
        link: "/networking"
      },
      {
        id: "a4",
        title: "Prepare for performance review",
        description: "Your next review is coming up in 45 days",
        priority: "high",
        type: "review",
        link: "/salary-title"
      },
      {
        id: "a5",
        title: "Update your resume",
        description: "Your resume hasn't been updated in 12 months",
        priority: "low",
        type: "document",
        link: "/career-docs"
      }
    ],
    opportunities: [
      {
        type: "career",
        title: "Director-level readiness",
        description: "You're showing potential for a director-level role in the next 12-18 months.",
        recommendation: "Focus on strategic thinking and cross-functional leadership to prepare for this advancement.",
        link: "/coaching"
      },
      {
        type: "network",
        title: "Industry Conference Speaker",
        description: "Your expertise positions you well for speaking opportunities.",
        recommendation: "Apply to speak at the upcoming ProductCon conference to increase your visibility.",
        link: "/networking"
      },
      {
        type: "monetize",
        title: "Product Management Mentorship",
        description: "Your experience is valuable to junior product managers.",
        recommendation: "Consider offering paid mentorship sessions to monetize your expertise.",
        link: "/monetize-expertise"
      },
      {
        type: "business",
        title: "Product Consulting",
        description: "You have the skills to help startups with product strategy.",
        recommendation: "Start a weekend consulting practice for early-stage startups.",
        link: "/build-business"
      }
    ],
    recentActivities: [
      {
        id: "act1",
        type: "skill",
        title: "Completed Advanced Analytics Course",
        description: "Finished Google Data Analytics Professional Certificate",
        timestamp: "2025-05-01T10:30:00Z"
      },
      {
        id: "act2",
        type: "document",
        title: "Resume Updated",
        description: "Added recent project achievements and leadership experience",
        timestamp: "2025-04-24T15:45:00Z"
      },
      {
        id: "act3",
        type: "network",
        title: "Added 3 New Connections",
        description: "Connected with industry leaders from ProductCon",
        timestamp: "2025-04-15T09:20:00Z"
      },
      {
        id: "act4",
        type: "learning",
        title: "Started Leadership Course",
        description: "Enrolled in Executive Presence for Product Leaders",
        timestamp: "2025-04-10T14:15:00Z"
      },
      {
        id: "act5",
        type: "job",
        title: "Saved Job Opportunity",
        description: "Saved Senior Product Director role at InnovateTech",
        timestamp: "2025-04-05T11:30:00Z"
      }
    ]
  };
};
