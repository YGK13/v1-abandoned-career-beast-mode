
import { Job } from './types';

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
