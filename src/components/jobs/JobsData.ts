
export interface Job {
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  matchScore: number;
  skills: string[];
  isRecommended: boolean;
  status: string;
  source: string;
}

export const jobs: Job[] = [
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
    source: "LinkedIn"
  },
  {
    title: "Product Marketing Lead",
    company: "InnovateLabs",
    location: "Remote",
    salary: "$110K - $135K",
    postedDate: "1 day ago",
    matchScore: 87,
    skills: ["Marketing Strategy", "Product Launches", "Analytics", "Content Strategy"],
    isRecommended: true,
    status: "recommended",
    source: "LinkedIn"
  },
  {
    title: "Senior Data Analyst",
    company: "DataDriven Co.",
    location: "New York, NY",
    salary: "$100K - $130K",
    postedDate: "3 days ago",
    matchScore: 84,
    skills: ["SQL", "Python", "Data Visualization", "Statistical Analysis"],
    isRecommended: true,
    status: "recommended",
    source: "AngelList"
  },
  {
    title: "Technical Product Manager",
    company: "SoftSolutions",
    location: "Boston, MA",
    salary: "$115K - $140K",
    postedDate: "5 days ago",
    matchScore: 81,
    skills: ["API Development", "Technical Requirements", "Agile", "Product Strategy"],
    isRecommended: false,
    status: "saved",
    source: "Y Combinator"
  },
  {
    title: "Marketing Director",
    company: "BrandBuilders",
    location: "Remote",
    salary: "$130K - $160K",
    postedDate: "6 days ago",
    matchScore: 79,
    skills: ["Digital Marketing", "Brand Strategy", "Team Leadership", "Budget Management"],
    isRecommended: false,
    status: "saved",
    source: "LinkedIn"
  },
  {
    title: "UX Research Lead",
    company: "DesignFirst Inc.",
    location: "Seattle, WA",
    salary: "$110K - $140K",
    postedDate: "just now",
    matchScore: 76,
    skills: ["User Research", "Usability Testing", "Personas", "Journey Mapping"],
    isRecommended: false,
    status: "applied",
    source: "Twitter"
  },
  {
    title: "Product Operations Manager",
    company: "OptiFlow",
    location: "Chicago, IL",
    salary: "$95K - $120K",
    postedDate: "4 days ago",
    matchScore: 74,
    skills: ["Process Improvement", "Cross-functional Collaboration", "Analytics", "Documentation"],
    isRecommended: false,
    status: "applied",
    source: "Wellfound"
  },
  {
    title: "Growth Product Manager",
    company: "ScaleUp Technologies",
    location: "Remote",
    salary: "$105K - $135K",
    postedDate: "3 days ago",
    matchScore: 71,
    skills: ["A/B Testing", "User Acquisition", "Retention Strategies", "Analytics"],
    isRecommended: false,
    status: "applied",
    source: "Twitter"
  },
];

export const offMarketJobs: Job[] = [
  {
    title: "Board Member - Technology",
    company: "VirtualNonExecs",
    location: "Remote",
    salary: "$50K - $75K",
    postedDate: "3 days ago",
    matchScore: 94,
    skills: ["Corporate Governance", "Technology Strategy", "Risk Management", "Executive Leadership"],
    isRecommended: true,
    status: "offmarket",
    source: "Executive Network"
  },
  {
    title: "Non-Executive Director - Financial Services",
    company: "VirtualNonExecs",
    location: "London / Remote",
    salary: "£40K - £60K",
    postedDate: "1 day ago",
    matchScore: 89,
    skills: ["Regulatory Compliance", "Financial Oversight", "Strategic Planning", "Board Experience"],
    isRecommended: true,
    status: "offmarket",
    source: "Executive Network"
  },
  {
    title: "Advisory Board Chair - Healthcare",
    company: "VirtualNonExecs",
    location: "New York / Remote",
    salary: "$60K - $90K",
    postedDate: "just now",
    matchScore: 86,
    skills: ["Healthcare Governance", "Industry Networks", "Strategic Guidance", "Fundraising"],
    isRecommended: false,
    status: "offmarket",
    source: "LinkedIn"
  }
];

// Update function that will be called daily to refresh job listings
export const updateJobListings = async () => {
  // This would connect to APIs from LinkedIn, Twitter, etc.
  // and refresh the job listings to ensure they're all within 7 days
  console.log("Job listings updated:", new Date().toISOString());
  // The actual implementation would call APIs and update the jobs array
};
