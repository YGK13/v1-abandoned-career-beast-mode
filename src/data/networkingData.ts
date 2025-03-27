
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Code, 
  Building, 
  BarChart, 
  BookOpen,
  LineChart,
  PenTool,
  Network,
  Landmark,
  LucideIcon
} from "lucide-react";

export type ConnectionType = 'industry' | 'skill' | 'company' | 'alumni';

export interface PersonRecommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  imageUrl?: string;
  linkedinUrl: string;
  connectionType: ConnectionType;
  connectionReason: string;
  tags: string[];
  mutualConnections?: number;
}

export interface IndustryGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: LucideIcon;
  url: string;
  valueProposition: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  time: string;
  location?: string;
}

export interface LocalGroup {
  id: string;
  name: string;
  description: string;
  location: string;
  url: string;
  upcomingEvent?: UpcomingEvent;
}

export interface ExecutivePlatform {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  url: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
}

// Mock data for person recommendations
export const personRecommendations: PersonRecommendation[] = [
  {
    id: "p1",
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    company: "TechCorp Solutions",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "industry",
    connectionReason: "Works in your target industry with similar skills in product management",
    tags: ["Product Management", "SaaS", "Strategic Planning"],
    mutualConnections: 3
  },
  {
    id: "p2",
    name: "Michael Chen",
    title: "Engineering Director",
    company: "InnovateTech",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "skill",
    connectionReason: "Expertise in software architecture matching your technical background",
    tags: ["Software Architecture", "Leadership", "Cloud Computing"],
    mutualConnections: 5
  },
  {
    id: "p3",
    name: "Rachel Rodriguez",
    title: "VP of Marketing",
    company: "GrowthFirst",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "industry",
    connectionReason: "Leader in digital marketing with potential partnership opportunities",
    tags: ["Digital Marketing", "Growth Strategy", "B2B"],
    mutualConnections: 2
  },
  {
    id: "p4",
    name: "David Williams",
    title: "Chief Financial Officer",
    company: "Capital Investments",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "company",
    connectionReason: "Works at a company you've shown interest in based on your profile",
    tags: ["Finance", "Investment", "Strategic Planning"],
    mutualConnections: 1
  },
  {
    id: "p5",
    name: "Jennifer Baker",
    title: "Talent Acquisition Specialist",
    company: "Dream Recruiters",
    imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "industry",
    connectionReason: "Can provide industry insights and potential job opportunities",
    tags: ["Recruitment", "HR", "Talent Management"],
    mutualConnections: 0
  },
  {
    id: "p6",
    name: "Thomas Clark",
    title: "Alumni Relations Manager",
    company: "University of Technology",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    linkedinUrl: "https://linkedin.com/",
    connectionType: "alumni",
    connectionReason: "Fellow alumni from your university who can help expand your network",
    tags: ["Higher Education", "Alumni Networks", "Event Planning"],
    mutualConnections: 7
  }
];

// Mock data for industry groups
export const industryGroups: IndustryGroup[] = [
  {
    id: "ig1",
    name: "Tech Professionals Network",
    description: "A global community of technology professionals sharing insights and opportunities across all tech domains.",
    memberCount: 352000,
    icon: Code,
    url: "https://example.com/tech-professionals",
    valueProposition: "Access to job postings, technical discussions, and mentorship opportunities from industry leaders."
  },
  {
    id: "ig2",
    name: "Digital Marketing Alliance",
    description: "Connect with marketers, strategists, and growth hackers focused on the latest digital marketing techniques.",
    memberCount: 187500,
    icon: LineChart,
    url: "https://example.com/digital-marketing-alliance",
    valueProposition: "Weekly webinars, case studies, and networking events with marketing executives and thought leaders."
  },
  {
    id: "ig3",
    name: "Product Management Collective",
    description: "A dedicated community for product managers to share best practices, tools, and job opportunities.",
    memberCount: 124800,
    icon: PenTool,
    url: "https://example.com/pm-collective",
    valueProposition: "Access to exclusive product frameworks, templates, and networking with senior PMs from top companies."
  },
  {
    id: "ig4",
    name: "Finance & Investment Professionals",
    description: "A network for finance professionals sharing market insights, career advice, and industry trends.",
    memberCount: 290000,
    icon: BarChart,
    url: "https://example.com/finance-professionals",
    valueProposition: "Market analysis, regulatory updates, and connections with financial institutions and investment firms."
  }
];

// Mock data for local groups
export const localGroups: LocalGroup[] = [
  {
    id: "lg1",
    name: "City Tech Meetup",
    description: "Monthly gatherings of local tech professionals for networking, talks, and demos.",
    location: "San Francisco, CA",
    url: "https://example.com/city-tech-meetup",
    upcomingEvent: {
      title: "AI in Production: Lessons from the Field",
      date: "June 15, 2023",
      time: "6:30 PM - 9:00 PM"
    }
  },
  {
    id: "lg2",
    name: "Entrepreneurs Roundtable",
    description: "A forum for local business owners and entrepreneurs to share experiences and advice.",
    location: "San Francisco, CA",
    url: "https://example.com/entrepreneurs-roundtable",
    upcomingEvent: {
      title: "Funding Strategies for Early-Stage Startups",
      date: "June 22, 2023",
      time: "7:00 PM - 8:30 PM"
    }
  },
  {
    id: "lg3",
    name: "Women in Leadership Alliance",
    description: "Supporting and connecting women in leadership positions across all industries.",
    location: "San Francisco, CA",
    url: "https://example.com/women-leadership",
    upcomingEvent: {
      title: "Breaking Barriers: Leadership Stories",
      date: "July 5, 2023",
      time: "5:30 PM - 8:00 PM"
    }
  }
];

// Mock data for executive platforms
export const executivePlatforms: ExecutivePlatform[] = [
  {
    id: "ep1",
    name: "ExecConnect",
    description: "Platform connecting seasoned executives with companies needing strategic leadership on a fractional basis.",
    url: "https://example.com/execconnect",
    specialties: ["C-Suite", "Strategy", "Transformation"],
    rating: 4.8,
    reviewCount: 324
  },
  {
    id: "ep2",
    name: "Interim Leaders",
    description: "Marketplace for interim executive talent across finance, technology, and operations roles.",
    url: "https://example.com/interim-leaders",
    specialties: ["CFO", "CTO", "COO", "Interim"],
    rating: 4.6,
    reviewCount: 218
  },
  {
    id: "ep3",
    name: "StrategyExperts",
    description: "Connect with companies seeking part-time strategic advisors and board members with industry expertise.",
    url: "https://example.com/strategy-experts",
    specialties: ["Advisory", "Board Roles", "Strategy"],
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: "ep4",
    name: "CXO Network",
    description: "Premium network for C-level executives to find fractional and advisory opportunities in growing companies.",
    url: "https://example.com/cxo-network",
    specialties: ["Executive", "Leadership", "Advisory"],
    rating: 4.9,
    reviewCount: 287
  },
  {
    id: "ep5",
    name: "GrowthAdvisors",
    description: "Platform connecting startups and scale-ups with experienced executives for part-time leadership roles.",
    url: "https://example.com/growth-advisors",
    specialties: ["Startup", "Scale-up", "Growth"],
    rating: 4.5,
    reviewCount: 132
  },
  {
    id: "ep6",
    name: "Executive On Demand",
    description: "Flexible executive talent platform for project-based and interim leadership needs across industries.",
    url: "https://example.com/exec-on-demand",
    specialties: ["Project-Based", "Interim", "Cross-Industry"],
    rating: 4.7,
    reviewCount: 195
  }
];
