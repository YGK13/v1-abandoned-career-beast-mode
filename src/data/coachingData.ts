
import { TrendingUp, Users, BookOpen, Briefcase, Award, FileText, Clipboard, BarChart, Calendar, GraduationCap, Zap, Target, Link, MessageCircle, Clock } from "lucide-react";
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
      { text: "Counter-Offer Templates", url: "#" },
      { text: "Total Compensation Calculator", url: "#" },
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
      { text: "360-Degree Review Preparation", url: "#" },
      { text: "Goal Setting Framework", url: "#" },
    ],
    icon: Award,
  },
  {
    title: "Resume Building",
    description: "Create a standout resume that gets results",
    links: [
      { text: "Achievement-Based Resume Templates", url: "#" },
      { text: "Industry-Specific Keywords Guide", url: "#" },
      { text: "Applicant Tracking System Tips", url: "#" },
      { text: "Executive Resume Samples", url: "#" },
      { text: "Resume Review Checklist", url: "#" },
    ],
    icon: FileText,
  },
  {
    title: "Interview Preparation",
    description: "Master interview techniques for any position",
    links: [
      { text: "STAR-L Response Framework", url: "#" },
      { text: "Behavioral Question Database", url: "#" },
      { text: "Technical Interview Guides", url: "#" },
      { text: "Case Study Interview Practice", url: "#" },
      { text: "Post-Interview Follow-up Templates", url: "#" },
    ],
    icon: Clipboard,
  },
  {
    title: "Career Transition",
    description: "Navigate successful career changes with confidence",
    links: [
      { text: "Transferable Skills Assessment", url: "#" },
      { text: "Industry Transition Roadmaps", url: "#" },
      { text: "Career Pivot Narrative Templates", url: "#" },
      { text: "Informational Interview Guide", url: "#" },
      { text: "Skills Gap Analysis Tool", url: "#" },
    ],
    icon: Target,
  },
  {
    title: "Project Management",
    description: "Resources for effective project planning and execution",
    links: [
      { text: "Agile Methodology Guide", url: "#" },
      { text: "Stakeholder Management", url: "#" },
      { text: "Risk Assessment Framework", url: "#" },
      { text: "Project Documentation Templates", url: "#" },
      { text: "Cross-functional Team Leadership", url: "#" },
    ],
    icon: Briefcase,
  },
  {
    title: "Leadership Development",
    description: "Build your leadership capabilities at any level",
    links: [
      { text: "Emotional Intelligence Assessment", url: "#" },
      { text: "Strategic Delegation Framework", url: "#" },
      { text: "Team Motivation Strategies", url: "#" },
      { text: "Difficult Conversation Scripts", url: "#" },
      { text: "Executive Presence Development", url: "#" },
    ],
    icon: Users,
  },
  {
    title: "Continuous Learning",
    description: "Strategic skill development for your career path",
    links: [
      { text: "Personal Skill Development Matrix", url: "#" },
      { text: "High-ROI Certification Guide", url: "#" },
      { text: "Learning Accountability System", url: "#" },
      { text: "Knowledge Management Templates", url: "#" },
      { text: "Skill Practice Implementation Plan", url: "#" },
    ],
    icon: GraduationCap,
  },
  {
    title: "Networking Strategy",
    description: "Build and maintain a powerful professional network",
    links: [
      { text: "Relationship Portfolio Template", url: "#" },
      { text: "Give-First Value Matrix", url: "#" },
      { text: "Connection Nurturing System", url: "#" },
      { text: "Strategic Event Selection Guide", url: "#" },
      { text: "Network Diversity Assessment", url: "#" },
    ],
    icon: Link,
  },
  {
    title: "Productivity Systems",
    description: "Optimize your work habits for maximum impact",
    links: [
      { text: "Energy Management Audit", url: "#" },
      { text: "Deep Work Scheduling Templates", url: "#" },
      { text: "Decision-Making Frameworks", url: "#" },
      { text: "Personal Kanban System", url: "#" },
      { text: "Meeting Efficiency Protocols", url: "#" },
    ],
    icon: Zap,
  },
  {
    title: "Personal Branding",
    description: "Develop and manage your professional reputation",
    links: [
      { text: "Brand Statement Generator", url: "#" },
      { text: "Content Strategy Templates", url: "#" },
      { text: "Online Presence Audit", url: "#" },
      { text: "Thought Leadership Framework", url: "#" },
      { text: "Speaking Opportunity Guide", url: "#" },
    ],
    icon: BookOpen,
  },
  {
    title: "Data Storytelling",
    description: "Present information in compelling, impactful ways",
    links: [
      { text: "Data Visualization Best Practices", url: "#" },
      { text: "Executive Presentation Templates", url: "#" },
      { text: "Numerical Narrative Frameworks", url: "#" },
      { text: "Impact Quantification Tools", url: "#" },
      { text: "Business Case Development", url: "#" },
    ],
    icon: BarChart,
  }
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
