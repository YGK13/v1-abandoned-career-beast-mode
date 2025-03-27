
export interface Job {
  id?: string;
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
  applicationStatus?: "not_applied" | "in_progress" | "applied" | "rejected" | "interview" | "offer";
  appliedAt?: string;
  easyApply?: boolean;
  applyUrl?: string;
  description?: string;
}

export const jobs: Job[] = [
  {
    id: "j001",
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120K - $150K",
    postedDate: "2 days ago",
    matchScore: 92,
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Analytics"],
    isRecommended: true,
    status: "recommended",
    source: "LinkedIn",
    applicationStatus: "not_applied",
    easyApply: true,
    applyUrl: "https://linkedin.com/jobs/view/senior-product-manager-at-techcorp",
    description: "TechCorp is seeking an experienced Product Manager to lead our flagship product. You'll work closely with engineering, design, and business teams to define product strategy and roadmap."
  },
  {
    id: "j002",
    title: "Product Marketing Lead",
    company: "InnovateLabs",
    location: "Remote",
    salary: "$110K - $135K",
    postedDate: "1 day ago",
    matchScore: 87,
    skills: ["Marketing Strategy", "Product Launches", "Analytics", "Content Strategy"],
    isRecommended: true,
    status: "recommended",
    source: "LinkedIn",
    applicationStatus: "not_applied",
    easyApply: true,
    applyUrl: "https://linkedin.com/jobs/view/product-marketing-lead-at-innovatelabs"
  },
  {
    id: "j003",
    title: "Senior Data Analyst",
    company: "DataDriven Co.",
    location: "New York, NY",
    salary: "$100K - $130K",
    postedDate: "3 days ago",
    matchScore: 84,
    skills: ["SQL", "Python", "Data Visualization", "Statistical Analysis"],
    isRecommended: true,
    status: "recommended",
    source: "AngelList",
    applicationStatus: "not_applied",
    easyApply: false,
    applyUrl: "https://angel.co/company/datadriven/jobs/senior-data-analyst"
  },
  {
    id: "j004",
    title: "Technical Product Manager",
    company: "SoftSolutions",
    location: "Boston, MA",
    salary: "$115K - $140K",
    postedDate: "5 days ago",
    matchScore: 81,
    skills: ["API Development", "Technical Requirements", "Agile", "Product Strategy"],
    isRecommended: false,
    status: "saved",
    source: "Y Combinator",
    applicationStatus: "not_applied",
    easyApply: false,
    applyUrl: "https://www.ycombinator.com/companies/softsolutions/jobs/technical-product-manager"
  },
  {
    id: "j005",
    title: "Marketing Director",
    company: "BrandBuilders",
    location: "Remote",
    salary: "$130K - $160K",
    postedDate: "6 days ago",
    matchScore: 79,
    skills: ["Digital Marketing", "Brand Strategy", "Team Leadership", "Budget Management"],
    isRecommended: false,
    status: "saved",
    source: "LinkedIn",
    applicationStatus: "not_applied",
    easyApply: true,
    applyUrl: "https://linkedin.com/jobs/view/marketing-director-at-brandbuilders"
  },
  {
    id: "j006",
    title: "UX Research Lead",
    company: "DesignFirst Inc.",
    location: "Seattle, WA",
    salary: "$110K - $140K",
    postedDate: "just now",
    matchScore: 76,
    skills: ["User Research", "Usability Testing", "Personas", "Journey Mapping"],
    isRecommended: false,
    status: "applied",
    source: "Twitter",
    applicationStatus: "applied",
    appliedAt: "2023-06-15T08:30:00Z",
    easyApply: true,
    applyUrl: "https://twitter.com/DesignFirstInc/status/1234567890"
  },
  {
    id: "j007",
    title: "Product Operations Manager",
    company: "OptiFlow",
    location: "Chicago, IL",
    salary: "$95K - $120K",
    postedDate: "4 days ago",
    matchScore: 74,
    skills: ["Process Improvement", "Cross-functional Collaboration", "Analytics", "Documentation"],
    isRecommended: false,
    status: "applied",
    source: "Wellfound",
    applicationStatus: "interview",
    appliedAt: "2023-06-12T14:15:00Z",
    easyApply: false,
    applyUrl: "https://wellfound.com/company/optiflow/jobs/product-operations-manager"
  },
  {
    id: "j008",
    title: "Growth Product Manager",
    company: "ScaleUp Technologies",
    location: "Remote",
    salary: "$105K - $135K",
    postedDate: "3 days ago",
    matchScore: 71,
    skills: ["A/B Testing", "User Acquisition", "Retention Strategies", "Analytics"],
    isRecommended: false,
    status: "applied",
    source: "Twitter",
    applicationStatus: "applied",
    appliedAt: "2023-06-14T09:45:00Z",
    easyApply: true,
    applyUrl: "https://twitter.com/ScaleUpTech/status/9876543210"
  },
];

