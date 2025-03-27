export type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

export type Category = 
  | "interviews" 
  | "salary" 
  | "promotion" 
  | "skills" 
  | "networking" 
  | "career_change" 
  | "leadership" 
  | "general"
  | "salary_data"
  | "linkedin_optimization"
  | "document_analysis";
