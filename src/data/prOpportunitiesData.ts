
export interface PROpportunity {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceType: 'LinkedIn' | 'Twitter' | 'Other';
  deadline?: string;
  link: string;
  tags: string[];
}

// Mock data for PR opportunities
export const prOpportunities: PROpportunity[] = [
  {
    id: "pr1",
    title: "Call for Speakers: Tech Leadership Summit",
    description: "Looking for experienced technology leaders to share insights on innovation, leadership, and digital transformation. 30-minute session slots available.",
    source: "TechLeadership Conference",
    sourceType: "LinkedIn",
    deadline: "June 30, 2023",
    link: "https://techleadership.example.com/speakers",
    tags: ["Speaking", "Technology", "Leadership"]
  },
  {
    id: "pr2",
    title: "Guest Post Opportunity: Industry Trends Blog",
    description: "Seeking thought leadership articles on current industry trends, innovations, and predictions. 1000-1500 words, with opportunity for author bio and backlinks.",
    source: "Industry Insights Magazine",
    sourceType: "Other",
    deadline: "Open submission",
    link: "https://industryinsights.example.com/submit",
    tags: ["Writing", "Thought Leadership", "Industry Trends"]
  },
  {
    id: "pr3",
    title: "Podcast Guest Request: Future of Work Series",
    description: "Seeking professionals to discuss how they're adapting to changing work environments. Focus on practical strategies and leadership approaches.",
    source: "Career Elevation Podcast",
    sourceType: "Twitter",
    deadline: "July 15, 2023",
    link: "https://careerelevation.example.com/guest",
    tags: ["Podcast", "Future of Work", "Career Development"]
  },
  {
    id: "pr4",
    title: "Media Interview Request: Business Innovation Feature",
    description: "Business publication seeking executives to comment on innovation strategies in current market conditions. Brief phone interview required.",
    source: "Business Weekly",
    sourceType: "Other",
    deadline: "June 20, 2023",
    link: "https://businessweekly.example.com/contribute",
    tags: ["Media Interview", "Innovation", "Executive Perspective"]
  },
  {
    id: "pr5",
    title: "Expert Panel Participation: Industry Roundtable",
    description: "Virtual roundtable discussion on industry challenges and opportunities. Participants will be featured in follow-up article and video highlights.",
    source: "Industry Association",
    sourceType: "LinkedIn",
    deadline: "July 5, 2023",
    link: "https://industryassociation.example.com/roundtable",
    tags: ["Panel Discussion", "Networking", "Industry Expertise"]
  }
];

// Function to get PR opportunities
export const getPROpportunities = (): PROpportunity[] => {
  return prOpportunities;
};

// Generate a daily LinkedIn post idea based on industry
export const generateDailyPostIdea = (industry: string = "Technology"): string => {
  const ideas: Record<string, string[]> = {
    "Technology": [
      "Share your perspective on how AI is transforming your specific field and how professionals can adapt",
      "Discuss a recent technical challenge you overcame and the key lessons learned",
      "Highlight a successful collaboration between technical and non-technical teams and what made it work",
      "Share your thoughts on balancing innovation with practical implementation in technology projects",
      "Reflect on skills that technology professionals should develop beyond technical expertise"
    ],
    "Finance": [
      "Share insights on financial strategies that have proven resilient during economic uncertainty",
      "Discuss the importance of financial literacy and how you're contributing to education in this area",
      "Highlight trends you're seeing in investment behavior and what they might indicate",
      "Share a perspective on sustainable finance and how it's changing traditional approaches",
      "Reflect on the evolution of financial technology and its impact on client relationships"
    ],
    "Healthcare": [
      "Share insights on improving patient experiences through innovative approaches",
      "Discuss the intersection of technology and healthcare from your professional perspective",
      "Highlight a successful collaboration that improved healthcare outcomes",
      "Share thoughts on healthcare leadership challenges and strategies for addressing them",
      "Reflect on the importance of continuing education and adaptation in healthcare professionals"
    ],
    "General": [
      "Share a leadership lesson that transformed how you approach your work",
      "Discuss a book or resource that significantly impacted your professional development",
      "Highlight an unconventional career decision that ultimately led to growth",
      "Share your approach to continual learning and skill development",
      "Reflect on how your industry is evolving and how professionals can stay relevant"
    ]
  };

  const industryIdeas = ideas[industry] || ideas["General"];
  const randomIndex = Math.floor(Math.random() * industryIdeas.length);
  return industryIdeas[randomIndex];
};
