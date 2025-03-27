
import { DollarSign, Users, Briefcase, Globe, BookOpen, PieChart, FileText, Presentation } from "lucide-react";

export interface ExpertPlatform {
  id: string;
  name: string;
  description: string;
  icon: any;
  payRange: string;
  requirements: string[];
  applicationProcess: string;
  benefits: string[];
  industries: string[];
  link: string;
}

export const expertPlatforms: ExpertPlatform[] = [
  {
    id: "glg",
    name: "Gerson Lehrman Group (GLG)",
    description: "GLG connects businesses with experts for consultation and insights across various industries.",
    icon: BookOpen,
    payRange: "$500-$1,000+ per hour",
    requirements: [
      "Minimum 5 years professional experience",
      "Industry expertise",
      "Professional credentials in your field",
      "Strong communication skills"
    ],
    applicationProcess: "Apply online with your LinkedIn profile, complete a screening interview, then join their network.",
    benefits: [
      "Flexible schedule",
      "Set your own rates",
      "Work with top companies",
      "Expand your professional network"
    ],
    industries: ["Finance", "Healthcare", "Technology", "Legal", "Energy"],
    link: "https://glginsights.com/experts/"
  },
  {
    id: "toptal",
    name: "Toptal",
    description: "Toptal connects businesses with top 3% of freelance talent in software development, design, and business consulting.",
    icon: Users,
    payRange: "$60-$200+ per hour",
    requirements: [
      "Top 3% in your field",
      "Strong technical expertise",
      "Full-time availability preferred",
      "English proficiency",
      "Reliable internet connection"
    ],
    applicationProcess: "5-step screening process including language and personality assessment, test projects, and live screening.",
    benefits: [
      "Premium clients",
      "Consistent work opportunities",
      "Community of elite professionals",
      "Dedicated placement team"
    ],
    industries: ["Software Development", "Design", "Finance", "Project Management", "Product Management"],
    link: "https://www.toptal.com/talent/apply"
  },
  {
    id: "catalant",
    name: "Catalant",
    description: "Catalant connects companies with independent consultants and experts for strategic projects.",
    icon: Briefcase,
    payRange: "$100-$300+ per hour",
    requirements: [
      "Consulting background preferred",
      "MBA or advanced degree",
      "Industry expertise",
      "5+ years experience"
    ],
    applicationProcess: "Create a profile, set your rates, list your expertise, and Catalant's algorithm will match you with projects.",
    benefits: [
      "Work with Fortune 1000 companies",
      "Project-based work",
      "Control over project selection",
      "Access to premium consulting opportunities"
    ],
    industries: ["Strategy", "Operations", "Marketing", "HR", "Digital"],
    link: "https://gocatalant.com/experts"
  },
  {
    id: "umbrex",
    name: "Umbrex",
    description: "Umbrex is a community of independent consultants with top consulting firm experience (McKinsey, BCG, Bain).",
    icon: Globe,
    payRange: "$200-$500+ per hour",
    requirements: [
      "Previous experience at a top-tier consulting firm",
      "Advanced degree preferred",
      "Industry expertise",
      "Independent consulting practice"
    ],
    applicationProcess: "Apply online, reference check, interview with founder, then join the community.",
    benefits: [
      "Community of elite consultants",
      "Project referrals",
      "Professional development",
      "Marketing support"
    ],
    industries: ["Strategy", "Private Equity", "Digital Transformation", "Operations", "Marketing"],
    link: "https://umbrex.com/join/"
  },
  {
    id: "tegus",
    name: "Tegus",
    description: "Tegus connects institutional investors with industry experts for insights on companies and markets.",
    icon: PieChart,
    payRange: "$400-$1,000+ per hour",
    requirements: [
      "Industry expertise",
      "Minimum 5 years professional experience",
      "Current or former executive preferred",
      "No conflicts of interest with public companies"
    ],
    applicationProcess: "Apply online, screening call, then join their expert network.",
    benefits: [
      "Flexible call scheduling",
      "Fixed compensation per call",
      "Learn about investor perspectives",
      "Business development opportunities"
    ],
    industries: ["Investment", "Finance", "Technology", "Healthcare", "Consumer"],
    link: "https://www.tegus.com/experts/"
  },
  {
    id: "third-bridge",
    name: "Third Bridge",
    description: "Third Bridge provides investment research and expert consultation services to private equity firms, hedge funds, and strategy consultants.",
    icon: FileText,
    payRange: "$300-$800+ per hour",
    requirements: [
      "Industry expertise",
      "7+ years professional experience",
      "No material non-public information conflicts",
      "Strong communication skills"
    ],
    applicationProcess: "Register online, complete compliance training, then join their expert network.",
    benefits: [
      "Consultation opportunities with investment firms",
      "Industry forum participation",
      "Flexible scheduling",
      "Professional networking"
    ],
    industries: ["Private Equity", "Investment Banking", "Venture Capital", "Consulting", "Corporate Strategy"],
    link: "https://www.thirdbridge.com/join-our-forum"
  },
  {
    id: "alphasights",
    name: "AlphaSights",
    description: "AlphaSights connects professionals with specialized expertise to clients seeking specific industry insights.",
    icon: Presentation,
    payRange: "$400-$1,000+ per hour",
    requirements: [
      "Deep industry knowledge",
      "5+ years of professional experience",
      "Current or former executive position preferred",
      "Compliance with confidentiality policies"
    ],
    applicationProcess: "Register as an advisor, complete a screening call, then join their network.",
    benefits: [
      "Thought leadership opportunities",
      "Professional networking",
      "Competitive compensation",
      "Flexible engagement options"
    ],
    industries: ["Management Consulting", "Financial Services", "Healthcare", "Technology", "Consumer Goods"],
    link: "https://www.alphasights.com/advisors/"
  }
];

// Get a random platform for daily tip
export const getRandomPlatform = (): ExpertPlatform => {
  const randomIndex = Math.floor(Math.random() * expertPlatforms.length);
  return expertPlatforms[randomIndex];
};

// Get platforms limited to first three
export const getInitialPlatforms = (): ExpertPlatform[] => {
  return expertPlatforms.slice(0, 3);
};

// Get all platforms
export const getAllPlatforms = (): ExpertPlatform[] => {
  return expertPlatforms;
};

// Find platform by ID
export const getPlatformById = (id: string): ExpertPlatform | undefined => {
  return expertPlatforms.find(platform => platform.id === id);
};
