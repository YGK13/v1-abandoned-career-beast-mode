
import { 
  Code, 
  BarChart, 
  PenTool,
  LineChart,
} from "lucide-react";
import { IndustryGroup } from "./types";

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
