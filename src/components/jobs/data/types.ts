
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