export const offMarketJobs: Job[] = [
  {
    id: "om001",
    title: "Board Member - Technology",
    company: "VirtualNonExecs",
    location: "Remote",
    salary: "$50K - $75K",
    postedDate: "3 days ago",
    matchScore: 94,
    skills: ["Corporate Governance", "Technology Strategy", "Risk Management", "Executive Leadership"],
    isRecommended: true,
    status: "offmarket",
    source: "Executive Network",
    applicationStatus: "not_applied",
    easyApply: false,
    description: "Looking for experienced technology leaders to join our board of directors. This position requires strategic thinking and a proven track record in technology governance."
  },
  {
    id: "om002",
    title: "Non-Executive Director - Financial Services",
    company: "VirtualNonExecs",
    location: "London / Remote",
    salary: "£40K - £60K",
    postedDate: "1 day ago",
    matchScore: 89,
    skills: ["Regulatory Compliance", "Financial Oversight", "Strategic Planning", "Board Experience"],
    isRecommended: true,
    status: "offmarket",
    source: "Executive Network",
    applicationStatus: "not_applied",
    easyApply: false
  },
  {
    id: "om003",
    title: "Advisory Board Chair - Healthcare",
    company: "VirtualNonExecs",
    location: "New York / Remote",
    salary: "$60K - $90K",
    postedDate: "just now",
    matchScore: 86,
    skills: ["Healthcare Governance", "Industry Networks", "Strategic Guidance", "Fundraising"],
    isRecommended: false,
    status: "offmarket",
    source: "LinkedIn",
    applicationStatus: "not_applied",
    easyApply: true,
    applyUrl: "https://linkedin.com/jobs/view/advisory-board-chair-healthcare"
  }
];

// Function to auto-apply to a job
export const autoApplyToJob = async (job: Job, credentials: any): Promise<boolean> => {
  // This would be implemented to connect to the various platforms' APIs
  console.log(`Auto-applying to ${job.title} at ${job.company} via ${job.source}`, credentials);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would use the appropriate API for each source
  // and return success/failure based on the API response
  return Math.random() > 0.2; // 80% success rate for demo purposes
};

// Update function that will be called daily to refresh job listings
export const updateJobListings = async () => {
  // This would connect to APIs from LinkedIn, Twitter, etc.
  // and refresh the job listings to ensure they're all within 7 days
  console.log("Job listings updated:", new Date().toISOString());
  // The actual implementation would call APIs and update the jobs array
};

// Function to get application statistics
export const getApplicationStats = () => {
  const allJobs = [...jobs, ...offMarketJobs];
  
  return {
    total: allJobs.length,
    applied: allJobs.filter(job => job.applicationStatus === "applied" || 
                             job.applicationStatus === "interview" || 
                             job.applicationStatus === "offer").length,
    interviews: allJobs.filter(job => job.applicationStatus === "interview" || 
                               job.applicationStatus === "offer").length,
    offers: allJobs.filter(job => job.applicationStatus === "offer").length,
    saved: allJobs.filter(job => job.status === "saved").length,
    easyApply: allJobs.filter(job => job.easyApply).length,
  };
};
