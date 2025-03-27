
import { TrendingUp, Users, BookOpen, Briefcase, Award } from "lucide-react";
import { CareerResource } from "@/components/coaching/CareerResources";
import { DevelopmentPlan } from "@/components/coaching/DevelopmentPlans";

// Daily tips data
export const dailyTips = [
  {
    id: 1,
    title: "Negotiation Strategy",
    description: "When negotiating salary, always have a specific number rather than a range. Research shows that mentioning a precise figure like $82,500 rather than $80,000-$85,000 signals that you've done your homework.",
    category: "Salary Negotiation",
    icon: TrendingUp,
  },
  {
    id: 2,
    title: "Leadership Presence",
    description: "Develop 'executive presence' by speaking with confidence, maintaining good posture, and eliminating filler words like 'um' or 'like' from your speech.",
    category: "Leadership",
    icon: Users,
  },
  {
    id: 3,
    title: "Skill Development",
    description: "Allocate 5 hours per week for deliberate skill practice. Focused practice on key skills yields better results than sporadic learning across many areas.",
    category: "Learning",
    icon: BookOpen,
  },
];

// Development plans data
export const developmentPlans: DevelopmentPlan[] = [
  {
    id: 1,
    title: "Leadership Development",
    description: "A structured plan to develop team management and leadership skills",
    progress: 65,
    milestones: [
      { name: "Complete Leadership Fundamentals Course", completed: true },
      { name: "Lead 3 Cross-Functional Projects", completed: true },
      { name: "Mentor 2 Junior Team Members", completed: false },
      { name: "Obtain Leadership Certification", completed: false },
    ]
  },
  {
    id: 2,
    title: "Technical Growth Plan",
    description: "Advancing technical skills in software architecture",
    progress: 40,
    milestones: [
      { name: "Complete System Design Course", completed: true },
      { name: "Contribute to Open Source Project", completed: false },
      { name: "Design Enterprise Architecture", completed: false },
      { name: "Present at Technical Conference", completed: false },
    ]
  }
];

// Career resources data
export const careerResources: CareerResource[] = [
  {
    title: "Salary Negotiations",
    description: "How to effectively negotiate your compensation package",
    links: [
      { text: "Research Industry Standards", url: "#" },
      { text: "Negotiation Scripts", url: "#" },
      { text: "Benefits Evaluation Guide", url: "#" },
    ],
    icon: TrendingUp,
  },
  {
    title: "Performance Reviews",
    description: "Strategies to excel in performance evaluations",
    links: [
      { text: "Self-Assessment Template", url: "#" },
      { text: "Achievement Documentation", url: "#" },
      { text: "Feedback Reception Guide", url: "#" },
    ],
    icon: Award,
  },
  {
    title: "Project Management",
    description: "Resources for effective project planning and execution",
    links: [
      { text: "Agile Methodology Guide", url: "#" },
      { text: "Stakeholder Management", url: "#" },
      { text: "Risk Assessment Framework", url: "#" },
    ],
    icon: Briefcase,
  },
  {
    title: "People Management",
    description: "Develop skills for leading teams effectively",
    links: [
      { text: "Team Motivation Strategies", url: "#" },
      { text: "Conflict Resolution Techniques", url: "#" },
      { text: "Performance Management Guide", url: "#" },
    ],
    icon: Users,
  },
];

// Learning calendar data
export const upcomingLearningActivities = [
  { 
    title: "Project Management Certification", 
    date: "May 15, 2023", 
    type: "Exam",
    priority: "high" as const
  },
  { 
    title: "Leadership Webinar Series", 
    date: "May 10, 2023", 
    type: "Webinar",
    priority: "medium" as const
  },
  { 
    title: "Technical Writing Workshop", 
    date: "May 22, 2023", 
    type: "Workshop",
    priority: "medium" as const
  }
];

export const completedLearningActivities = [
  { 
    title: "Advanced Excel for Data Analysis", 
    date: "April 28, 2023", 
    type: "Course",
    status: "Completed" as const
  },
  { 
    title: "Effective Communication Skills", 
    date: "April 15, 2023", 
    type: "Workshop",
    status: "Completed" as const
  },
  { 
    title: "Strategic Thinking Certificate", 
    date: "March 30, 2023", 
    type: "Certification",
    status: "Completed" as const
  }
];
