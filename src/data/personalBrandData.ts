
import { useQuery } from "@tanstack/react-query";

export type PROppSource = 
  | "Qwoted" 
  | "HARO" 
  | "Featured" 
  | "Help a B2B Writer" 
  | "JournoRequests" 
  | "ResponseSource" 
  | "MuckRack" 
  | "ProfNet"
  | "SourceBottle";

export interface PROpportunity {
  id: string;
  title: string;
  description: string;
  source: PROppSource;
  deadline?: string;
  link: string;
  category: string;
  datePosted: string;
}

export interface MediaMention {
  id: string;
  title: string;
  url: string;
  publicationName: string;
  publicationLogo?: string;
  date: string;
  type: "Article" | "Podcast" | "Video" | "Social" | "Other";
  snippet?: string;
  isNew?: boolean;
}

// Mock data function to simulate fetching PR opportunities from APIs
export const fetchPROpportunities = async (): Promise<PROpportunity[]> => {
  // In a real application, this would be an API call to various PR platforms
  // For demo purposes, we're returning mock data
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  return [
    {
      id: "qwoted-1",
      title: "Looking for experts on remote work trends",
      description: "Working on a piece about the future of remote work post-pandemic. Seeking insights from HR professionals, company leaders, and workplace strategists.",
      source: "Qwoted",
      deadline: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      link: "https://qwoted.com/query/12345",
      category: "Remote Work",
      datePosted: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    {
      id: "helpb2b-1",
      title: "Need B2B marketers for article on content strategy",
      description: "Looking for B2B marketing leaders to share insights on content strategy evolution in 2023. How are you measuring content effectiveness?",
      source: "Help a B2B Writer",
      deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      link: "https://helpab2bwriter.com/query/27891",
      category: "Marketing",
      datePosted: new Date().toISOString() // Today
    },
    {
      id: "featured-1",
      title: "Startup founders for feature on AI implementation",
      description: "Writing a feature about how startups are implementing AI to solve real-world problems. Looking for founders with innovative approaches.",
      source: "Featured",
      deadline: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
      link: "https://featured.com/opportunities/ai-innovation",
      category: "Technology",
      datePosted: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
    },
    {
      id: "journo-1",
      title: "Financial advisors for retirement planning article",
      description: "Seeking certified financial advisors to comment on retirement planning strategies for millennials in uncertain economic conditions.",
      source: "JournoRequests",
      deadline: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
      link: "https://journorequests.com/query/finance-retirement",
      category: "Finance",
      datePosted: new Date(Date.now() - 86400000 * 1).toISOString() // 1 day ago
    },
    {
      id: "response-1",
      title: "Cybersecurity experts for data breach prevention feature",
      description: "Looking for cybersecurity specialists to provide insights on the latest data breach prevention strategies for small businesses.",
      source: "ResponseSource",
      deadline: new Date(Date.now() + 86400000 * 4).toISOString(), // 4 days from now
      link: "https://responsesource.com/query/cybersecurity-feature",
      category: "Cybersecurity",
      datePosted: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
    },
    {
      id: "muckrack-1",
      title: "E-commerce trends from retail executives",
      description: "Writing about how e-commerce is evolving in 2023. Looking for retail executives to share insights on consumer behavior shifts and technology adoption.",
      source: "MuckRack",
      deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      link: "https://muckrack.com/query/ecommerce-trends-2023",
      category: "Retail",
      datePosted: new Date().toISOString() // Today
    },
    {
      id: "sourcebottle-1",
      title: "Mental health experts for workplace wellness piece",
      description: "Seeking psychologists and workplace wellness experts to comment on strategies for supporting employee mental health in high-pressure industries.",
      source: "SourceBottle",
      deadline: new Date(Date.now() + 86400000 * 6).toISOString(), // 6 days from now
      link: "https://sourcebottle.com/query/workplace-mental-health",
      category: "Health",
      datePosted: new Date(Date.now() - 86400000 * 1).toISOString() // 1 day ago
    },
    {
      id: "profnet-1",
      title: "Sustainable business practices experts needed",
      description: "Working on an article about how companies are implementing sustainable practices that actually impact their bottom line positively.",
      source: "ProfNet",
      deadline: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      link: "https://profnet.com/query/sustainable-business-roi",
      category: "Sustainability",
      datePosted: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
    }
  ];
};

// Mock function to simulate fetching user media mentions
export const fetchUserMentions = async (): Promise<MediaMention[]> => {
  // In a real application, this would be an API call to track mentions
  // For demo purposes, we're returning mock data
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const twoDaysAgo = new Date(currentDate);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const lastWeek = new Date(currentDate);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  return [
    {
      id: "mention-1",
      title: "The Future of Remote Leadership: Insights from Industry Experts",
      url: "https://techbusinessweekly.com/remote-leadership-insights",
      publicationName: "Tech Business Weekly",
      publicationLogo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
      date: yesterday.toISOString(),
      type: "Article",
      snippet: "...according to leadership expert Jane Smith, 'Remote teams require a different approach to management. Trust and clear communication become even more essential...'",
      isNew: true
    },
    {
      id: "mention-2",
      title: "Innovation Leaders Podcast: Episode 47",
      url: "https://innovationleaderspodcast.com/ep47",
      publicationName: "Innovation Leaders Podcast",
      publicationLogo: "https://images.unsplash.com/photo-1603577083869-730e3a0de449?q=80&w=1470&auto=format&fit=crop",
      date: twoDaysAgo.toISOString(),
      type: "Podcast",
      snippet: "This week we talk with Jane Smith about digital transformation strategies that actually work.",
      isNew: true
    },
    {
      id: "mention-3",
      title: "5 Experts Share Their Top Marketing Predictions for 2023",
      url: "https://marketingtoday.com/expert-predictions-2023",
      publicationName: "Marketing Today",
      publicationLogo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1374&auto=format&fit=crop",
      date: lastWeek.toISOString(),
      type: "Article",
      snippet: "Jane Smith, Marketing Director at TechFirm, believes that 'first-party data will become even more valuable as privacy regulations continue to evolve.'",
      isNew: false
    },
    {
      id: "mention-4",
      title: "Business Leadership Summit 2023 - Keynote Highlights",
      url: "https://businessleadershipsummit.com/2023-highlights",
      publicationName: "Business Leadership Conference",
      publicationLogo: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1470&auto=format&fit=crop",
      date: lastWeek.toISOString(),
      type: "Video",
      snippet: "Jane Smith delivered an inspiring keynote on 'Leading Through Uncertainty' that received a standing ovation from attendees.",
      isNew: false
    },
    {
      id: "mention-5",
      title: "How Top Companies Are Reimagining Employee Experience",
      url: "https://hrblog.com/reimagining-employee-experience",
      publicationName: "HR Insights Blog",
      publicationLogo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
      date: lastMonth.toISOString(),
      type: "Article",
      snippet: "'The companies that will thrive are those that prioritize employee wellbeing alongside performance,' explains Jane Smith, who implemented an award-winning wellness program.",
      isNew: false
    }
  ];
};

// Custom hooks using React Query
export const useRecentPROpportunities = () => {
  return useQuery({
    queryKey: ['prOpportunities'],
    queryFn: fetchPROpportunities,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

export const useUserMentions = () => {
  return useQuery({
    queryKey: ['userMentions'],
    queryFn: fetchUserMentions,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
