
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
  | "general";
