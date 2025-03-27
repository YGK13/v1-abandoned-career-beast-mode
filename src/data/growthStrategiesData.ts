
import { 
  Megaphone, 
  Settings,
  Users, 
  BadgePercent, 
  BarChart 
} from "lucide-react";

export interface StrategyTip {
  id: number;
  title: string;
  description: string;
}

export interface StrategyCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  tips: StrategyTip[];
}

// Sample strategy data
export const growthStrategies: StrategyCategory[] = [
  {
    id: "marketing",
    name: "Marketing",
    icon: Megaphone,
    tips: [
      {
        id: 1,
        title: "Content Marketing Strategy",
        description: "Develop a comprehensive content calendar focusing on your audience's pain points and questions. Use a mix of blog posts, videos, and infographics to engage different learning styles."
      },
      {
        id: 2,
        title: "Social Media Consistency",
        description: "Choose 2-3 platforms where your audience is most active. Post consistently using a content calendar and focus on engagement rather than follower count."
      },
      {
        id: 3,
        title: "Email List Building",
        description: "Offer high-value lead magnets like guides or templates. Segment your email list based on user behavior and interests for more targeted campaigns."
      },
      {
        id: 4,
        title: "SEO Optimization",
        description: "Conduct keyword research focused on long-tail keywords with lower competition. Create comprehensive content clusters around main topics in your industry."
      },
      {
        id: 5,
        title: "Customer Testimonials",
        description: "Collect and showcase detailed customer success stories that highlight specific results. Use video testimonials for higher engagement and trust building."
      }
    ]
  },
  {
    id: "operations",
    name: "Operations",
    icon: Settings,
    tips: [
      {
        id: 1,
        title: "Process Documentation",
        description: "Document all core business processes with step-by-step guides, video tutorials, and clear ownership assignments to enable delegation and consistent execution."
      },
      {
        id: 2,
        title: "Tech Stack Assessment",
        description: "Regularly audit your technology stack to identify redundancies and integration opportunities. Focus on tools that scale with your growth needs."
      },
      {
        id: 3,
        title: "Inventory Management",
        description: "Implement just-in-time inventory practices to reduce carrying costs. Use inventory management software with predictive analytics for demand forecasting."
      },
      {
        id: 4,
        title: "Quality Control Systems",
        description: "Establish clear quality metrics and checkpoints throughout your production or service delivery process. Create feedback loops for continuous improvement."
      },
      {
        id: 5,
        title: "Operational KPIs",
        description: "Track 5-7 key operational metrics that directly impact your strategic goals. Create a dashboard for real-time visibility and set regular review periods."
      }
    ]
  },
  {
    id: "hiring",
    name: "Hiring",
    icon: Users,
    tips: [
      {
        id: 1,
        title: "Employer Branding",
        description: "Develop a compelling employer value proposition that highlights your company culture and growth opportunities. Showcase team stories on your careers page."
      },
      {
        id: 2,
        title: "Structured Interview Process",
        description: "Create a consistent interview framework with specific questions tied to your core values and role requirements. Train all interviewers on bias reduction."
      },
      {
        id: 3,
        title: "Contractor to Full-Time Pipeline",
        description: "Test potential hires through project-based contracts before offering full-time positions. This reduces hiring risks while building relationships."
      },
      {
        id: 4,
        title: "Onboarding Systems",
        description: "Develop a 30-60-90 day onboarding plan for each role with clear milestones and learning objectives. Assign mentors to new team members."
      },
      {
        id: 5,
        title: "Cultural Fit Assessment",
        description: "Define your core values in behavioral terms and create interview questions that reveal alignment. Include team members in the interview process for cultural input."
      }
    ]
  },
  {
    id: "finance",
    name: "Finance",
    icon: BadgePercent,
    tips: [
      {
        id: 1,
        title: "Cash Flow Forecasting",
        description: "Create a 13-week rolling cash flow forecast updated weekly. Identify potential shortfalls early and maintain a cash reserve of at least 3 months' operating expenses."
      },
      {
        id: 2,
        title: "Pricing Strategy Review",
        description: "Conduct quarterly pricing reviews based on cost changes, competitor analysis, and value perception. Test price increases with specific customer segments."
      },
      {
        id: 3,
        title: "Financial Dashboard",
        description: "Build a financial dashboard tracking 5-7 key metrics including cash runway, customer acquisition cost, and lifetime value. Review weekly with leadership."
      },
      {
        id: 4,
        title: "Revenue Diversification",
        description: "Identify 2-3 complementary revenue streams that leverage your existing capabilities. Start with small experiments before full investment."
      },
      {
        id: 5,
        title: "Strategic Cost Reduction",
        description: "Analyze expenses by ROI rather than just total cost. Prioritize investments in areas directly tied to your competitive advantage."
      }
    ]
  },
  {
    id: "growth",
    name: "Growth Strategy",
    icon: BarChart,
    tips: [
      {
        id: 1,
        title: "Customer Segmentation",
        description: "Analyze your customer base to identify your most profitable and loyal segments. Focus expansion efforts on acquiring similar customers."
      },
      {
        id: 2,
        title: "Strategic Partnerships",
        description: "Identify potential partners with complementary products or services and overlapping customer bases. Start with limited co-marketing initiatives."
      },
      {
        id: 3,
        title: "Expansion Roadmap",
        description: "Create a 12-month expansion plan with clear milestones for new markets, products, or services. Validate assumptions with small tests before major investments."
      },
      {
        id: 4,
        title: "Competitive Analysis",
        description: "Conduct quarterly analysis of direct and indirect competitors. Identify gaps in the market that align with your unique capabilities."
      },
      {
        id: 5,
        title: "Referral Program",
        description: "Implement a structured referral program with meaningful incentives for both the referrer and new customer. Make the referral process simple and trackable."
      }
    ]
  }
];
